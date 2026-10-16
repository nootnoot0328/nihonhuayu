# v1.3 validation — 2026-10-16

Automated `tests/browser.cjs` passed in headless Microsoft Edge and Playwright WebKit 26.5 on Windows.

| Area | Result |
| --- | --- |
| Chinese forward conversion, mixed/hiragana/katakana, reverse history restoration and ambiguity warning | Pass |
| Live updates, example selection and Chinese punctuation | Pass |
| Custom mapping creation, conversion and persistence after reload | Pass |
| Copy, native Share invocation, clipboard Share fallback and failed-copy feedback | Pass with mocked platform APIs |
| Speech ja-JP/zh-TW, empty/delayed voices, exact voice selection, resume, Play/Stop, Clear and direction cancellation | Pass with mocked speech engine |
| Speech end/error, synchronous exception, missing start/end callbacks and unsupported browser | Pass with mocked speech engine and virtual clock |
| 320, 375, 390 and 1280px layouts, no horizontal overflow or cat/control overlaps | Pass |
| Both original cat images decode and render; original files unchanged | Pass |
| Editable control computed type >=16px, editable selection, selectable output, ordinary UI selection disabled | Pass |
| Decorative cats ignore pointer events; reduced-motion preference enabled during checks | Pass |
| HTML image assets and manifest icon requests, JavaScript syntax, browser console | Pass |
| Icon dimensions, alpha transparency and source aspect ratio | Pass: 32, 180, 192 and 512px square RGBA icons |

Screenshots at mobile and desktop widths were visually inspected. Text containing HTML markup remains literal text in the result.

## Remaining manual device checks

No physical iPhone was connected. Playwright WebKit is not iOS Safari, and mocked synthesis verifies application behavior rather than audible output. Test actual ja-JP and zh-TW installed voices, first-tap playback after cold launch, rapid Play/Stop, mute/volume settings, background/foreground, missing downloaded voices, and Home Screen playback on an iPhone. Also verify keyboard appearance/orientation stability, actual input-focus zoom behavior, pinch zoom, long-press editing and native Copy/Share sheets. Automated font-size and layout assertions support these behaviors but do not prove them on hardware.

Speech can still fail if the OS has no suitable voice or rejects playback. The interface reports failure or recovers after a bounded timeout; it cannot install system voices. Japanese synthesis does not reproduce Mandarin pronunciation. Existing reverse conversion remains best effort.
