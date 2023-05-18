module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': [
        'plugin:svelte/recommended',
        'plugin:svelte/prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'project': "./tsconfig.json",
        'extraFileExtensions': [".svelte"]
    },
    'overrides': [
        {
            "files": ["*.svelte"],
            "parser": "svelte-eslint-parser",
            "parserOptions": { 'parser': "@typescript-eslint/parser" }
        }
    ],
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
    }
};
