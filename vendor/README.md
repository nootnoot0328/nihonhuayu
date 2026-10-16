# Bundled browser dictionaries

These pinned UMD builds are copied verbatim from official npm release archives. They are served by this repository, with no runtime CDN or dictionary downloads. Only the browser builds needed for this application are included; no package install or build step is needed to run the site.

| File | Upstream | Version | Bytes | SHA-256 |
| --- | --- | --- | --- | --- |
| `pinyin-pro-3.29.5.js` | [zh-lx/pinyin-pro](https://github.com/zh-lx/pinyin-pro), npm `pinyin-pro`, `dist/index.js` | 3.29.5 | 325698 | `a488173470768ace074c3c4fffbb880e83523b3aa9598a8147c930e7f2d5c7dc` |
| `opencc-t2cn-1.4.2.js` | [nk2028/opencc-js](https://github.com/nk2028/opencc-js), npm `opencc-js`, `dist/umd/t2cn.js` | 1.4.2 | 109333 | `5009384a6bdc904babee967a8bb9928e3c92288ec8a89ed036d53257e74cd8ab` |

The combined uncompressed JavaScript size is 435031 bytes. Both scripts bundle their data. OpenCC is used only for pronunciation analysis: Traditional Chinese is normalized so pinyin-pro can match its contextual phrase dictionary; source/display/history text is retained.

## Attribution and licenses

- pinyin-pro is MIT licensed; see [pinyin-pro-LICENSE.txt](./pinyin-pro-LICENSE.txt).
- opencc-js is MIT licensed; see [opencc-js-LICENSE.txt](./opencc-js-LICENSE.txt).
- Its bundled opencc-data dictionaries are Apache-2.0 licensed; see the upstream [opencc-THIRD_PARTY_LICENSES.md](./opencc-THIRD_PARTY_LICENSES.md) and [Apache-2.0.txt](./Apache-2.0.txt).

Archive integrity values recorded when the files were obtained:

- `pinyin-pro-3.29.5.tgz`: `sha512-Fk5YoRmtdHqJWqAuzYVG/NzvzeCbaG+ZEwbY6Nbps3QAIrvQQEtcm49frcyCM8i2b5najnzPDtYqrHRYTTiuwQ==`
- `opencc-js-1.4.2.tgz`: `sha512-EdcspgdROiCCZDM+jZR6Pa670xW+EW2QhctPBQ8gRjg6lrx4IHEl+2s+kt5izk/TkxVRgdWuFgaGkaEdIUfdaw==`

To update, review the upstream release, copy the pinned browser build and its applicable licenses, refresh this provenance record, and run both pronunciation and browser tests. The syllable coverage test should be reviewed if the vendor introduces new readings; never silently drop an unmapped syllable.
