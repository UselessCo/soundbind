import chalk from 'chalk';

class Logger {
    constructor() {
        this.level = 'info';
        this.levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        };
    }

    setLevel(level) {
        this.level = level.toLowerCase();
    }

    shouldLog(level) {
        return this.levels[level] >= this.levels[this.level];
    }

    formatMessage(level, message) {
        const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
        const levelUpper = level.toUpperCase().padEnd(5);
        
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

    debug(message) {
        if (this.shouldLog('debug')) {
            console.log(this.formatMessage('debug', message));
        }
    }

    info(message) {
        if (this.shouldLog('info')) {
            console.log(this.formatMessage('info', message));
        }
    }

    warn(message) {
        if (this.shouldLog('warn')) {
            console.log(this.formatMessage('warn', message));
        }
    }

    error(message) {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message));
        }
    }
}

export default new Logger();