# v1.6 validation — 2026-10-16

Automated `tests/browser.cjs` passed in headless Microsoft Edge and Playwright WebKit 26.5 on Windows.

`node tests/pronunciation.cjs` also passed with the real local vendor libraries. It exhausts all 416 tone-free readings (including polyphones) returned for U+3400–U+9FFF and verifies an explicit kana spelling for each. It tests Traditional/Simplified context, novel sentences, personal mapping precedence inside curated phrases, rare-character correction, punctuation/emoji/Latin preservation, Japanese kana forms and dictionary-load degradation. This checks coverage and selected outputs, not linguistic correctness for every sentence.

| Area | Result |
| --- | --- |
| Chinese forward conversion, mixed/hiragana/katakana, reverse history restoration and ambiguity warning | Pass |
| Mixed display retains familiar Han words and sparse accents in unfamiliar sentences; speech is identical across all three styles | Pass |
| Hero selector switches Cat 1/Cat 2, persists across reload and preserves text/reading/playback and current talking frame | Pass |
| Hero swap control is >=44×44px and sits at the large cat's bottom-right at all four tested widths | Pass |
| Pinned vendor SHA-256 checks, no external browser conversion requests and visible dictionary-load failure state | Pass |
| Contextual pinyin for 銀行行長重慶音樂快樂 in both scripts; previously unsupported novel sentences convert completely | Pass with real dictionaries |
| Funny Chinese reverse mode: ありがとう → 阿哩嘎多, Chinese speech payload, Japanese examples and separate legacy restoration mode | Pass |
| Kana normalization (hiragana/katakana/half-width/decomposed dakuten), digraphs, long vowels, short pauses and starter Japanese kanji vocabulary | Pass |
| Live updates, example selection and Chinese punctuation | Pass |
| Custom mapping creation, overwrite, deletion, conversion and persistence after reload | Pass |
| Copy, native Share invocation, clipboard Share fallback and failed-copy feedback | Pass with mocked platform APIs |
| Speech ja-JP/zh-TW, empty/delayed voices, automatic and manual voice selection, resume, Play/Stop, Clear and direction cancellation | Pass with mocked speech engine |
| Mixed-script display with shared katakana reading/speech payload, custom kanji readings and visibly bracketed unsupported Han | Pass |
| No Convert button, input/output inside speech bubbles, Chinese/Japanese cat roles and reverse-direction swap | Pass |
| Both cat expressions, pointer hold/release outside, keyboard hold/release and pointer cancellation | Pass |
| Mobile touch emulation: native touch tap produces open expression on pointerdown and closed expression on pointerup for both cats | Pass |
| Reply and hero talking frames, animation cleanup and reduced-motion steady expression | Pass with mocked speech and virtual clock |
| Idle typing does not cancel speech synthesis | Pass |
| Speech end/error, synchronous exception, missing start/end callbacks and unsupported browser | Pass with mocked speech engine and virtual clock |
| 320, 375, 390 and 1280px layouts, no horizontal overflow or cat/bubble/control overlaps | Pass |
| Both original cat images decode and render; original files unchanged | Pass |
| Editable control computed type >=16px, editable selection, selectable output, ordinary UI selection disabled | Pass |
| Interactive cats support buttons; image children do not intercept pointer events | Inspected in CSS; pointer and keyboard checks pass |
| HTML image assets and manifest icon requests, JavaScript syntax, browser console | Pass |
| Icon dimensions, alpha transparency and source aspect ratio | Pass: 32, 180, 192 and 512px square RGBA icons |

Screenshots at mobile and desktop widths were visually inspected. Text containing HTML markup remains literal text in the result. All four uploaded PNGs remain unchanged; alternate frames are preloaded and decoded.

## Remaining manual device checks

No physical iPhone was connected. Playwright WebKit is not iOS Safari, and mocked synthesis verifies application behavior rather than audible output. Test actual ja-JP and zh-TW installed voices, first-tap playback after cold launch, rapid Play/Stop, mute/volume settings, background/foreground, missing downloaded voices, and Home Screen playback on an iPhone. Also verify keyboard appearance/orientation stability, actual input-focus zoom behavior, pinch zoom, long-press editing and native Copy/Share sheets. Automated font-size and layout assertions support these behaviors but do not prove them on hardware.

Speech can still fail if the OS has no suitable voice or rejects playback. The interface reports failure or recovers after a bounded timeout, offers a manual voice choice and iPhone help, and cannot install system voices. The user's reported iOS silence has not been reproduced on a physical iPhone; the compatibility changes are not a verified device-specific fix. Japanese synthesis uses the displayed katakana reading but remains an approximation of Mandarin pronunciation. Unknown Han characters are skipped in speech with feedback; the main result is retained. Existing reverse conversion remains best effort.

The forward dictionary is broad, not universal; names, regional readings and rare extension characters can require custom mappings. Japanese → funny Chinese currently covers kana and a starter vocabulary rather than arbitrary kanji readings. Unknown Japanese kanji are explicitly bracketed and excluded from speech; enter their kana reading. Funny Chinese output imitates sound, not meaning or exact pronunciation. The original decoder remains available and ambiguous.
