# SiteGen - Générateur de site web professionnel

Application Next.js qui permet à une entreprise de générer un site web professionnel en remplissant un formulaire simple.

## Fonctionnalités

- **Page d'accueil** : présentation du service et liens vers le formulaire ou un exemple
- **Formulaire** : nom de l'entreprise, secteur d'activité, services (liste), couleurs principale et secondaire
- **Site généré** : page qui affiche le site professionnel personnalisé avec les données saisies

## Technologies

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript

## Installation et lancement

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Utilisation

1. Sur la page d'accueil, cliquez sur **Créer mon site** ou **Commencer maintenant**.
2. Remplissez le formulaire : nom, secteur, services (séparés par des virgules), et choisissez vos couleurs.
3. Cliquez sur **Générer mon site** pour voir le site généré.
4. Depuis l'aperçu, vous pouvez **Modifier** pour retourner au formulaire ou **Accueil** pour revenir à l'accueil.

## Structure du projet

```
sitegen/
├── app/
│   ├── form/          # Page formulaire
│   ├── site/          # Page site généré
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx       # Page d'accueil
├── lib/
│   ├── storage.ts     # Session storage (données formulaire)
│   └── types.ts       # Types CompanySiteData
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Build production

```bash
npm run build
npm start
```
