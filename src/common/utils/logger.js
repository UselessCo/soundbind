import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import dateUtils from './date.js';
import loggingConstants from '../constants/logging.js';

class Logger {
    constructor() {
        this.level = loggingConstants.DEFAULT_LOG_LEVEL;
        this.levels = {
            [loggingConstants.LOG_LEVEL_DEBUG]: loggingConstants.LOG_PRIORITY_DEBUG,
            [loggingConstants.LOG_LEVEL_INFO]: loggingConstants.LOG_PRIORITY_INFO,
            [loggingConstants.LOG_LEVEL_WARN]: loggingConstants.LOG_PRIORITY_WARN,
            [loggingConstants.LOG_LEVEL_ERROR]: loggingConstants.LOG_PRIORITY_ERROR
        };
        
        // File logging configuration
        this.fileLogging = false;
        this.logDir = null;
        this.logStream = null;
        this.currentLogFile = null;
        this.lastDateCheck = null;
    }

    setLevel(level) {
        this.level = level.toLowerCase();
    }

    /**
     * Configure file logging
     * @param {Object} options - Logging options
     * @param {boolean} options.enabled - Enable/disable file logging
     * @param {string} options.path - Path to log directory (optional, defaults to logs/)
     */
    configureFileLogging(options = {}) {
        // Close existing stream if any
        if (this.logStream) {
            this.logStream.end();
            this.logStream = null;
        }

        this.fileLogging = options.enabled === true;
        
        if (this.fileLogging) {
            // Determine log directory
            this.logDir = options.path || loggingConstants.DEFAULT_LOG_DIRECTORY;
            
            try {
                // Ensure log directory exists
                if (!fs.existsSync(this.logDir)) {
                    fs.mkdirSync(this.logDir, { recursive: true });
                }
                
                // Create initial log file
                this.rotateLogFile();
                
                this.info(`File logging enabled: ${this.logDir}/`);
            } catch (error) {
                console.error(chalk.red(`Failed to setup file logging: ${error.message}`));
                this.fileLogging = false;
                this.logStream = null;
                this.logDir = null;
            }
        } else {
            this.logDir = null;
            this.currentLogFile = null;
        }
    }

    /**
     * Rotate log file if date has changed
     */
    rotateLogFile() {
        const currentDate = dateUtils.getDateString();
        
        // Check if we need to rotate (date changed)
        if (this.lastDateCheck !== currentDate) {
            this.lastDateCheck = currentDate;
            
            // Close existing stream
            if (this.logStream) {
                const endMsg = `Session ended: ${dateUtils.getTimestamp()}\n`;
                this.logStream.write(endMsg);
                this.logStream.end();
            }
            
            // Create new log file for current date
            this.currentLogFile = path.join(this.logDir, dateUtils.getLogFilename());
            this.logStream = fs.createWriteStream(this.currentLogFile, { flags: 'a' });
            
            // Write session start marker
            const startMsg = `\n${loggingConstants.LOG_SESSION_SEPARATOR_CHAR.repeat(loggingConstants.LOG_SESSION_SEPARATOR_WIDTH)}\nSession started: ${dateUtils.getTimestamp()}\n${loggingConstants.LOG_SESSION_SEPARATOR_CHAR.repeat(loggingConstants.LOG_SESSION_SEPARATOR_WIDTH)}\n`;
            this.logStream.write(startMsg);
        }
    }

    shouldLog(level) {
        return this.levels[level] >= this.levels[this.level];
    }

    formatMessage(level, message, forFile = false) {
        const timestamp = dateUtils.getTimestamp();
        const levelUpper = level.toUpperCase().padEnd(loggingConstants.LOG_LEVEL_STRING_PADDING);
        
        if (forFile) {
            // Plain text for file (no colors)
            return `${timestamp} ${levelUpper} ${message}`;
        }
        
        // Colored output for console
        let coloredLevel;
        switch (level) {
            case loggingConstants.LOG_LEVEL_DEBUG:
                coloredLevel = chalk.gray(levelUpper);
                break;
            case loggingConstants.LOG_LEVEL_INFO:
                coloredLevel = chalk.blue(levelUpper);
                break;
            case loggingConstants.LOG_LEVEL_WARN:
                coloredLevel = chalk.yellow(levelUpper);
                break;
            case loggingConstants.LOG_LEVEL_ERROR:
                coloredLevel = chalk.red(levelUpper);
                break;
            default:
                coloredLevel = levelUpper;
        }
        
        return `${chalk.gray(timestamp)} ${coloredLevel} ${message}`;
    }

    writeToFile(level, message) {
        if (this.fileLogging && this.logStream) {
            try {
                // Check if we need to rotate to a new date's log file
                this.rotateLogFile();
                
                const logLine = this.formatMessage(level, message, true) + '\n';
                this.logStream.write(logLine);
            } catch (error) {
                // Disable file logging on error to prevent repeated failures
                console.error(chalk.red(`File logging error: ${error.message}`));
                
                this.fileLogging = false;
                
                if (this.logStream) {
                    this.logStream.end();
                    this.logStream = null;
                }
            }
        }
    }

    debug(message) {
        if (this.shouldLog(loggingConstants.LOG_LEVEL_DEBUG)) {
            console.log(this.formatMessage(loggingConstants.LOG_LEVEL_DEBUG, message));
            this.writeToFile(loggingConstants.LOG_LEVEL_DEBUG, message);
        }
    }

    info(message) {
        if (this.shouldLog(loggingConstants.LOG_LEVEL_INFO)) {
            console.log(this.formatMessage(loggingConstants.LOG_LEVEL_INFO, message));
            this.writeToFile(loggingConstants.LOG_LEVEL_INFO, message);
        }
    }

    warn(message) {
        if (this.shouldLog(loggingConstants.LOG_LEVEL_WARN)) {
            console.log(this.formatMessage(loggingConstants.LOG_LEVEL_WARN, message));
            this.writeToFile(loggingConstants.LOG_LEVEL_WARN, message);
        }
    }

    error(message) {
        if (this.shouldLog(loggingConstants.LOG_LEVEL_ERROR)) {
            console.error(this.formatMessage(loggingConstants.LOG_LEVEL_ERROR, message));
            this.writeToFile(loggingConstants.LOG_LEVEL_ERROR, message);
        }
    }

    /**
     * Close the log file stream (call on app shutdown)
     */
    close() {
        if (this.logStream) {
            const endMsg = `Session ended: ${dateUtils.getTimestamp()}\n`;
            this.logStream.write(endMsg);
            this.logStream.end();
            this.logStream = null;
        }
    }
}

export default new Logger();