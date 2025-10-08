/**
 * Get current date formatted as DDMMYYYY
 * @returns {string} Date string in format DDMMYYYY (e.g., "01102025")
 */
function getDateString() {
    const now = new Date();
    return now.toISOString().split('T')[0].replace(/-/g, '');
}

/**
 * Get current timestamp formatted as YYYY-MM-DD HH:MM:SS
 * @returns {string} Timestamp string
 */
function getTimestamp() {
    return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

/**
 * Get log filename based on current date
 * @param {string} extension - File extension (default: 'log')
 * @returns {string} Filename in format DDMMYYYY.log
 */
function getLogFilename(extension = 'log') {
    return `${getDateString()}.${extension}`;
}

export default {
    getDateString,
    getTimestamp,
    getLogFilename
};