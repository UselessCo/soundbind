function validateConfig(config) {
    const errors = [];
    
    // Check basic structure
    if (!config || typeof config !== 'object') {
        errors.push('Configuration must be an object');
        return { valid: false, errors };
    }
    
    // Validate keybinds
    if (config.keybinds) {
        if (!Array.isArray(config.keybinds)) {
            errors.push('keybinds must be an array');
        } else {
            config.keybinds.forEach((keybind, index) => {
                if (!keybind.key) {
                    errors.push(`keybind[${index}] missing required 'key' field`);
                }
                if (!keybind.sound) {
                    errors.push(`keybind[${index}] missing required 'sound' field`);
                }
                if (keybind.volume !== undefined && (typeof keybind.volume !== 'number' || keybind.volume < 0 || keybind.volume > 1)) {
                    errors.push(`keybind[${index}] volume must be a number between 0 and 1`);
                }
            });
        }
    }
    
    // Validate audio settings
    if (config.audio) {
        if (config.audio.maxConcurrent !== undefined && (!Number.isInteger(config.audio.maxConcurrent) || config.audio.maxConcurrent < 1)) {
            errors.push('audio.maxConcurrent must be a positive integer');
        }
        if (config.audio.masterVolume !== undefined && (typeof config.audio.masterVolume !== 'number' || config.audio.masterVolume < 0 || config.audio.masterVolume > 1)) {
            errors.push('audio.masterVolume must be a number between 0 and 1');
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