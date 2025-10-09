/**
 * Validation Constants
 * Limits, ranges, and validation rules
 */

const validationConstants = {
    // Volume validation ranges
    VOLUME_MIN: 0.0,
    VOLUME_MAX: 1.0,

    // Audio concurrency limits
    CONCURRENT_SOUNDS_MIN: 1,

    // Validation error messages
    ERROR_INVALID_STRUCTURE: 'Configuration must be an object',
    ERROR_INVALID_KEYBINDS_TYPE: 'keybinds must be an array',
    ERROR_MISSING_KEY: 'missing required \'key\' field',
    ERROR_MISSING_SOUND: 'missing required \'sound\' field',
    ERROR_INVALID_VOLUME_RANGE: 'volume must be a number between 0 and 1',
    ERROR_INVALID_MAX_CONCURRENT: 'audio.maxConcurrent must be a positive integer'
};

export default validationConstants;