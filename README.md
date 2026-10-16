# 日本華語 · Nihon Huayu 🍡 v1.4

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
- Speech-bubble input/output: Cat 1 speaks Chinese, Cat 2 speaks pseudo-Japanese; switching direction swaps their positions
- Press-and-release cat expressions and talking animation using the uploaded alternate PNGs
- Separate katakana speech reading, with small reading text below the main Japanese result
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
- `Cat 1 -2.png`, `Cat 2 -2.png`: original uploaded alternate expressions
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

## v1.4 conversation and speech update

Conversion is entirely live; the Convert button has been removed. Cat 1 stays associated with Chinese and Cat 2 with Japanese. The input and result are their speech bubbles, and reversing direction swaps the cats. All four displayed cat buttons (brand, hero, input and output) support a held expression for pointer/touch and Space/Enter. Release, pointer cancellation, lost capture, blur and hiding the page restore their state. Uploaded images are preloaded and decoded without editing their appearance.

When the native speech engine reports playback has started, the replying cat and the Cat 1 hero alternate their normal/open-mouth expressions every 220ms. Stop, completion, failure, edits and direction changes stop the animation. Reduced-motion mode shows a steady open-mouth expression instead of cycling frames. Holding a cat manually takes precedence over its talking frame.

Japanese speech uses a separate katakana reading generated from the source, regardless of the selected display style. For example, `しぇんまやんで弁当？` is displayed while `シェンマヤンデベンダン？` is passed to Japanese speech. Known mixed-script phrases and mapped Han characters are expanded phonetically; unsupported Han characters are omitted from speech and identified beside the reading. Literal punctuation and non-Han input are retained. Custom mappings remain compatible; use kana in a custom mapping to control otherwise unsupported readings. Copy/Share continue to use the main result. Reverse results are read as Chinese with `zh-TW`.

Safari speech now defaults to language-only system voice resolution, without forcing a voice from `getVoices()`. This accommodates [WebKit's reported missing Japanese voice enumeration](https://bugs.webkit.org/show_bug.cgi?id=250665). The optional voice settings allow choosing an exposed Japanese or Chinese voice; voices can arrive later without triggering playback. Voice choices are retained per language for the current page session. No speech cancellation occurs while idle or on normal completion. This avoids unnecessary cancel/speak transitions, a sequence with [historical WebKit regressions](https://bugs.webkit.org/show_bug.cgi?id=191745). These changes address compatibility risks; they do not establish the cause of silence on a particular device.

Playback still starts synchronously in the tap handler, with no timer or voice-loading wait before `speak()`. Bounded watchdogs recover missing native callbacks. Visible errors and the iPhone help panel suggest media volume, another voice or downloading a system language voice. Physical iOS Safari audio still requires testing on a real iPhone; desktop WebKit and mocked speech cannot verify audible playback.
