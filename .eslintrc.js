{
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [0],
    "react/require-default-props": [0],
    "import/no-extraneous-dependencies": [0],
    "import/no-unresolved": [2, { ignore: ['^react(-native)?$'] }],
    "import/extensions": [2, { "js": "never", "json": "always" }],
    "arrow-parens": ["error", "as-needed"]
  }
}