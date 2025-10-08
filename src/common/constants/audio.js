/**
 * Audio System Constants
 * Configuration values for audio playback and management
 */

const audioConstants = {
    // Default audio configuration values
    DEFAULT_MAX_CONCURRENT_SOUNDS: 5,
    DEFAULT_VOLUME: 0.8,
    DEFAULT_MASTER_VOLUME: 1.0,

    // Audio player names for different platforms
    AUDIO_PLAYER_SOX: 'play',
    AUDIO_PLAYER_PULSE_AUDIO: 'paplay',
    AUDIO_PLAYER_MPG123: 'mpg123',
    AUDIO_PLAYER_MPLAYER: 'mplayer',
    AUDIO_PLAYER_AFPLAY: 'afplay',

    // Platform-specific audio configuration
    LINUX_DEFAULT_PLAYER: 'play',
    WINDOWS_SCRIPT_EXECUTOR: 'wscript',
    WINDOWS_KILL_COMMAND: 'taskkill /F /T /PID',

    // Relative paths for audio-related files
    WINDOWS_VBS_SCRIPT_PATH: '../../bin/play-sound-windows.vbs',

    // Volume validation ranges
    VOLUME_MIN: 0,
    VOLUME_MAX: 1,

    // Audio playback limits
    MIN_CONCURRENT_SOUNDS: 1
};

export default audioConstants;