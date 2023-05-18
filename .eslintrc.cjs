module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:svelte/recommended',
        'plugin:svelte/prettier',
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
