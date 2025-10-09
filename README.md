# Soundbind

A lightweight, cross-platform keybind-based soundboard system built with Node.js. Map keyboard shortcuts to audio files for gaming, streaming, presentations, or just for fun.

## Features

- 🎹 **Global Hotkeys** - Works even when the application isn't focused
- 🔊 **Multiple Audio Formats** - Supports MP3, WAV, OGG files
- ⚡ **Hot Reload** - Automatically reloads configuration when files change
- 🛑 **Stop Others** - Stop all playing sounds before playing a new one
- 🖥️ **Cross-Platform** - Windows, macOS, and Linux support
- 📝 **YAML Configuration** - Human-readable configuration files
- 📊 **File Logging** - Optional file-based logging with daily rotation

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/UselessCo/soundbind.git
cd soundbind

# Install dependencies
npm install
```

### Basic Usage

1. Create a configuration file in `src/configs/` (or use the existing `default.yaml`):

```yaml
keybinds:
  - key: "F1"
    sound: "../../assets/sounds/victory.mp3"
    description: "Victory sound"
    
  - key: "ctrl+F1"
    sound: "../../assets/sounds/airhorn.mp3"
    stopOthers: true
    description: "Airhorn blast"

audio:
  player: "play"  # Recommended for Linux
  maxConcurrent: 5

logging:
  level: "info"
  fileEnabled: true
  filePath: "logs"
```

2. Add your audio files to `assets/sounds/`

3. Run Soundbind:

```bash
# Run with default config
npm start

# Run with custom config
npm run dev ./src/configs/my-config.yaml

# Run directly with Node.js
node index.js ./src/configs/my-config.yaml
```

## Audio Setup

### Linux (Recommended)
Install SoX with MP3 support:
```bash
sudo apt install sox libsox-fmt-mp3  # Ubuntu/Debian
```

### Windows/macOS
Audio should work out of the box with the default system player.

## Configuration

See `template.yaml` for a complete configuration example with all available options and supported key combinations.

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

## License

MIT License - see [LICENSE](LICENSE) for details.