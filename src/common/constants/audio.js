/**
 * Audio System Constants
 * Configuration values for audio playback and management
 */

const audioConstants = {
    // Default audio configuration values
    DEFAULT_MAX_CONCURRENT_SOUNDS: 5,

    // Platform-specific audio configuration
    LINUX_DEFAULT_PLAYER: 'play',
    WINDOWS_SCRIPT_EXECUTOR: 'wscript',
    WINDOWS_KILL_COMMAND: 'taskkill /F /T /PID'
};

export default audioConstants;