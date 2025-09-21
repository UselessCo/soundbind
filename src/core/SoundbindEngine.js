import ConfigManager from './ConfigManager.js';
import AudioManager from './AudioManager.js';
import KeybindManager from './KeybindManager.js';
import logger from '../utils/logger.js';

class SoundbindEngine {
    constructor(options = {}) {
        this.options = options;
        this.config = null;
        
        this.configManager = new ConfigManager();
        this.audioManager = new AudioManager(options);
        this.keybindManager = new KeybindManager();
        
        this.activeKeybinds = new Map();
        this.loadedSounds = new Set();
        this.configWatcher = null;
    }

    async loadConfig(configPath) {
        try {
            this.config = await this.configManager.load(configPath);
            this.configPath = configPath;
            logger.info(`Configuration loaded: ${this.config.profile?.name || 'Default'}`);
            return this.config;
        } catch (error) {
            logger.error(`Failed to load configuration: ${error.message}`);
            throw error;
        }
    }

    async initialize() {
        if (!this.config) {
            throw new Error('No configuration loaded');
        }

        // Initialize audio system
        await this.audioManager.initialize(this.config.audio || {});
        
        // Preload sounds if enabled
        if (this.config.settings?.preloadSounds !== false) {
            await this.preloadSounds();
        }
        
        // Setup keybinds
        await this.setupKeybinds();
        
        // Watch config file for changes
        if (this.config.settings?.hotReload) {
            this.setupConfigWatcher();
        }
        
        logger.info('Soundbind engine initialized');
    }

    async preloadSounds() {
        const keybinds = this.config.keybinds || [];
        const soundFiles = new Set();
        
        // Collect unique sound files
        keybinds.forEach(keybind => {
            if (keybind.sound) {
                soundFiles.add(keybind.sound);
            }
        });
        
        logger.info(`Preloading ${soundFiles.size} sound files...`);
        
        // Preload each file
        for (const soundFile of soundFiles) {
            try {
                await this.audioManager.preload(soundFile);
                this.loadedSounds.add(soundFile);
                logger.debug(`Preloaded: ${soundFile}`);
            } catch (error) {
                logger.warn(`Failed to preload ${soundFile}: ${error.message}`);
            }
        }
    }

    async setupKeybinds() {
        const keybinds = this.config.keybinds || [];
        
        logger.info(`Setting up ${keybinds.length} keybinds...`);
        
        for (const keybind of keybinds) {
            const handler = this.createKeybindHandler(keybind);
            
            try {
                this.keybindManager.register(keybind.key, handler);
                this.activeKeybinds.set(keybind.key, keybind);
                logger.debug(`Registered: ${keybind.key} -> ${keybind.sound}`);
            } catch (error) {
                logger.warn(`Failed to register ${keybind.key}: ${error.message}`);
            }
        }
    }

    createKeybindHandler(keybind) {
        return async (keyEvent) => {
            if (keyEvent.state !== 'DOWN') return;
            
            try {
                // Stop other sounds if requested
                if (keybind.stopOthers) {
                    this.audioManager.stopAll();
                }
                
                await this.playSound(keybind.sound, {
                    volume: keybind.volume || this.options.defaultVolume,
                    loop: keybind.loop || false,
                    fadeIn: keybind.fadeIn,
                    fadeOut: keybind.fadeOut
                });
                
                logger.debug(`Played sound: ${keybind.sound} (${keybind.key})`);
            } catch (error) {
                logger.error(`Failed to play sound for ${keybind.key}: ${error.message}`);
            }
        };
    }

    async playSound(soundFile, options = {}) {
        if (!soundFile) {
            throw new Error('Sound file path is required');
        }

        return this.audioManager.play(soundFile, options);
    }

    setupConfigWatcher() {
        if (!this.configPath) return;
        
        import('fs').then(fs => {
            let reloadTimeout;
            
            this.configWatcher = fs.watch(this.configPath, (eventType) => {
                if (eventType === 'change') {
                    // Debounce multiple file change events
                    clearTimeout(reloadTimeout);
                    reloadTimeout = setTimeout(async () => {
                        try {
                            await this.reloadConfig(this.configPath);
                            logger.info('Configuration reloaded automatically');
                        } catch (error) {
                            logger.error(`Failed to reload config: ${error.message}`);
                        }
                    }, 500);
                }
            });
        });
    }

    async reloadConfig(configPath) {
        logger.info('Reloading configuration...');
        
        // Stop current keybinds
        this.keybindManager.unregisterAll();
        this.activeKeybinds.clear();
        
        // Reload configuration
        await this.loadConfig(configPath);
        
        // Reinitialize (skip audio manager reinit)
        if (this.config.settings?.preloadSounds !== false) {
            await this.preloadSounds();
        }
        await this.setupKeybinds();
        
        logger.info('Configuration reloaded successfully');
    }

    async cleanup() {
        if (this.configWatcher) {
            this.configWatcher.close();
        }
        
        this.keybindManager.unregisterAll();
        await this.audioManager.cleanup();
        
        this.activeKeybinds.clear();
        this.loadedSounds.clear();
        
        logger.info('Engine cleanup completed');
    }

    getActiveKeybinds() {
        return Array.from(this.activeKeybinds.values());
    }

    getLoadedSounds() {
        return Array.from(this.loadedSounds);
    }
}

export default SoundbindEngine;