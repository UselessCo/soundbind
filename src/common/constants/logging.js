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

    // Log formatting constants
    LOG_SESSION_SEPARATOR_WIDTH: 80,
    LOG_SESSION_SEPARATOR_CHAR: '=',
    LOG_LEVEL_STRING_PADDING: 5,
};

export default loggingConstants;