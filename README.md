# 日本華語 · Nihon Huayu 🍡 v1.3

A playful Mandarin → fake-Japanese chat converter, inspired by messages like **什麼樣的便當？ → しぇんまやんで弁当？**.

**[Repository](https://github.com/nootnoot0328/nihonhuayu)**

## What works

- Mandarin → playful mixed Japanese script (kanji + hiragana)
- Hiragana-only and katakana-only styles
- Reverse lookup (best effort for arbitrary pasted text)
- Exact local round-trip restoration for messages converted on the same device/browser (up to 100 saved results)
- Real-time as-you-type conversion, example phrases, one-tap copy and native sharing
- User-defined pronunciation mappings stored locally (Settings)
- Mobile-first, pastel UI featuring the two original transparent cat PNGs
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

**iOS icons:** v1.3 supplies `apple-touch-icon.png` (180×180), manifest PNG icons (192×192, 512×512), and `favicon-32.png`, resized from the original `Cat 1.png` while preserving transparency and aspect ratio. iOS may composite transparency for the Home Screen icon.

## Files

- `index.html`: accessible app structure
- `style.css`: responsive styling and animations
- `app.js`: local rule-based conversion, reverse decoding, UI behaviors
- `Cat 1.png`, `Cat 2.png`: original uploaded artwork (capitalization and spaces matter)
- `apple-touch-icon.png`, `favicon-32.png`, `icon-192.png`, `icon-512.png`: derived branding icons
- `logo.webp`: cropped pastel cat artwork
- `manifest.webmanifest`: installable web-app metadata
- `icon.svg`: vector fallback

No build step. Open `index.html` in a browser or deploy with GitHub Pages.

## Next improvements

- Larger pinyin pronunciation table and smarter phrase segmentation
- User-editable dictionary for slang, particle endings and preferred spellings
- Optional tone / rhythm settings
- Improved reverse-candidate selection with multiple choices
- Optional offline service worker

MIT license can be added later if desired.

## v1.1 notes
The app uses a transparent-background SVG mascot for its large hero artwork, with no rectangular image background. The original supplied `logo.webp` is retained in the repository. iOS Home Screen icons are platform-masked and may not show transparent backgrounds in the same way as in-app artwork.

## v1.3 behavior and validation

Two small cat conversations sit before the input and before the result. Decorative cats ignore taps; reduced-motion preferences disable animations and smooth example scrolling. Editable controls use at least 16px type without restricting zoom. Results remain selectable for manual copy fallback; ordinary controls do not select accidentally.

Speech uses native Web Speech synthesis: `ja-JP` for pseudo-Japanese results and `zh-TW` for reverse results. Japanese TTS follows Japanese pronunciation rules and cannot promise the original Mandarin pronunciation. Voices are cached at startup and on `voiceschanged`, refreshed on tap, and selected by exact locale then language. If voices are not yet exposed, the browser resolves the requested language. Playback starts synchronously inside the tap handler, without waiting for voice events or a timer. Stop, Clear, conversion, input changes, direction changes, and hiding the page cancel playback. Errors have visible accessible feedback. Watchdogs cancel after 10 seconds without a start event, or after a conservative duration limit without an end event; these timers recover UI state and never schedule playback.

Investigation found no voice-loading handling, no start watchdog, no synchronous-exception recovery, and a Clear handler that failed to cancel the old utterance. These are verified code defects; the precise cause of silence on any particular iPhone requires testing that device. See [WebKit user-gesture behavior](https://bugs.webkit.org/show_bug.cgi?id=223473) and [MDN voice availability](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event).

Existing localStorage keys and conversion rules are retained. To update a saved mapping, submit the same Chinese phrase with its replacement pronunciation.

### Automated checks

With Playwright installed as a development-only dependency, run `node tests/browser.cjs` (default: Edge). Set the environment variable `BROWSER_ENGINE` to `webkit` to test WebKit; `BROWSER_CHANNEL` can override the Chromium channel. `NODE_PATH` may point to a shared Playwright installation. No test dependency is loaded by the website.

See [TESTING.md](./TESTING.md) for results and the remaining physical-iPhone checks.
