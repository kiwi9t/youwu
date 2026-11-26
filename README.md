# You Wu, portfolio

Personal portfolio site, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Editing content

### In the browser (recommended)

Open **https://kiwi9t.github.io/youwu/admin/** and choose **Sign In Using Access Token**.

- **Who can edit:** only a GitHub account with write access to this repository can save. Today that is only `kiwi9t`.
- **Access token (one-time):** on GitHub go to Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.
  Limit it to the `kiwi9t/youwu` repository, give it **Contents: Read and write**, and paste it into the editor.
  The token stays in your browser only. Never commit it to the repository.
- **Preview:** the right half of the editor updates as you type. After **Save**, the live site updates in about 1–2 minutes.
- **Show / hide:** every item (glance rows, about paragraphs, schools, roles, projects, skill groups, certifications, interests) has a **Show on site** switch.
  Hidden items stay in the editor, marked `[Hidden]`, and can be turned back on at any time. A section with no visible items disappears.
- **History:** every save is a commit on `main` starting with `Content:`. See the [commit history](https://github.com/kiwi9t/youwu/commits/main/src/data/content), and use **Revert** on a commit to undo it.
- **Uploads:** images and files uploaded in the editor go to `public/uploads/`.

### By hand

The words live in the JSON files in [`src/data/content/`](src/data/content/), one per section.
[`src/data/site.ts`](src/data/site.ts) reads them and drops any item with `"show": false`.

- **Resume:** put the PDF in `public/` as `You_Wu_Resume.pdf` (or change `links.resume` in `profile.json`).
- **Contact form:** paste a [Formspree](https://formspree.io) form URL into `links.formEndpoint`. While it is empty, "Send message" opens the visitor's email app.
- **Skills:** a skill that also appears in an Experience or Project `tags` list becomes a clickable filter.
- **Editor settings:** [`public/admin/config.yml`](public/admin/config.yml) defines the editor's forms.

## Running locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # production build in dist/
```

## Deploying

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`, at https://kiwi9t.github.io/youwu/ (the base path follows the repo name automatically).
One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
