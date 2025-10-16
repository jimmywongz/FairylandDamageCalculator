# Fairyland Damage Calculator

A lightweight React + Vite single-page application that calculates Fairyland Online weapon damage with presets and real-time visual feedback.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   Vite will print a local URL that you can open in your browser.

## Building for production

Create an optimized production bundle in the `dist/` directory:

```bash
npm run build
```

You can locally preview the production build with:

```bash
npm run preview
```

## Deploying to GitHub Pages

This repository ships with a GitHub Actions workflow that builds the site and publishes it to the `gh-pages` branch.

1. In your GitHub repository, open **Settings → Pages** and choose **GitHub Actions** as the source.
2. Push to `main` (or trigger the `Deploy to GitHub Pages` workflow manually). The action will run `npm ci`, `npm run build`, and deploy the `dist/` folder to Pages.
3. The site will be available at `https://<username>.github.io/FairylandDamageCalculator/`.

The Vite configuration already sets `base: "/FairylandDamageCalculator/"`, so all assets resolve correctly from the project sub-path.

## Project structure

```
.
├── index.html
├── package.json
├── src
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
└── vite.config.js
```

Feel free to customize the UI or extend the calculator logic to support more scenarios.
