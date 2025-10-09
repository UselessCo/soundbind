/**
 * Process and CLI Constants
 * Command-line interface, process signals, and exit codes
 */

const processConstants = {
    // CLI argument positions
    CLI_ARG_INDEX_CONFIG_NAME: 2,
    CLI_ARG_INDEX_SCRIPT: 1,

    // Process exit codes
    EXIT_CODE_SUCCESS: 0,
    EXIT_CODE_ERROR: 1,
    EXIT_CODE_INVALID_CONFIG: 1,

    // Process signal names
    SIGNAL_INTERRUPT: 'SIGINT',
    SIGNAL_TERMINATE: 'SIGTERM',
    SIGNAL_KILL: 'SIGKILL',

    // Platform identifiers
    PLATFORM_WINDOWS: 'win32',
    PLATFORM_LINUX: 'linux',

    // CLI usage messages
    CLI_USAGE_MESSAGE: 'Usage: npm start [config-name]',
    CLI_EXAMPLE_MESSAGE_1: 'Example: npm start gaming',
    CLI_EXAMPLE_MESSAGE_2: '         npm start default'
};

export default processConstants;