# 日本華語 · Nihon Huayu 🍡

A playful Mandarin → fake-Japanese chat converter, inspired by messages like **什麼樣的便當？ → しぇんまやんで弁当？**.

**[Repository](https://github.com/nootnoot0328/nihonhuayu)**

## What works

- Mandarin → playful mixed Japanese script (kanji + hiragana)
- Hiragana-only and katakana-only styles
- Reverse lookup (best effort for arbitrary pasted text)
- Exact local round-trip restoration for messages converted on the same device/browser (up to 100 saved results)
- Example phrases, one-tap copy and native sharing
- Mobile-first, pastel UI featuring the cropped cat logo
- Zero account requirements; conversions run on-device; no analytics, backend or API keys

### Important limitations

This is a **fun phonetic approximation**, *not* a Japanese translator. Mixed-script output is intentionally non-standard. The first version includes a limited Mandarin character lexicon and curated phrase mappings; unknown Chinese characters are left intact. Reverse conversion is naturally ambiguous because many Mandarin words have overlapping pronunciations. When no saved original is available, results are guesses; unknown kana are marked in brackets. No input is uploaded, and local conversion history is saved in browser localStorage.

## GitHub Pages

1. Open **Settings → Pages** in this repo.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Set branch **main**, folder **/(root)**, then **Save**.
4. When deployment completes, open **https://nootnoot0328.github.io/nihonhuayu/**.
5. On an iPhone, open the site in Safari → Share → **Add to Home Screen**.

**Repository visibility:** The repository was private when this project was added. GitHub Pages support for private repositories depends on the account plan and site visibility settings. If Pages is unavailable under Settings, make a public copy of the *app source only* (there are no credentials in the project), or use another static hosting option. A Pages URL is not proof that deployment has been enabled.

**iOS icon note:** iOS works most reliably with a PNG apple-touch-icon (usually 180×180). A WebP image is supplied as a lightweight fallback, alongside an SVG icon; if Safari uses a generic icon, export the supplied logo as a 180×180 PNG named `apple-touch-icon.png` and update the link in `index.html`.

## Files

- `index.html`: accessible app structure
- `style.css`: responsive styling and animations
- `app.js`: local rule-based conversion, reverse decoding, UI behaviors
- `logo.webp`: cropped pastel cat artwork
- `manifest.webmanifest`: installable web-app metadata
- `icon.svg`: vector fallback

No build step. Open `index.html` in a browser or deploy with GitHub Pages.

## Next improvements

- Larger pinyin pronunciation table and smarter phrase segmentation
- User-editable dictionary for slang, particle endings and preferred spellings
- Optional tone / rhythm settings
- Improved reverse-candidate selection with multiple choices
- PNG icons and offline service worker

MIT license can be added later if desired.
