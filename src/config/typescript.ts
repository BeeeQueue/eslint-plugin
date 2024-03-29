import type { ESLintConfig } from "eslint-define-config"

import { prettierStyleRules } from "../utils/prettier"

export const typescript = {
  extends: [
    /** Configures import plugin for TypeScript */
    "plugin:import/typescript",

    ...prettierStyleRules,
  ],
  settings: {
    /**
     * Fixes the import plugin not handling packages with types packages installed correctly
     * https://github.com/benmosher/eslint-plugin-import/issues/1552
     * Might not be necessary anymore, but doesn't hurt to keep
     */
    "import/external-module-folders": ["node_modules", "node_modules/@types"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.vue"],
      extends: [
        /**
         * Adds typescript rules, typescript parser
         * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
         */
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic",
        "plugin:@typescript-eslint/stylistic-type-checked",
      ],
      parserOptions: {
        extraFileExtensions: [".vue"],
        project: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
      settings: {
        /** Use TypeScript resolver so we can use `baseUrl` and `paths` */
        "import/resolver": {
          // {} is required for some reason, cant find a link to it anymore :(
          typescript: {},
        },
        /** Configure node plugin to include TS files */
        node: { tryExtensions: [".js", ".ts", ".tsx"] },
      },
      rules: {
        /** Allow returning a promise when the function expects `void` */
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: false,
          },
        ],
        /** Don't warn about non-null assertions - assume they're used responsibly */
        "@typescript-eslint/no-non-null-assertion": "off",
        /** Don't error on operating on `any`s - it's way too strict */
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        /** Require type-only exports to explicitly say that they are type exports, to help compilers */
        "@typescript-eslint/consistent-type-exports": "off",
        /** Don't warn on implicit function returns */
        "@typescript-eslint/explicit-module-boundary-types": "off",
        /** Allow unions or intersections with types that ruin them (any, unknown, etc.), it be used for enhancing IDE behavior */
        "@typescript-eslint/no-redundant-type-constituents": "off",
        /** Enforce using shorter Map constructor syntax */
        "@typescript-eslint/consistent-generic-constructors": "error",
        /** Require explanations for @ts-ignore:s */
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-expect-error": false,
            "ts-ignore": "allow-with-description",
            "ts-check": true,
            "ts-nocheck": true,
            minimumDescriptionLength: 6,
          },
        ],
        /** Require using `type` over `interface` */
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        /** Enforce using `x as type` over `<type>x` */
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          { assertionStyle: "as" },
        ],
        /** Allow void before floating promises */
        "no-void": ["error", { allowAsStatement: true }],
        /** Automatically format Array types to most readable version depending on complexity */
        "@typescript-eslint/array-type": [
          "error",
          {
            default: "array-simple",
            readonly: "array-simple",
          },
        ],
        /** Allow comparing Enums with primitive values */
        "@typescript-eslint/no-unsafe-enum-comparison": "off",
        /** Allow using `any` as a parameter */
        "@typescript-eslint/no-unsafe-argument": "off",

        /* Does not work with types */
        "n/no-unpublished-import": "off",

        /* Overrides that add TS functionality */
        "@typescript-eslint/no-shadow": ["error", { ignoreOnInitialization: true }],
        "@typescript-eslint/no-loss-of-precision": "error",
        "@typescript-eslint/no-useless-constructor": "error",

        /* Disable duplicate/overridden rules */
        camelcase: "off",
        "no-shadow": "off",
        "no-loss-of-precision": "off",
        "no-useless-constructor": "off",
        /** TS uses ESM */
        "n/no-unsupported-features/es-syntax": "off",

        "import/named": "off",
        "import/namespace": "off",
        "import/default": "off",
        "import/export": "off",
        "import/no-duplicated": "off",
        "import/no-unresolved": "off",

        /* Disable checks that a well-configured TypeScript config does for you, but is not disabled by /recommended */
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "n/no-missing-import": "off",
        "n/no-extraneous-import": "off",
        "unicorn/no-array-callback-reference": "off",
      },
    },
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        project: "**/tsconfig.json",
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        /** Type definition files need different rules than normal files */
        "import/no-duplicates": "off",
        "import/order": "off",
      },
    },
  ],
} satisfies ESLintConfig
