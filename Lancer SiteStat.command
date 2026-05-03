#!/bin/zsh
set -e

cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js est introuvable."
  read -r "?Appuie sur Entrée pour fermer."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm est introuvable."
  read -r "?Appuie sur Entrée pour fermer."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Installation des dépendances..."
  npm_config_cache=.npm-cache npm install
fi

echo "Préparation du site..."
npm run build

echo "Lancement de SiteStat..."
node server.mjs --open

echo "SiteStat est arrêté."
read -r "?Appuie sur Entrée pour fermer."
