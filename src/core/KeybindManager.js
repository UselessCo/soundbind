import { createRequire } from 'module';

import logger from '../common/utils/logger.js';
import keybindConstants from '../common/constants/keybind.js';

// Create require function for CommonJS modules
const require = createRequire(import.meta.url);

class KeybindManager {
  constructor() {
    this.globalListener = null;
    this.registeredKeys = new Map();
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) {
      return;
    }

    try {
      const { GlobalKeyboardListener } = require('node-global-key-listener');
      this.globalListener = new GlobalKeyboardListener();
      this.isInitialized = true;
      logger.debug('Keyboard listener initialized');
    } catch (error) {
      logger.error(`Failed to initialize keyboard listener: ${error.message}`);
      throw error;
    }
  }

  register(keyString, handler) {
    if (!this.isInitialized) {
      this.initialize();
    }

    // Parse key combination
    const keyInfo = this.parseKeyString(keyString);

    // Create wrapper handler that checks modifiers
    const wrapperHandler = (e, down) => {
      if (this.matchesKeyCombo(e, down, keyInfo)) {
        handler({
          key: e.name,
          state: e.state,
          rawKey: e.rawKey
        });
      }
    };

    // Register with global listener
    this.globalListener.addListener(wrapperHandler);

    // Store for cleanup
    this.registeredKeys.set(keyString, {
      handler: wrapperHandler,
      keyInfo
    });

    logger.debug(`Registered keybind: ${keyString}`);
  }

  parseKeyString(keyString) {
    const parts = keyString.toLowerCase().split(keybindConstants.KEY_COMBINATION_SEPARATOR);
    const modifiers = {
      ctrl: false,
      shift: false,
      alt: false,
      meta: false
    };

    const mainKey = parts[parts.length - 1];

    // Check for modifiers
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i].trim();
      if (part === keybindConstants.MODIFIER_TYPE_CTRL || part === keybindConstants.MODIFIER_TYPE_CONTROL) {
        modifiers.ctrl = true;
      } else if (part === keybindConstants.MODIFIER_TYPE_SHIFT) {
        modifiers.shift = true;
      } else if (part === keybindConstants.MODIFIER_TYPE_ALT) {
        modifiers.alt = true;
      } else if (
        part === keybindConstants.MODIFIER_TYPE_META ||
        part === keybindConstants.MODIFIER_TYPE_CMD ||
        part === keybindConstants.MODIFIER_TYPE_COMMAND
      ) {
        modifiers.meta = true;
      }
    }

    return {
      mainKey: mainKey.toUpperCase(),
      modifiers
    };
  }

  matchesKeyCombo(e, down, keyInfo) {
    // Check if main key matches
    if (e.name.toUpperCase() !== keyInfo.mainKey) {
      return false;
    }

    // Check modifiers
    const currentModifiers = {
      ctrl: down[keybindConstants.MODIFIER_LEFT_CTRL] || down[keybindConstants.MODIFIER_RIGHT_CTRL] || false,
      shift: down[keybindConstants.MODIFIER_LEFT_SHIFT] || down[keybindConstants.MODIFIER_RIGHT_SHIFT] || false,
      alt: down[keybindConstants.MODIFIER_LEFT_ALT] || down[keybindConstants.MODIFIER_RIGHT_ALT] || false,
      meta: down[keybindConstants.MODIFIER_LEFT_META] || down[keybindConstants.MODIFIER_RIGHT_META] || false
    };

    // All required modifiers must match
    return Object.keys(keyInfo.modifiers).every((mod) => keyInfo.modifiers[mod] === currentModifiers[mod]);
  }

  unregister(keyString) {
    const keyData = this.registeredKeys.get(keyString);
    if (keyData && this.globalListener) {
      try {
        this.globalListener.removeListener(keyData.handler);
        this.registeredKeys.delete(keyString);
        logger.debug(`Unregistered keybind: ${keyString}`);
        return true;
      } catch (error) {
        logger.warn(`Failed to unregister keybind ${keyString}: ${error.message}`);
      }
    }
    return false;
  }

  unregisterAll() {
    for (const keyString of this.registeredKeys.keys()) {
      this.unregister(keyString);
    }
    logger.debug('All keybinds unregistered');
  }

  getRegisteredKeys() {
    return Array.from(this.registeredKeys.keys());
  }
}

export default KeybindManager;
