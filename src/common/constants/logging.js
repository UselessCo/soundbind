/**
 * Logging System Constants
 * Log levels, formatting, and file management
 */

const loggingConstants = {
    // Log level names
    LOG_LEVEL_DEBUG: 'debug',
    LOG_LEVEL_INFO: 'info',
    LOG_LEVEL_WARN: 'warn',
    LOG_LEVEL_ERROR: 'error',

    // Log level priority values (higher = more severe)
    LOG_PRIORITY_DEBUG: 0,
    LOG_PRIORITY_INFO: 1,
    LOG_PRIORITY_WARN: 2,
    LOG_PRIORITY_ERROR: 3,

    // Default logging configuration
    DEFAULT_LOG_LEVEL: 'info',
    DEFAULT_LOG_DIRECTORY: 'logs',
    DEFAULT_LOG_FILE_EXTENSION: 'log',
    DEFAULT_FILE_LOGGING_ENABLED: false,

    // Log formatting constants
    LOG_SESSION_SEPARATOR_WIDTH: 80,
    LOG_SESSION_SEPARATOR_CHAR: '=',
    LOG_LEVEL_STRING_PADDING: 5,

    // Date and time formatting
    DATE_FORMAT_SEPARATOR_T: 'T',
    DATE_FORMAT_SEPARATOR_DASH: '-',
    TIMESTAMP_SEPARATOR_SPACE: ' ',
    TIMESTAMP_SLICE_START: 0,
    TIMESTAMP_SLICE_END: 19
};

export default loggingConstants;