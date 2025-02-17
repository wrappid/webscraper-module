/* eslint-disable sort-keys-fix/sort-keys-fix */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "etc",
    "import",
    "sort-keys-fix",
    "unused-imports",
    "react",
    "react-hooks"
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": { 
      typescript: {
        project: ["./tsconfig.json"]
      },
      node: { 
        extensions: [".js", ".jsx", ".ts", ".tsx"] 
      } 
    },
    react: { 
      version: "detect" 
    }
  },
  rules: {
    // TypeScript Rules
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    // "@typescript-eslint/no-var-requires": ["error", {
    //   allow: [
    //     // List specific paths or patterns where require is allowed
    //     "@wrappid/core",
    //   ]
    // }],
    // Import Rules
    "import/order"             : [
      "error",
      {
        "alphabetize": {
          "caseInsensitive": true,
          "order"          : "asc",
        },
        "groups"          : ["builtin", "external", "internal"],
        "newlines-between": "always",
        "pathGroups"      : [
          {
            "group"   : "builtin",
            "pattern" : "react",
            "position": "before",
          },
        ],
        "pathGroupsExcludedImportTypes": ["react"],
      },
    ],

    // React Rules
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": "off", // Disabled as TypeScript provides type checking

    // Code Style Rules
    "array-bracket-newline": [
      "error",
      {
        minItems: 5,
        multiline: true,
      },
    ],
    "array-bracket-spacing": ["error", "never"],
    "array-element-newline": ["error", { minItems: 5, multiline: true }],
    "comma-dangle": ["error", { 
      arrays: "only-multiline", 
      objects: "only-multiline" 
    }],
    "comma-spacing": ["error", { after: true, before: false }],
    "etc/no-commented-out-code": "error",
    "id-length": ["error", { 
      exceptions: ["i", "j", "id"], 
      min: 2, 
      properties: "never" 
    }],
    indent: ["error", 2, { 
      MemberExpression: 1, 
      SwitchCase: 1 
    }],
    "key-spacing": ["error", { align: "colon" }],
    "linebreak-style": ["error", "unix"],
    "newline-after-var": ["error", "always"],
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
    "no-console": "error",
    "no-multi-spaces": ["error", { 
      exceptions: { VariableDeclarator: true } 
    }],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-useless-catch": "off",
    "no-var": "error",
    "object-curly-newline": [
      "error",
      {
        ExportDeclaration: { minProperties: 6, multiline: true },
        ImportDeclaration: { minProperties: 6, multiline: true },
        ObjectExpression: { minProperties: 6, multiline: true },
        ObjectPattern: { minProperties: 6, multiline: true },
      },
    ],
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        next: "*",
        prev: ["const", "let"],
      },
      {
        blankLine: "any",
        next: ["const", "let"],
        prev: ["const", "let"],
      },
      {
        blankLine: "always",
        next: "*",
        prev: ["case", "default"],
      },
    ],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "sort-keys-fix/sort-keys-fix": "error",
    "space-infix-ops": ["error", { int32Hint: false }],
    "unused-imports/no-unused-imports": "error",
  },
};