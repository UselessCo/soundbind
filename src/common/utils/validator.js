import validationConstants from '../constants/validation.js';

function validateConfig(config) {
  const errors = [];

  // Check basic structure
  if (!config || typeof config !== 'object') {
    errors.push(validationConstants.ERROR_INVALID_STRUCTURE);
    return { valid: false, errors };
  }

  // Validate keybinds
  if (config.keybinds) {
    if (!Array.isArray(config.keybinds)) {
      errors.push(validationConstants.ERROR_INVALID_KEYBINDS_TYPE);
    } else {
      config.keybinds.forEach((keybind, index) => {
        if (!keybind.key) {
          errors.push(`keybind[${index}] ${validationConstants.ERROR_MISSING_KEY}`);
        }
        if (!keybind.sound) {
          errors.push(`keybind[${index}] ${validationConstants.ERROR_MISSING_SOUND}`);
        }
      });
    }
  }

  // Validate audio settings
  if (config.audio) {
    if (
      config.audio.maxConcurrent !== undefined &&
      (!Number.isInteger(config.audio.maxConcurrent) ||
        config.audio.maxConcurrent < validationConstants.CONCURRENT_SOUNDS_MIN)
    ) {
      errors.push(validationConstants.ERROR_INVALID_MAX_CONCURRENT);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export default {
  validateConfig
};
