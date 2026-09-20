# Editing this site

Static HTML. No build step, no dependencies. Open `index.html` in a browser to
preview, or serve the folder (`python3 -m http.server`) if you need correct
paths for fonts and video.

## Safe to edit

| File | What lives there |
| --- | --- |
| `index.html` | All content — copy, images, section order, new blocks. 8 sections. |
| `fonts/tromploy.css` | Type and colour overrides. Loads *after* `main.css`, so rules here win. `--zd-accent` is defined here. |
| `assets/site.js` | New behaviour. Loads after `main.js`. |

## Do not edit

| File | Why |
| --- | --- |
| `assets/main.css` | Minified to a single 80 KB line. |
| `assets/main.js` | 14,747-line webpack bundle (GSAP + ScrollTrigger). The source project that produced it is not in this repo, so it cannot be rebuilt. |

Both are build output. To change how they behave, override them from
`tromploy.css` or `site.js` rather than editing in place.

## Notes

- Lines 187 and 971 of `index.html` are each a ~46,000-character inline SVG
  (the script logo, used twice). Edit around them.
- There is an inline `<script>` at the end of `index.html` driving the cutout
  parallax. It could move into `site.js`; it works where it is.
- Asset paths are relative and case-sensitive. Netlify's filesystem is
  case-sensitive even though macOS is not — `Img/Photo.JPG` will 404 in
  production while working locally.

## Deploying

Netlify builds from `main`. Push and it redeploys; `netlify.toml` sets the
publish directory to the repo root. No build command.

## Source of truth

This repo. The site also exists as a Claude artifact, which was its original
home — that copy is now a snapshot and is not kept in sync. Make changes here.
