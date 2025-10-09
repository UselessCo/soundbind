# Soundbind Configurations

This directory contains pre-made configuration files for Soundbind.

## Available Configs

### `default.yaml`
Basic configuration with example sounds. Good starting point for new users.

**Keys:**
- `1` - Danca gatinho sound
- `2` - Oloquinho sound
- `3` - Omaewa sound

### `soundbind.example.yaml`
Simple example showing how to use included sounds from the package. Perfect for quick start.

### `template.yaml`
Comprehensive template showing all available options and key combinations. Use this as a reference when creating your own configs.

## Using Configs

### From Installed Package

```bash
# Copy a config to your project
cp $(npm root -g)/soundbind/src/configs/default.yaml ./soundbind.yaml

# Edit and run
soundbind
```

### From Source

```bash
npm start
# or
node index.js ./src/configs/default.yaml
```

## Contributing Configs

Share your keybind setups with the community!

### Config Guidelines

1. **Theme**: Create themed configs (gaming, streaming, memes, work, etc.)
2. **Documentation**: Add clear descriptions for each keybind
3. **Naming**: Use descriptive names (e.g., `gaming.yaml`, `streaming.yaml`, `memes.yaml`)
4. **Paths**: Use relative paths to `../../assets/sounds/`
5. **Testing**: Test your config before submitting

### Config Template

```yaml
profile:
  name: "Your Config Name"
  description: "Brief description of this config"

audio:
  player: "play"
  maxConcurrent: 5

keybinds:
  - key: "F1"
    sound: "../../assets/sounds/your-sound.mp3"
    description: "Clear description"
    
  - key: "ctrl+F1"
    sound: "../../assets/sounds/another-sound.mp3"
    stopOthers: true
    description: "Another sound"

settings:
  hotReload: true
  preloadSounds: true

logging:
  level: "info"
  fileEnabled: true
  filePath: "logs"
```

### How to Contribute

1. Fork the repository
2. Create your config file in this directory
3. Add it to this README
4. Test thoroughly
5. Submit a Pull Request

## Config Ideas

Want to contribute but need inspiration? Here are some ideas:

- **Gaming**: Victory sounds, defeat sounds, level up
- **Streaming**: Alerts, donations, subscriptions
- **Memes**: Popular meme sounds
- **Work**: Meeting sounds, break reminders
- **Music**: Drum pads, sound effects
- **Podcasting**: Intro/outro, transitions
- **Presentations**: Applause, transitions

## Need Help?

- See [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed guidelines
- Check [template.yaml](template.yaml) for all available options
- Open an issue if you have questions
