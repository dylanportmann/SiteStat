# SiteStat

Catalogue local interactif de commandes R pour Stat 1.

## Dépendances nécessaires

Pour utiliser le site:

- macOS si tu veux lancer les fichiers `Lancer SiteStat.command` et
  `Arreter SiteStat.command`.
- Node.js `20.19.0` ou plus récent, ou Node.js `22.12.0` ou plus récent.
- npm, installé avec Node.js.
- Un navigateur web moderne.
- Une connexion Internet au premier lancement pour installer les dépendances npm.

R n'est pas nécessaire pour lancer le site: les commandes R sont affichées,
expliquées et copiables, mais elles ne sont pas exécutées par l'application.

## Lancer en local

Sur macOS, double-cliquer sur `Lancer SiteStat.command`.

## Télécharger depuis GitHub

Utiliser de préférence l'asset macOS dans les Releases, pas le bouton vert
`Code > Download ZIP`. L'asset de release conserve les droits d'exécution des
fichiers `.command`.

Si le ZIP source GitHub est utilisé et que macOS refuse d'exécuter les scripts:

```bash
chmod +x "Lancer SiteStat.command" "Arreter SiteStat.command"
```

Si macOS bloque le script parce qu'il vient d'Internet, il faut l'autoriser côté
utilisateur. Ce contrôle de sécurité ne peut pas être désactivé depuis le repo.

Sinon:

```bash
npm install
npm run build
npm start
```

Le site ouvre un serveur local et propose un bouton `Arrêter`.

## Développement

```bash
npm install
npm run dev
npm test
npm run build
```
