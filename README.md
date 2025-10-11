[![CI/CD](https://github.com/UselessCo/soundbind/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/UselessCo/soundbind/actions/workflows/test.yml) [![npm version](https://badge.fury.io/js/soundbind.svg)](https://www.npmjs.com/package/soundbind) [![npm downloads](https://img.shields.io/npm/dm/soundbind.svg)](https://www.npmjs.com/package/soundbind) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# Soundbind

A lightweight, cross-platform keybind-based soundboard system built with Node.js. Map keyboard shortcuts to audio files for gaming, streaming, presentations, or just for fun.

> 🎵 **Community-Driven**: Contribute your sounds and configurations! Help build the ultimate soundboard collection.

---

## 🎃 Hacktoberfest Welcome! Perfect for First-Time Contributors

**Looking for an easy first contribution?** You're in the right place! This project was specifically designed to welcome beginners and provide a meaningful contribution experience.

### Why Contribute Here?

- ✅ **Beginner-Friendly** - No complex algorithms or deep technical knowledge required
- 🎵 **Fun & Creative** - Add your favorite sound effects and memes
- 📦 **Real Impact** - Your contribution becomes part of a published npm package used by real users
- 🚀 **Learn Git & GitHub** - Practice the full contribution workflow in a supportive environment
- 🏆 **Build Your Portfolio** - Get your name in the contributors list of a public package
- ⚡ **Quick Approval** - Most PRs reviewed and merged within 24 hours

### Easy Ways to Contribute

1. **[Add Sound Effects](../../issues/2)** (5 minutes)
   - Drop an MP3 file in `assets/sounds/` with a kebab-case name
2. **[Create or Update Configs](../../issues/3)** (10 minutes)
   - Share your custom keybind setup in `src/configs/`
3. **Improve Docs** (15 minutes)
   - Fix typos, add examples, or clarify instructions
4. **[Share Ideas](../../issues/1)** (5 minutes)
   - Suggest new sounds, configs, or features

**Your first PR gets you:**

- 🎖️ Listed as a contributor
- 📦 Your contribution in the next npm release
- 🌟 Hacktoberfest credit (if participating)

👉 **Ready to start?** Check out our **[good first issues](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)** or read [CONTRIBUTING.md](CONTRIBUTING.md) for step-by-step instructions!

---

## Features

- 🎹 **Global Hotkeys** - Works even when the application isn't focused
- 🔊 **MP3 Audio Support** - Universal format for all platforms
- ⚡ **Hot Reload** - Automatically reloads configuration when files change
- 🛑 **Stop Others** - Stop all playing sounds before playing a new one
- 🖥️ **Cross-Platform** - Windows, macOS, and Linux support
- 📝 **YAML Configuration** - Human-readable configuration files
- 📊 **File Logging** - Optional file-based logging with daily rotation

## Installation

### Global Installation (Recommended)

```bash
# Install globally
npm install -g soundbind

# Or use with npx (no installation needed)
npx soundbind
```

### Local Installation

```bash
# Install as a dependency
npm install soundbind

# Or install from source
git clone https://github.com/UselessCo/soundbind.git
cd soundbind
npm install
```

## Quick Start

### Option 1: Use Included Configs & Sounds

Soundbind comes with pre-configured setups and sounds:

```bash
# Install globally
npm install -g soundbind

# Copy example config to your directory
cp $(npm root -g)/soundbind/src/configs/default.yaml ./soundbind.yaml

# Run it!
soundbind
```

Included configs:

- `default.yaml` - Basic setup with example sounds
- `template.yaml` - Comprehensive template with all options

### Option 2: Create Your Own Config

1. Create a `soundbind.yaml` configuration file in your project directory:

```yaml
keybinds:
  - key: '1'
    sound: './node_modules/soundbind/assets/sounds/danca-gatinho.mp3'
    description: 'Danca gatinho'

  - key: '2'
    sound: './node_modules/soundbind/assets/sounds/oloquinho.mp3'
    description: 'Oloquinho'

  # Or use your own sounds
  - key: 'F1'
    sound: './my-sounds/custom.mp3'
    description: 'My custom sound'

audio:
  player: 'play' # Recommended for Linux
  maxConcurrent: 5

logging:
  level: 'info'
  fileEnabled: true
  filePath: 'logs'
```

2. Sounds are included in the package! Or add your own to a `my-sounds/` directory

3. Run Soundbind:

```bash
# If installed globally
soundbind

# With npx
npx soundbind

# With custom config path
soundbind ./my-config.yaml

# From source
npm start
```

## Audio Setup

### Linux (Recommended)

Install SoX with MP3 support:

```bash
sudo apt install sox libsox-fmt-mp3  # Ubuntu/Debian
```

### Windows/macOS

Audio should work out of the box with the default system player.

## Programmatic Usage

You can also use Soundbind as a library in your Node.js projects:

```javascript
import Soundbind from 'soundbind';

const soundbind = new Soundbind();

await soundbind.start('./soundbind.yaml');

// Play a sound manually
await soundbind.playSound('./sounds/beep.mp3');

// Stop all sounds
await soundbind.stop();
```

## Configuration

See `template.yaml` in the [repository](https://github.com/UselessCo/soundbind/blob/main/src/configs/template.yaml) for a complete configuration example with all available options and supported key combinations.

### Supported Keys

- **Letters**: a-z
- **Numbers**: 0-9
- **Function Keys**: F1-F12
- **Numpad**: numpad0-numpad9
- **Modifiers**: ctrl, shift, alt + any key
- **Special**: space, enter, escape, tab

### Keybind Options

- `stopOthers`: true/false - Stop other sounds before playing
- `description`: Human-readable description

### Logging Options

- `level`: debug, info, warn, error - Log verbosity
- `fileEnabled`: true/false - Enable file logging
- `filePath`: Directory path for log files

## Future Features

Planned features for future releases:

- 🔄 **Loop Support** - Continuous sound playback
- 🎛️ **Volume Control** - Individual and master volume settings
- 🎶 **Audio Fading** - Fade in/out effects
- 🎯 **Priority System** - Sound priority management
- ⏱️ **Delayed Playback** - Schedule sounds with delay
- 🔊 **Output Device Selection** - Choose specific audio output
- 📡 **System Tray** - Minimize to system tray

## Requirements

- Node.js 14.0.0 or higher
- Linux: SoX with MP3 support (recommended)

## Contributing

🎵 **We love contributions!** Especially:

- **New Sounds**: Add your favorite sound effects to `assets/sounds/`
- **Configurations**: Share your keybind setups in `src/configs/`
- **Bug Fixes**: Help improve stability
- **Features**: Implement items from the Future Features list

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Add your sounds to `assets/sounds/` or configs to `src/configs/`
3. Test your changes
4. Submit a Pull Request with description

**Sound Guidelines:**

- Format: MP3 only (for Windows compatibility)
- Size: Under 500KB preferred
- Quality: 128-192 kbps recommended
- Naming: descriptive-name.mp3
- License: Only submit sounds you have rights to use

## Support

- 📖 [Documentation](https://github.com/UselessCo/soundbind)
- 🐛 [Issue Tracker](https://github.com/UselessCo/soundbind/issues)
- 💬 [Discussions](https://github.com/UselessCo/soundbind/discussions)

## Disclaimer

This is an open-source project. Sound files and configurations are community-contributed and subject to the MIT License. Contributors represent that they have necessary rights to submit content. See [DISCLAIMER.md](DISCLAIMER.md) for full details.

## License

MIT License - see [LICENSE](LICENSE) for details.
