#!/usr/bin/env node

import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import fs from 'fs';

import Soundbind from '../src/Soundbind.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const configNameOrPath = args[0];

// Resolve config path using Soundbind's resolver
let configPath;

if (configNameOrPath) {
    // Try to resolve as config name first (e.g., "default", "template")
    configPath = Soundbind.resolveConfigPath(configNameOrPath);
    
    // If not found, treat as file path
    if (!configPath) {
        configPath = path.isAbsolute(configNameOrPath) 
            ? configNameOrPath 
            : path.resolve(process.cwd(), configNameOrPath);
        
        if (!fs.existsSync(configPath)) {
            console.error(`❌ Configuration not found: ${configNameOrPath}`);
            
            const availableConfigs = Soundbind.listAvailableConfigs();
            if (availableConfigs.length > 0) {
                console.error(`\nAvailable configs: ${availableConfigs.join(', ')}`);
            }
            
            console.error('\nUsage:');
            console.error('  soundbind [config-name-or-path]');
            console.error('\nExamples:');
            console.error('  soundbind default');
            console.error('  soundbind ./my-config.yaml');
            process.exit(1);
        }
    }
} else {
    // No argument provided - try to find config in current directory
    const possibleConfigs = ['soundbind.yaml', 'soundbind.yml', 'default.yaml', 'default.yml'];
    for (const config of possibleConfigs) {
        const testPath = path.join(process.cwd(), config);
        if (fs.existsSync(testPath)) {
            configPath = testPath;
            break;
        }
    }
    
    if (!configPath) {
        console.error('❌ No configuration file found.');
        console.error('\nCreate a soundbind.yaml file in the current directory or specify a config:');
        console.error('  soundbind <config-name-or-path>');
        console.error('\nExamples:');
        console.error('  soundbind default');
        console.error('  soundbind ./my-config.yaml');
        
        const availableConfigs = Soundbind.listAvailableConfigs();
        if (availableConfigs.length > 0) {
            console.error(`\nAvailable configs from package: ${availableConfigs.join(', ')}`);
        }
        
        process.exit(1);
    }
}

console.log('🎵 Soundbind keyboard player');
console.log(`📁 Config: ${path.basename(configPath)}`);
console.log(`📂 Path: ${configPath}\n`);

const soundbind = new Soundbind();

soundbind.start(configPath)
    .then(() => {
        console.log('✅ Soundbind is running!');
        console.log('Press Ctrl+C to stop.\n');
        
        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            console.log('\n🛑 Shutting down...');
            await soundbind.stop();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            await soundbind.stop();
            process.exit(0);
        });
    })
    .catch((error) => {
        console.error('❌ Failed to start:', error.message);
        process.exit(1);
    });
