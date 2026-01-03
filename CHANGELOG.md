# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-01-03

### Added

- Many new sound assets (effects, ambience, jingles and samples), including `aizen-yokoso.mp3`, `among-us.mp3`, `awesome-music.mp3`, `intro-jingle.mp3`, `outro-sting.mp3`, `jazz.mp3`, `light-saber.mp3`, `sci-fi-picking-detector.mp3`, `spiderman.mp3`, `troll-laugh.mp3`, and a set of piano samples under `assets/sounds/piano-keys/`.
- New config presets:
  - `src/configs/among-us-sound.yaml`
  - `src/configs/barking.yaml`
  - `src/configs/bleach-sound.yaml`
  - `src/configs/elonmusk-secretaria.yaml`
  - `src/configs/fire-alarm.yaml`
  - `src/configs/firework.yaml`
  - `src/configs/funny-car-horn.yaml`
  - `src/configs/healing-magic-config.yaml`
  - `src/configs/jazz-music.yaml`
  - `src/configs/maoe-silviosantos.yaml`
  - `src/configs/memes.yaml`
  - `src/configs/nature.yaml`
  - `src/configs/piano-keyboard.yaml`
  - `src/configs/podcast-stingers.yaml`
  - `src/configs/sci-fi-picking-detector.yaml`
  - `src/configs/sci-fi.yaml`
- Added `CODE_OF_CONDUCT.md`.
- Added `lint-configs.js` to support config validation.

### Changed

- `README.md`: removed Hacktoberfest references; added evergreen contributors note and auto-generated contributors badge/section.
- `postinstall.js`: prints a brief thank-you message on install.
- `src/configs/default.yaml`: updated keybinds and audio settings.
- `src/Soundbind.js` and `src/core/AudioManager.js`: internal improvements.
- `package.json`: metadata/package tweaks.
- Project housekeeping: updated `.gitattributes`, `.github/pull_request_template.md`, `assets/sounds/README.md`, and `src/configs/README.md`.

### Fixed

- Lint/tooling adjustments: `eslint.config.js` and `lint-assets.js` updated to accommodate new assets/configs.
- Template rename: `src/configs/soundbind.example.yaml` to `src/configs/soundbind-example.yaml`.

[1.1.0]: https://github.com/UselessCo/soundbind/releases/tag/v1.1.0

---

## [1.0.0] - 2025-10-09

### Added

- Initial release of Soundbind
- Global hotkey support for keyboard shortcuts
- MP3 audio playback (cross-platform)
- Hot reload configuration support
- Stop others functionality
- File logging with daily rotation
- 3 included MP3 sound files (danca-gatinho, oloquinho, omaewa)
- Pre-configured configs (default.yaml, template.yaml)
- CLI executable with config name resolution (`soundbind default`)
- Community contribution guidelines
- Comprehensive documentation

### Features

- Cross-platform support (Windows, macOS, Linux)
- YAML configuration files
- Preload sounds for faster playback
- Concurrent sound limit control
- Graceful shutdown handling

### Technical

- ES modules with proper `.js` extensions
- Organized constants structure
- Proper error handling
- Windows VBS script for audio playback
- SoX support for Linux

[1.0.0]: https://github.com/UselessCo/soundbind/releases/tag/v1.0.0
