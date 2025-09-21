import { createRequire } from 'module';
import logger from '../utils/logger.js';

// Create require function for CommonJS modules
const require = createRequire(import.meta.url);

class KeybindManager {
    constructor() {
        this.globalListener = null;
        this.registeredKeys = new Map();
        this.isInitialized = false;
    }

    async initialize() {
        if (this.isInitialized) return;
        
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
        const parts = keyString.toLowerCase().split('+');
        const modifiers = {
            ctrl: false,
            shift: false,
            alt: false,
            meta: false
        };
        
        let mainKey = parts[parts.length - 1];
        
        // Check for modifiers
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i].trim();
            if (part === 'ctrl' || part === 'control') {
                modifiers.ctrl = true;
            } else if (part === 'shift') {
                modifiers.shift = true;
            } else if (part === 'alt') {
                modifiers.alt = true;
            } else if (part === 'meta' || part === 'cmd' || part === 'command') {
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
            ctrl: down['LEFT CTRL'] || down['RIGHT CTRL'] || false,
            shift: down['LEFT SHIFT'] || down['RIGHT SHIFT'] || false,
            alt: down['LEFT ALT'] || down['RIGHT ALT'] || false,
            meta: down['LEFT META'] || down['RIGHT META'] || false
        };
        
        // All required modifiers must match
        return Object.keys(keyInfo.modifiers).every(mod => 
            keyInfo.modifiers[mod] === currentModifiers[mod]
        );
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