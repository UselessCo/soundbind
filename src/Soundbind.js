import SoundbindEngine from './core/SoundbindEngine.js';
import logger from './utils/logger.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Soundbind {
    constructor(options = {}) {
        this.options = {
            logLevel: 'info',
            maxConcurrentSounds: 5,
            defaultVolume: 0.8,
            ...options
        };
        
        this.engine = new SoundbindEngine(this.options);
        this.isRunning = false;
    }

    async start(configPath = 'configs/default.yaml') {
        if (this.isRunning) {
            throw new Error('Soundbind is already running');
        }
        
        try {
            await this.engine.loadConfig(configPath);
            await this.engine.initialize();
            this.isRunning = true;
            
            logger.info('Soundbind started successfully!');
            return this;
        } catch (error) {
            logger.error(`Failed to start soundbind: ${error.message}`);
            throw error;
        }
    }

    async stop() {
        if (!this.isRunning) return;
        
        try {
            await this.engine.cleanup();
            this.isRunning = false;
            logger.info('Soundbind stopped');
        } catch (error) {
            logger.error(`Error stopping soundbind: ${error.message}`);
            throw error;
        }
    }

    async playSound(soundFile, options = {}) {
        if (!this.isRunning) {
            throw new Error('Soundbind is not running');
        }
        return this.engine.playSound(soundFile, options);
    }

    async reloadConfig(configPath) {
        if (!this.isRunning) {
            throw new Error('Soundbind is not running');
        }
        return this.engine.reloadConfig(configPath);
    }

    getStatus() {
        return {
            running: this.isRunning,
            activeKeybinds: this.engine.getActiveKeybinds(),
            loadedSounds: this.engine.getLoadedSounds(),
            config: this.engine.config
        };
    }

    // Helper function to resolve config path
    static resolveConfigPath(configNameOrPath) {
        // If it's an absolute path or relative path with slashes, use it directly
        if (path.isAbsolute(configNameOrPath) || configNameOrPath.includes('/') || configNameOrPath.includes('\\')) {
            return configNameOrPath;
        }

        // Otherwise, look in src/configs directory
        const configsDir = path.join(__dirname, 'configs');
        const possibleExtensions = ['.yaml', '.yml', '.json'];
        
        // Try to find the config file with different extensions
        for (const ext of possibleExtensions) {
            const testPath = path.join(configsDir, `${configNameOrPath}${ext}`);
            if (fs.existsSync(testPath)) {
                return testPath;
            }
        }

        // If not found in configs dir, try as direct path
        if (fs.existsSync(configNameOrPath)) {
            return configNameOrPath;
        }

        // Return null if not found
        return null;
    }

    // Helper to list available configs
    static listAvailableConfigs() {
        const configsDir = path.join(__dirname, 'configs');
        const possibleExtensions = ['.yaml', '.yml', '.json'];
        
        if (!fs.existsSync(configsDir)) {
            return [];
        }

        return fs.readdirSync(configsDir)
            .filter(file => possibleExtensions.some(ext => file.endsWith(ext)))
            .map(file => path.parse(file).name);
    }
}

export default Soundbind;