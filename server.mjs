import { createServer } from "node:http";
import { createServer as createNetServer } from "node:net";
import { spawn } from "node:child_process";
import fs from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, "dist");
const pidFile = path.join(rootDir, ".sitestat-server.json");
const shouldOpen = process.argv.includes("--open");
const host = "127.0.0.1";
const requestedPort = Number(process.env.PORT ?? 4177);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"]
]);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, text) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(text);
}

function cleanupSync() {
  try {
    const current = JSON.parse(fs.readFileSync(pidFile, "utf8"));
    if (current.pid === process.pid) {
      fs.rmSync(pidFile, { force: true });
    }
  } catch {
    fs.rmSync(pidFile, { force: true });
  }
}

function openBrowser(url) {
  if (!shouldOpen) {
    return;
  }

  const command =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "cmd"
        : "xdg-open";
  const args =
    process.platform === "win32" ? ["/c", "start", "", url] : [url];

  const child = spawn(command, args, {
    detached: true,
    stdio: "ignore"
  });
  child.unref();
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = createNetServer()
      .once("error", () => resolve(false))
      .once("listening", () => {
        tester.close(() => resolve(true));
      })
      .listen(port, host);
  });
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + 30; port += 1) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`Aucun port disponible entre ${startPort} et ${startPort + 29}.`);
}

async function resolveStaticFile(requestUrl) {
  const url = new URL(requestUrl, `http://${host}`);
  const decodedPath = decodeURIComponent(url.pathname);
  const relativePath = decodedPath === "/" ? "index.html" : decodedPath.slice(1);
  const candidate = path.normalize(path.join(distDir, relativePath));

  if (!candidate.startsWith(distDir)) {
    return null;
  }

  try {
    const fileStat = await stat(candidate);
    if (fileStat.isFile()) {
      return candidate;
    }
  } catch {
    if (path.extname(candidate)) {
      return null;
    }
  }

  return path.join(distDir, "index.html");
}

async function main() {
  await stat(path.join(distDir, "index.html")).catch(() => {
    throw new Error("Le dossier dist est absent. Lance d'abord `npm run build`.");
  });

  const port = await findAvailablePort(requestedPort);
  let shuttingDown = false;

  const server = createServer(async (request, response) => {
    try {
      if (request.method === "GET" && request.url === "/health") {
        sendJson(response, 200, { ok: true, pid: process.pid, port });
        return;
      }

      if (request.method === "POST" && request.url === "/__shutdown") {
        if (shuttingDown) {
          sendJson(response, 202, { ok: true, status: "already_stopping" });
          return;
        }

        shuttingDown = true;
        sendJson(response, 202, { ok: true, status: "stopping" });
        setTimeout(() => {
          server.close(() => {
            cleanupSync();
            process.exit(0);
          });
        }, 250);
        return;
      }

      if (request.method !== "GET" && request.method !== "HEAD") {
        sendText(response, 405, "Method not allowed");
        return;
      }

      const filePath = await resolveStaticFile(request.url ?? "/");
      if (!filePath) {
        sendText(response, 404, "Not found");
        return;
      }

      const body = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": mimeTypes.get(path.extname(filePath)) ?? "application/octet-stream",
        "Cache-Control": filePath.endsWith("index.html")
          ? "no-store"
          : "public, max-age=31536000, immutable"
      });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch (error) {
      sendJson(response, 500, {
        ok: false,
        error: error instanceof Error ? error.message : "Erreur serveur"
      });
    }
  });

  server.listen(port, host, async () => {
    await mkdir(rootDir, { recursive: true });
    await writeFile(
      pidFile,
      JSON.stringify(
        {
          pid: process.pid,
          port,
          url: `http://${host}:${port}`,
          startedAt: new Date().toISOString()
        },
        null,
        2
      )
    );

    const url = `http://${host}:${port}`;
    console.log(`SiteStat est lancé: ${url}`);
    console.log("Utilise le bouton Arrêter dans le site ou Arreter SiteStat.command.");
    openBrowser(url);
  });

  process.on("SIGINT", () => {
    cleanupSync();
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    cleanupSync();
    process.exit(0);
  });
  process.on("exit", cleanupSync);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
