# Changelog

## v1.7 — 2026-10-16

- Speech now ends with a cat sound: 「喵」 for Chinese results and 「ニャン」 for Japanese results, inserted before closing punctuation so questions still sound like questions.
- Speech only — the displayed result, Copy and Share are unchanged.
- Add a 「朗讀結尾加貓叫」 toggle in 語音設定 (on by default, saved on this device).

## v1.6 — 2026-10-16

- Restore mixed-script personality with familiar Chinese words and sparse Han accents in other sentences; retain kana-only display modes and unchanged katakana speech readings.
- Rename the mixed style 「漢字混搭」 so the choice is clear.
- Add a 44px hero-cat swap button at the mascot's bottom-right, save the selection locally, and retain both expression and speaking states when switching.
- Keep custom mappings, broad pronunciation coverage, reverse conversion, language-associated cats and the user's latest uploaded artwork intact.

## v1.5 — 2026-10-16

- Replace the limited forward character lookup with a bundled pinyin-pro dictionary and explicit kana spellings for all 416 vendor syllables tested.
- Normalize Traditional Chinese with local OpenCC for contextual readings such as 銀行, 行長, 重慶 and 音樂, preserving original input and history.
- Generate display and katakana speech from one result, retain built-in jokes, prioritize custom mappings inside curated phrases and visibly flag rare unknown characters for correction.
- Add Japanese → funny Chinese homophones as the default reverse mode, with Chinese speech, kana normalization, digraphs, long vowels, short pauses and Japanese examples.
- Preserve the original history-based reverse decoder under 「還原原句」 with its ambiguity warnings and saved data intact.
- Bundle pinned libraries with licenses/provenance and test syllable coverage, novel sentences, context, unknown corrections, both reverse modes, speech and mobile layouts.

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
