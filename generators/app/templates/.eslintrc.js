module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    globals: {
        uni: 'readonly',
        plus: 'readonly',
        wx: 'readonly'
    },
    extends: [
        // 'eslint:recommended',
        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['vue', '@typescript-eslint'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2020
    },
    rules: {
        'vue/multi-word-component-names': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-explicit-any': 0
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['/@', './src']],
                extensions: ['.ts', '.js', '.jsx', '.json', '.vue']
            }
        }
    }
};
