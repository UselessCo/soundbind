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
  DEFAULT_CONFIG_PATH: 'configs/default.yaml',

  // Configuration directory structure
  CONFIG_DIRECTORY: 'configs',

  // Configuration file watching
  CONFIG_RELOAD_DEBOUNCE_MS: 500
};

export default configConstants;
