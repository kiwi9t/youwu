# You Wu, portfolio

Personal portfolio site, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Editing content

All text on the site lives in one file: [`src/data/site.ts`](src/data/site.ts).
Open it, change the words, commit, and the site redeploys on its own.

- **Resume:** put the PDF in `public/` as `You_Wu_Resume.pdf` (or change `links.resume`).
- **Photo:** put an image in `public/` and set `profile.photo` to its file name.
- **Project screenshots:** put images in `public/projects/` and set `image: 'projects/<file>'` on a project.
- **Contact form:** create a free form at [Formspree](https://formspree.io), then paste its URL into `links.formEndpoint`.
  Until then, "Send message" opens the visitor's email app.
- **Skills:** a skill that also appears in an Experience or Project `tags` list becomes a clickable filter.

## Running locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # production build in dist/
```

## Deploying

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.
One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
