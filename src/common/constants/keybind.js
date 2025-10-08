/**
 * Keybind System Constants
 * Key names, modifiers, and keyboard-related configuration
 */

const keybindConstants = {
    // Modifier key names as reported by node-global-key-listener
    MODIFIER_LEFT_CTRL: 'LEFT CTRL',
    MODIFIER_RIGHT_CTRL: 'RIGHT CTRL',
    MODIFIER_LEFT_SHIFT: 'LEFT SHIFT',
    MODIFIER_RIGHT_SHIFT: 'RIGHT SHIFT',
    MODIFIER_LEFT_ALT: 'LEFT ALT',
    MODIFIER_RIGHT_ALT: 'RIGHT ALT',
    MODIFIER_LEFT_META: 'LEFT META',
    MODIFIER_RIGHT_META: 'RIGHT META',

    // Modifier type names used in key combinations
    MODIFIER_TYPE_CTRL: 'ctrl',
    MODIFIER_TYPE_CONTROL: 'control',
    MODIFIER_TYPE_SHIFT: 'shift',
    MODIFIER_TYPE_ALT: 'alt',
    MODIFIER_TYPE_META: 'meta',
    MODIFIER_TYPE_CMD: 'cmd',
    MODIFIER_TYPE_COMMAND: 'command',

    // Key event states
    KEY_STATE_DOWN: 'DOWN',
    KEY_STATE_UP: 'UP',

    // Key combination parsing
    KEY_COMBINATION_SEPARATOR: '+',

    // Default keybind behavior
    DEFAULT_LOOP: false,
    DEFAULT_STOP_OTHERS: false
};

export default keybindConstants;