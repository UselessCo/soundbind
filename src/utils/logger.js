import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import dateUtils from './date.js';

class Logger {
    constructor() {
        this.level = 'info';
        this.levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
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
            this.logDir = options.path || 'logs';
            
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
            const startMsg = `\n${'='.repeat(80)}\nSession started: ${dateUtils.getTimestamp()}\n${'='.repeat(80)}\n`;
            this.logStream.write(startMsg);
        }
    }

    shouldLog(level) {
        return this.levels[level] >= this.levels[this.level];
    }

    formatMessage(level, message, forFile = false) {
        const timestamp = dateUtils.getTimestamp();
        const levelUpper = level.toUpperCase().padEnd(5);
        
        if (forFile) {
            // Plain text for file (no colors)
            return `${timestamp} ${levelUpper} ${message}`;
        }
        
        // Colored output for console
        let coloredLevel;
        switch (level) {
            case 'debug':
                coloredLevel = chalk.gray(levelUpper);
                break;
            case 'info':
                coloredLevel = chalk.blue(levelUpper);
                break;
            case 'warn':
                coloredLevel = chalk.yellow(levelUpper);
                break;
            case 'error':
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
        if (this.shouldLog('debug')) {
            console.log(this.formatMessage('debug', message));
            this.writeToFile('debug', message);
        }
    }

    info(message) {
        if (this.shouldLog('info')) {
            console.log(this.formatMessage('info', message));
            this.writeToFile('info', message);
        }
    }

    warn(message) {
        if (this.shouldLog('warn')) {
            console.log(this.formatMessage('warn', message));
            this.writeToFile('warn', message);
        }
    }

    error(message) {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message));
            this.writeToFile('error', message);
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