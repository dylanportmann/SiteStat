#!/bin/zsh
set -e

cd "$(dirname "$0")"

if [ ! -f ".sitestat-server.json" ]; then
  echo "Aucun serveur SiteStat actif n'a été trouvé."
  read -r "?Appuie sur Entrée pour fermer."
  exit 0
fi

PORT=$(node -e "const fs=require('fs'); const data=JSON.parse(fs.readFileSync('.sitestat-server.json','utf8')); console.log(data.port)")
PID=$(node -e "const fs=require('fs'); const data=JSON.parse(fs.readFileSync('.sitestat-server.json','utf8')); console.log(data.pid)")

if curl -fsS -X POST "http://127.0.0.1:${PORT}/__shutdown" >/dev/null 2>&1; then
  echo "Demande d'arrêt envoyée au serveur SiteStat."
else
  echo "Le bouton d'arrêt web ne répond pas; arrêt du processus ${PID}."
  kill "${PID}" 2>/dev/null || true
  rm -f ".sitestat-server.json"
fi

read -r "?Appuie sur Entrée pour fermer."
