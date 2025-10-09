# Contributing to Soundbind

Thank you for your interest in contributing to Soundbind! We welcome contributions of all kinds.

## 🎵 Adding Sounds

We encourage users to contribute new sound files to the package!

### Sound Guidelines

1. **Format**: MP3 only (for cross-platform Windows compatibility)
2. **Size**: Keep files under 500KB when possible
3. **Quality**: Clear audio, no distortion, 128-192 kbps recommended
4. **Licensing**: Only submit sounds you have rights to use
5. **Naming**: Use descriptive, lowercase names with hyphens (e.g., `epic-victory.mp3`)

### How to Add Sounds

1. Fork the repository
2. Add your sound file to `assets/sounds/`
3. Update or create a config in `src/configs/` that uses your sound
4. Submit a Pull Request with:
   - Sound file(s)
   - Config file using the sound
   - Description of the sound

Example:
```yaml
# src/configs/gaming.yaml
keybinds:
  - key: "F1"
    sound: "../../assets/sounds/epic-victory.mp3"
    description: "Epic victory sound"
```

## ⚙️ Adding Configurations

Share your keybind configurations with the community!

### Config Guidelines

1. **Theme**: Create themed configs (gaming, streaming, memes, etc.)
2. **Documentation**: Add clear descriptions for each keybind
3. **Naming**: Use descriptive names (e.g., `gaming.yaml`, `streaming.yaml`)
4. **Paths**: Use relative paths to `assets/sounds/`

### Config Structure

```yaml
profile:
  name: "Your Config Name"
  description: "Brief description"

audio:
  player: "play"
  maxConcurrent: 5

keybinds:
  - key: "F1"
    sound: "../../assets/sounds/your-sound.mp3"
    description: "Clear description"

settings:
  hotReload: true
  preloadSounds: true

logging:
  level: "info"
  fileEnabled: true
  filePath: "logs"
```

## 🐛 Reporting Bugs

Found a bug? Please open an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node.js version)
- Config file (if relevant)

## 💡 Feature Requests

Have an idea? Open an issue with:

- Clear description of the feature
- Use case / why it's needed
- Proposed implementation (optional)

## 🔧 Code Contributions

### Setup

```bash
git clone https://github.com/UselessCo/soundbind.git
cd soundbind
npm install
```

### Development

```bash
# Run with default config
npm start

# Run with custom config
npm run dev ./src/configs/your-config.yaml
```

### Code Guidelines

1. **ES Modules**: Use `import/export` with `.js` extensions
2. **Constants**: Use constants from `src/common/constants/`
3. **Logging**: Use `logger` instead of `console.log`
4. **Error Handling**: Always handle errors gracefully
5. **Comments**: Add comments for complex logic

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### PR Checklist

- [ ] Code follows project style
- [ ] No console.log in production code
- [ ] All imports have .js extensions
- [ ] Changes are documented
- [ ] Tested on your platform

## 📁 Project Structure

```
soundbind/
├── assets/
│   └── sounds/          # Sound files (contribute here!)
├── bin/
│   └── soundbind.js     # CLI executable
├── src/
│   ├── common/
│   │   ├── constants/   # Constants
│   │   └── utils/       # Utilities
│   ├── configs/         # Config files (contribute here!)
│   │   ├── default.yaml
│   │   └── template.yaml
│   ├── core/            # Core functionality
│   └── Soundbind.js     # Main class
└── index.js             # Entry point
```

## 🎯 Areas for Contribution

### High Priority
- [ ] More sound files
- [ ] Themed configurations
- [ ] Platform-specific testing
- [ ] Documentation improvements

### Future Features (Help Wanted!)
- [ ] Loop support
- [ ] Volume control
- [ ] Audio fading
- [ ] Priority system
- [ ] Output device selection
- [ ] System tray support

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Every contribution helps make Soundbind better for everyone!
