# Changelog

## v1.4 — 2026-10-16

- Remove the Convert button; retain instant input conversion and all display modes.
- Put input and result inside cat speech bubbles. Associate Cat 1 with Chinese and Cat 2 with Japanese; reverse direction swaps positions.
- Add held expressions using the original uploaded `Cat 1 -2.png` and `Cat 2 -2.png`, with pointer capture, touch cancellation and keyboard support.
- Animate the reply cat and Cat 1 hero during native playback, restoring expressions on every stop path and respecting reduced motion.
- Read Japanese output using a separate katakana phonetic string shown in small text. Preserve the mixed-script display and Copy/Share result; omit unsupported Han from speech with visible feedback.
- Default Safari speech to language-based voice resolution, offer manual voice selection and iPhone help, and avoid idle cancellation or cancellation on normal completion.
- Extend Edge/WebKit regression checks for cat interactions, speaking frames, kana payloads, mapping edits/deletion and new speech-bubble layouts.

## v1.3 — 2026-10-16

- Integrate original `Cat 1.png` and `Cat 2.png` into compact conversations, header and main branding; retain original PNG bytes.
- Generate transparent 32, 180, 192 and 512px branding icons and update the manifest and Apple touch icon.
- Improve native speech voice loading and locale selection, synchronous tap initiation, Play/Stop states, cancellation, errors and recovery when native callbacks never arrive.
- Stop speech on Clear and preserve cancellation during conversion, direction changes and page hiding.
- Explain Japanese TTS pronunciation limitations in the interface.
- Preserve 16px editable controls, pinch zoom and selectable results; keep decorative elements from intercepting gestures.
- Respect reduced motion for example navigation and make Share failures understandable.
- Add browser regression checks and document real-device limitations.

## v1.2

- Mobile input styles and initial native speech playback.

## v1.1

- Instant conversion, custom local pronunciation mappings and transparent SVG mascot.
