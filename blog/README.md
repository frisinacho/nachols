# Blog (Hugo)

Only `/blog` is built with [Hugo](https://gohugo.io/). Home and Resume stay hand-written in `public/`.

```
blog/
  hugo.toml              settings (title, URLs, output folder)
  content/posts/*.md     your posts — one Markdown file each
  layouts/_default/      page templates (same header, footer and site.css as the rest of the site)
  archetypes/default.md  template for new posts
```

Hugo writes the generated pages to `public/blog/`. Don't edit those files by hand: they are rebuilt.

## Writing a post

1. Create a file in `blog/content/posts/`. The file name becomes the URL:
   `my-first-post.md` → `https://nachols.com/blog/my-first-post/`
2. Start it with this header ("front matter"), then write Markdown below it:

   ```markdown
   ---
   title: "My first post"
   date: 2026-11-23
   description: "One line shown in the post list and in search results."
   draft: true
   ---

   Your text here. **Bold**, _italic_, [links](https://example.com), lists, `code`…

   ## A heading
   ```
3. While `draft: true`, the post is never published. Change it to `draft: false` when it's ready.
4. Commit and push to `main` (or create/edit the file directly on github.com).
   The **Build blog** GitHub Action builds the blog and commits the result to `public/blog`,
   and the normal deploy publishes it. Run `git pull` afterwards so your local copy has that commit.

**Images:** put them in `blog/static/img/` (create the folder the first time) and use
`![Alt text](/blog/img/photo.jpg)` in the post. Hugo copies `static/` as-is.

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
with a link between each post and its translation — it's a settings change plus a few template tweaks.
