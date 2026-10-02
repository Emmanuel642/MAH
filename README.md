# MHA — Modern Home Architecture RDC

Site vitrine du cabinet d'architecture, d'études d'ingénierie et de construction générale en République Démocratique du Congo (Kinshasa — Lubumbashi).

## Stack

- **React 19** + **TypeScript**
- **Vite** (build)
- **Tailwind CSS 4**
- **Motion** (animations)

## Développement

```bash
npm install
npm run dev       # serveur de développement
npm run lint      # vérification TypeScript
npm run build     # build de production → dist/
npm run preview   # prévisualisation du build
```

## Déploiement

Le site est déployé automatiquement sur **GitHub Pages** à chaque push sur `main`
via le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

URL de production : <https://emmanuel642.github.io/MAH/>

> Après le premier push, activer Pages une seule fois :
> **Settings → Pages → Source : GitHub Actions**.

Le build utilise des URLs relatives (`base: './'`), il fonctionne donc sans
modification sur GitHub Pages, Vercel ou Netlify, ainsi que sur un domaine
personnalisé.

## Modifier le contenu

| Contenu | Fichier |
| --- | --- |
| Projets réalisés | [`src/data/projectsData.ts`](src/data/projectsData.ts) |
| Textes FR / EN | [`src/data/translations.ts`](src/data/translations.ts) |
| Sections de la page | [`src/components/`](src/components/) |
| Images | [`src/assets/images/`](src/assets/images/) |
| Coordonnées / SEO | [`index.html`](index.html) |

Après modification, un simple `git push` suffit : le site est reconstruit et
remis en ligne automatiquement.
