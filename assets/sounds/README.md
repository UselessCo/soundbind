# Soundbind Sounds Collection

This directory contains community-contributed sound files for Soundbind.

## Included Sounds

- `danca-gatinho.mp3` (32KB) - Dance cat meme sound
- `oloquinho.mp3` (301KB) - Brazilian meme sound
- `omaewa.mp3` (119KB) - Anime reference sound

## Contributing Sounds

We welcome sound contributions! Please follow these guidelines:

### Requirements

1. **Format**: MP3 only (for Windows compatibility)
2. **Size**: Keep files under 500KB when possible
3. **Quality**: Clear audio, no distortion, 128-192 kbps recommended
4. **Licensing**: Only submit sounds you have rights to use
5. **Naming**: Use descriptive, lowercase names with hyphens

### How to Contribute

1. Fork the repository
2. Add your sound file to this directory
3. Update this README with your sound info
4. Create or update a config in `src/configs/` that uses your sound
5. Submit a Pull Request

### Sound Info Template

When adding a sound, please add it to the list above:

```markdown
- `your-sound.mp3` (XXkB) - Brief description
```

## Usage

Reference sounds in your config files:

```yaml
keybinds:
  - key: "1"
    sound: "./node_modules/soundbind/assets/sounds/danca-gatinho.mp3"
    description: "Dance cat"
```

Or if using from source:

```yaml
keybinds:
  - key: "1"
    sound: "../../assets/sounds/danca-gatinho.mp3"
    description: "Dance cat"
```

## License

All sounds are subject to the project's MIT License. By contributing sounds, you agree to the terms in [DISCLAIMER.md](../../DISCLAIMER.md).

Contributors represent that they have the necessary rights to submit their contributions.
