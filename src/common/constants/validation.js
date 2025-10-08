/**
 * Validation Constants
 * Limits, ranges, and validation rules
 */

const validationConstants = {
    // Volume validation ranges
    VOLUME_MIN: 0.0,
    VOLUME_MAX: 1.0,
    VOLUME_DEFAULT: 0.8,

    // Audio concurrency limits
    CONCURRENT_SOUNDS_MIN: 1,
    CONCURRENT_SOUNDS_MAX: 100,
    CONCURRENT_SOUNDS_DEFAULT: 5,

    // Required configuration fields
    REQUIRED_FIELD_KEY: 'key',
    REQUIRED_FIELD_SOUND: 'sound',

    // Field type expectations
    FIELD_TYPE_KEYBINDS: 'array',
    FIELD_TYPE_VOLUME: 'number',
    FIELD_TYPE_MAX_CONCURRENT: 'number',
    FIELD_TYPE_LOOP: 'boolean',
    FIELD_TYPE_STOP_OTHERS: 'boolean',

    // Validation error messages
    ERROR_INVALID_STRUCTURE: 'Configuration must be an object',
    ERROR_INVALID_KEYBINDS_TYPE: 'keybinds must be an array',
    ERROR_MISSING_KEY: 'missing required \'key\' field',
    ERROR_MISSING_SOUND: 'missing required \'sound\' field',
    ERROR_INVALID_VOLUME_RANGE: 'volume must be a number between 0 and 1',
    ERROR_INVALID_VOLUME_TYPE: 'volume must be a number',
    ERROR_INVALID_MAX_CONCURRENT: 'audio.maxConcurrent must be a positive integer',
    ERROR_INVALID_MASTER_VOLUME: 'audio.masterVolume must be a number between 0 and 1'
};

export default validationConstants;