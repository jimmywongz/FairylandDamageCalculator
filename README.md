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

1. Run `npm run build` to generate the static files in `dist/`.
2. Commit the contents of `dist/` to the branch that GitHub Pages will publish (for example, `gh-pages`).
3. Push the branch to GitHub and enable Pages in the repository settings, selecting the published branch and `/` folder.

Because the Vite configuration sets `base: "./"`, the build output works when served from a sub-path such as `https://<username>.github.io/<repo>/`.

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
