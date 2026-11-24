# Blog (Hugo)

Only `/blog` is built with [Hugo](https://gohugo.io/). Home and Resume stay hand-written in `public/`.

```
blog/
  hugo.toml              settings (title, URLs, output folder)
  content/posts/         your posts: one folder per year, one folder per post
  layouts/_default/      page templates (same header, footer and site.css as the rest of the site)
  archetypes/default.md  template for new posts
```

Hugo writes the generated pages to `public/blog/`. Don't edit those files by hand: they are rebuilt.

## Writing a post

Every post is a folder named `YYYY-MM-DD-name`, inside its year's folder, with the text in `index.md`:

```
blog/content/posts/
  2026/
    2026-11-23-hello-again/
      index.md               → https://nachols.com/blog/hello-again/
    2026-12-02-my-trip/
      index.md               → https://nachols.com/blog/my-trip/
      beach.jpg              (images live next to the post)
```

- **Date:** taken from the folder name. No `date:` line needed in the file.
- **URL:** the folder name without the date. Keep it unique across years:
  two posts called `…-my-trip` would fight over `/blog/my-trip/`.

1. Create the folder and an `index.md` inside it, starting with this header ("front matter"):

   ```markdown
   ---
   title: "My trip"
   description: "One line shown in the post list and in search results."
   draft: true
   ---

   Your text here. **Bold**, _italic_, [links](https://example.com), lists, `code`…

   ## A heading

   ![A beach at sunset](beach.jpg)
   ```

   With Hugo installed you can let it create the folder and header for you:

   ```bash
   hugo new content posts/2026/2026-12-02-my-trip/index.md --source blog
   ```

2. While `draft: true`, the post is never published. Change it to `draft: false` when it's ready.
3. Commit and push to `main` (or create/edit the files directly on github.com).
   The **Build blog** GitHub Action builds the blog and commits the result to `public/blog`,
   and the normal deploy publishes it. Run `git pull` afterwards so your local copy has that commit.

**Images:** put them in the post's folder and refer to them by file name, e.g. `![Alt text](beach.jpg)`.

**Dates in the future:** a post dated after today is skipped until a build runs on or after that date.
Builds only run when something in `blog/` is pushed.

## Previewing locally (optional)

Install Hugo once (macOS): download the `darwin-universal.pkg` for the version in
`.github/workflows/blog.yml` from https://github.com/gohugoio/hugo/releases and open it.

Then, from the repository root:

```bash
hugo --source blog --buildDrafts --cleanDestinationDir
python3 -m http.server 8765 -d public
```

Open http://localhost:8765/blog/. Drafts are included in this preview only.
Before committing, rebuild without `--buildDrafts` (or just leave `public/blog` to the Action).

## Later: Spanish posts

Hugo supports translations natively. When you want them, Spanish posts can live at `/es/blog/`
with a link between each post and its translation: a settings change plus a few template tweaks.
