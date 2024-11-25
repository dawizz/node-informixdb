const pluginJs = require("@eslint/js");
const globals = require("globals")

/** @type {import('eslint').Linter.Config[]} */
module.exports = [{
    files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}
}, {
    languageOptions: {globals: globals.node}
}, pluginJs.configs.recommended, {
    rules: {
        'no-unused-vars': 'off',
        'no-empty': 'off'
    }
}];
