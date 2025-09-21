#!/usr/bin/env node

import path from 'path';
import process from 'process';
import Soundbind from '../index.js';

const args = process.argv.slice(2);
const configPath = args[0] || path.join(process.cwd(), 'default.yaml');

console.log('🎵 Soundbind keyboard player');
console.log(`Loading config: ${configPath}\n`);

const soundbind = new Soundbind();

soundbind.start(configPath)
    .then(() => {
        console.log('✅ Soundbind is running!');
        console.log('Press Ctrl+C to stop.\n');
    })
    .catch((error) => {
        console.error('❌ Failed to start:', error.message);
        process.exit(1);
    });