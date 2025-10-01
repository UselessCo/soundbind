import process from 'process';
import path from 'path';
import Soundbind from './src/Soundbind.js';

// Check if this is the main module (CLI usage)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
    const configNameOrPath = process.argv[2] || 'default';
    const configPath = Soundbind.resolveConfigPath(configNameOrPath);
    
    if (!configPath) {
        console.error(`❌ Configuration not found: ${configNameOrPath}`);
        
        const availableConfigs = Soundbind.listAvailableConfigs();
        if (availableConfigs.length > 0) {
            console.error(`\nAvailable configs: ${availableConfigs.join(', ')}`);
        }
        
        console.error('\nUsage: npm start [config-name]');
        console.error('Example: npm start gaming');
        console.error('         npm start default');
        process.exit(1);
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
}