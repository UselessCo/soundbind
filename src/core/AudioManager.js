import fs from 'fs';
import { createRequire } from 'module';
import logger from '../utils/logger.js';

// Create require function for CommonJS modules
const require = createRequire(import.meta.url);

class AudioManager {
    constructor(options = {}) {
        this.options = {
            maxConcurrentSounds: 5,
            defaultVolume: 0.8,
            ...options
        };
        
        this.playSound = null;
        this.activeSounds = new Map();
        this.soundCounter = 0;
    }

    async initialize(audioConfig = {}) {
        // Use play-sound for cross-platform audio
        this.playSound = require('play-sound')(audioConfig);
        logger.debug('Audio manager initialized');
    }

    async preload(soundFile) {
        // Check if file exists
        if (!fs.existsSync(soundFile)) {
            throw new Error(`Sound file not found: ${soundFile}`);
        }
        
        // For play-sound, we just verify the file exists
        // Actual preloading would require more complex audio library
        return true;
    }

    async play(soundFile, options = {}) {
        return new Promise((resolve, reject) => {
            // Check concurrent sound limit
            if (this.activeSounds.size >= this.options.maxConcurrentSounds) {
                logger.warn('Max concurrent sounds reached');
            }
            
            // Prepare sound options
            const soundOptions = {
                ...options
            };
            
            // Generate unique sound ID
            const soundId = ++this.soundCounter;
            
            try {
                // Play the sound
                const player = this.playSound.play(soundFile, soundOptions, (err) => {
                    // Remove from active sounds when done
                    this.activeSounds.delete(soundId);
                    
                    if (err && !err.killed) {
                        logger.error(`Sound playback error: ${err.message}`);
                        reject(err);
                    } else {
                        resolve(soundId);
                    }
                });
                
                // Store reference for potential stopping
                this.activeSounds.set(soundId, {
                    player,
                    file: soundFile,
                    startTime: Date.now()
                });
                
            } catch (error) {
                reject(error);
            }
        });
    }

    stopAll() {
        for (const [soundId, sound] of this.activeSounds.entries()) {
            try {
                if (sound.player && sound.player.kill) {
                    sound.player.kill();
                }
            } catch (error) {
                logger.warn(`Failed to stop sound ${soundId}: ${error.message}`);
            }
        }
        this.activeSounds.clear();
        logger.debug('All sounds stopped');
    }

    stop(soundId) {
        const sound = this.activeSounds.get(soundId);
        if (sound && sound.player && sound.player.kill) {
            try {
                sound.player.kill();
                this.activeSounds.delete(soundId);
                return true;
            } catch (error) {
                logger.warn(`Failed to stop sound ${soundId}: ${error.message}`);
            }
        }
        return false;
    }

    async cleanup() {
        this.stopAll();
        logger.debug('Audio manager cleaned up');
    }
}

export default AudioManager;