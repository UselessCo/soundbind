import process from 'process';
import path from 'path';
import { pathToFileURL } from 'url';

import Soundbind from './src/Soundbind.js';
import processConstants from './src/common/constants/process.js';
import configConstants from './src/common/constants/config.js';

// Check if this is the main module (CLI usage)
const isMainModule = import.meta.url === pathToFileURL(process.argv[processConstants.CLI_ARG_INDEX_SCRIPT]).href;

if (isMainModule) {
    const configNameOrPath = process.argv[processConstants.CLI_ARG_INDEX_CONFIG_NAME] || configConstants.DEFAULT_CONFIG_NAME;
    const configPath = Soundbind.resolveConfigPath(configNameOrPath);
    
    if (!configPath) {
        console.error(`❌ Configuration not found: ${configNameOrPath}`);
        
        const availableConfigs = Soundbind.listAvailableConfigs();
        if (availableConfigs.length > 0) {
            console.error(`\nAvailable configs: ${availableConfigs.join(', ')}`);
        }
        
        console.error(`\n${processConstants.CLI_USAGE_MESSAGE}`);
        console.error(processConstants.CLI_EXAMPLE_MESSAGE_1);
        console.error(processConstants.CLI_EXAMPLE_MESSAGE_2);
        process.exit(processConstants.EXIT_CODE_INVALID_CONFIG);
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
            process.on(processConstants.SIGNAL_INTERRUPT, async () => {
                console.log('\n🛑 Shutting down...');
                await soundbind.stop();
                process.exit(processConstants.EXIT_CODE_SUCCESS);
            });

            process.on(processConstants.SIGNAL_TERMINATE, async () => {
                await soundbind.stop();
                process.exit(processConstants.EXIT_CODE_SUCCESS);
            });
        })
        .catch((error) => {
            console.error('❌ Failed to start:', error.message);
            process.exit(processConstants.EXIT_CODE_ERROR);
        });
}