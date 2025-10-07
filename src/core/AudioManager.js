import fs from 'fs';
import { createRequire } from 'module';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import logger from '../utils/logger.js';

// Create require function for CommonJS modules
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class AudioManager {
    constructor(options = {}) {
        this.options = {
            maxConcurrentSounds: 5,
            defaultVolume: 0.8,
            ...options
        };
        
        this.playSound = null;
        this.useWindowsVBS = false;
        this.activeSounds = new Map();
        this.soundCounter = 0;
    }

    async initialize(audioConfig = {}) {
        const platform = process.platform;
        
        if (platform === 'win32') {
            // Windows: Use VBScript for silent background playback
            this.useWindowsVBS = true;
            logger.info('Using Windows Media Player via VBScript');
        } else {
            // Linux/macOS: Use play-sound
            // Linux: Explicitly set SoX if not configured
            if (platform === 'linux' && !audioConfig.player) {
                audioConfig.player = 'play'; // SoX
            }
            // macOS: Automatically uses afplay (play-sound default)
            
            this.playSound = require('play-sound')(audioConfig);
            logger.info(`Using play-sound for ${process.platform}`);
        }
       
        logger.debug('Audio manager initialized');
    }

    async preload(soundFile) {
        // Check if file exists
        if (!fs.existsSync(soundFile)) {
            throw new Error(`Sound file not found: ${soundFile}`);
        }
        
        // For play-sound, we just verify the file exists
        return true;
    }

    async play(soundFile, options = {}) {
        if (this.useWindowsVBS) {
            return this.playWithWindowsVBS(soundFile, options);
        } else {
            return this.playWithPlaySound(soundFile, options);
        }
    }

    async playWithWindowsVBS(soundFile, options = {}) {
        return new Promise((resolve, reject) => {
            const soundId = ++this.soundCounter;
            
            // Check concurrent sound limit
            if (this.activeSounds.size >= this.options.maxConcurrentSounds) {
                logger.warn('Max concurrent sounds reached');
            }
            
            // Convert to absolute path
            const absolutePath = path.resolve(soundFile);
            
            // Path to VBScript file
            const vbsScript = path.join(__dirname, '../../bin/play-sound-windows.vbs');
            
            // Check if VBS script exists
            if (!fs.existsSync(vbsScript)) {
                reject(new Error(`VBScript file not found: ${vbsScript}`));
                return;
            }
            
            // Execute VBScript silently with wscript (no console window)
            const command = `wscript "${vbsScript}" "${absolutePath}"`;
            
            logger.debug(`Playing sound via VBS: ${soundFile}`);
            
            const player = exec(command, (error) => {
                this.activeSounds.delete(soundId);
                
                if (error && !error.killed) {
                    logger.error(`Playback error: ${error.message}`);
                    reject(error);
                } else {
                    logger.debug(`Sound finished: ${soundFile}`);
                    resolve(soundId);
                }
            });
            
            this.activeSounds.set(soundId, {
                player,
                file: soundFile,
                startTime: Date.now()
            });
        });
    }

    async playWithPlaySound(soundFile, options = {}) {
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