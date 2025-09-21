import SoundbindEngine from './src/core/SoundbindEngine.js';
import logger from './src/utils/logger.js';
import process from 'process';

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

    async start(configPath = 'src/configs/default.yaml') {
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
}

// Check if this is the main module (CLI usage)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
    const configPath = process.argv[2] || 'src/configs/default.yaml';
    const soundbind = new Soundbind();
    
    soundbind.start(configPath)
        .then(() => {
            console.log('Soundbind is running! Press Ctrl+C to stop.');
            
            // Handle graceful shutdown
            process.on('SIGINT', async () => {
                console.log('\nShutting down...');
                await soundbind.stop();
                process.exit(0);
            });

            process.on('SIGTERM', async () => {
                await soundbind.stop();
                process.exit(0);
            });
        })
        .catch((error) => {
            console.error('Failed to start soundbind:', error.message);
            process.exit(1);
        });
}

export default Soundbind;