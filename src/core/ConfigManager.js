import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';
import validator from '../utils/validator.js';

// Create require function for CommonJS modules
const require = createRequire(import.meta.url);

class ConfigManager {
    async load(configPath) {
        const fullPath = path.resolve(configPath);
        
        // Check if file exists
        try {
            await fs.access(fullPath);
        } catch (error) {
            throw new Error(`Configuration file not found: ${configPath}`);
        }

        // Read file content
        const content = await fs.readFile(fullPath, 'utf8');
        const extension = path.extname(configPath).toLowerCase();
        
        // Parse based on file extension
        let config;
        try {
            if (extension === '.json') {
                config = JSON.parse(content);
            } else if (['.yaml', '.yml'].includes(extension)) {
                const yaml = require('js-yaml');
                config = yaml.load(content);
            } else {
                throw new Error(`Unsupported configuration format: ${extension}`);
            }
        } catch (error) {
            throw new Error(`Failed to parse configuration: ${error.message}`);
        }

        // Validate configuration
        const validation = validator.validateConfig(config);
        if (!validation.valid) {
            throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
        }

        // Resolve relative paths
        config = this.resolvePaths(config, path.dirname(fullPath));
        
        return config;
    }

    resolvePaths(config, baseDir) {
        const resolved = { ...config };
        
        // Resolve sound file paths in keybinds
        if (resolved.keybinds) {
            resolved.keybinds = resolved.keybinds.map(keybind => ({
                ...keybind,
                sound: keybind.sound && !path.isAbsolute(keybind.sound) 
                    ? path.resolve(baseDir, keybind.sound)
                    : keybind.sound
            }));
        }
        
        // Resolve log file path
        if (resolved.settings?.logging?.file && !path.isAbsolute(resolved.settings.logging.file)) {
            resolved.settings.logging.file = path.resolve(baseDir, resolved.settings.logging.file);
        }
        
        return resolved;
    }
}

export default ConfigManager;