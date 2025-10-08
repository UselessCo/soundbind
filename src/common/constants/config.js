/**
 * Configuration System Constants
 * File handling, paths, and configuration management
 */

const configConstants = {
    // Supported configuration file extensions
    EXTENSION_JSON: '.json',
    EXTENSION_YAML: '.yaml',
    EXTENSION_YML: '.yml',

    // Default configuration values
    DEFAULT_CONFIG_NAME: 'default',
    DEFAULT_CONFIG_FILENAME: 'default.yaml',
    DEFAULT_CONFIG_PATH: 'configs/default.yaml',

    // Configuration directory structure
    CONFIG_DIRECTORY: 'configs',
    SOUNDS_DIRECTORY: 'assets/sounds',

    // Configuration file watching
    CONFIG_RELOAD_DEBOUNCE_MS: 500,
    CONFIG_WATCH_EVENT_TYPE: 'change',

    // Configuration settings defaults
    DEFAULT_HOT_RELOAD: true,
    DEFAULT_PRELOAD_SOUNDS: true,
    DEFAULT_GLOBAL_HOTKEYS: true,
    DEFAULT_SYSTEM_TRAY: false
};

export default configConstants;