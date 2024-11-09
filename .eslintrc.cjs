module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Desactiva la advertencia de variables no utilizadas en TypeScript
    '@typescript-eslint/no-unused-vars': [
      'warn', // Cambia a 'off' para desactivarlo por completo
      { 
        "vars": "all", 
        "args": "none", 
        "ignoreRestSiblings": true 
      }
    ]
  },
};
