# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
