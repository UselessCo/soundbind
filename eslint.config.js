import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import checkFile from 'eslint-plugin-check-file';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
      }
    },
    plugins: {
      prettier: prettierPlugin,
      'check-file': checkFile
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': ['warn', { allow: ['error', 'log'] }],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/common/**/*.js': 'CAMEL_CASE',
          'src/core/**/*.js': 'PASCAL_CASE'
        }
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/*/': 'FLAT_CASE',
          'src/{common,configs,core}/*/': 'FLAT_CASE'
        }
      ]
    }
  },
  {
    ignores: ['node_modules/', 'logs/', '*.tgz', '*.log', 'package-lock.json', 'bin/play-sound-windows.vbs']
  }
];
