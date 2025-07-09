/* cSpell:disable */
module.exports = {
    // lint 環境
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    root: true,
    extends: ['airbnb-base', 'plugin:prettier/recommended', 'prettier'],
    plugins: ['import'],
    /**
     * .js 套用的規則
     */
    rules: {
        /**
         * 'off' 或 0 - 關閉規則
         * 'warn' 或 1 - 開啟規則，使用警告級別的錯誤：warn
         * 'error' 或 2 - 開啟規則，使用錯誤級別的錯誤：error
         */
        camelcase: 0,
        // 允許類別內函式沒有調用到自身的屬性或其他函式
        'class-methods-use-this': 0,
        // cc.Class 為非正規 export 用法，所以要允許 unresolved-import
        'import/no-unresolved': 0,
        // TS去除副档名规则
        'import/extensions': ['off', 'ignorePackages'],
        // 部分情境下會使用到，改為 warning
        'import/prefer-default-export': 1,
        // 保留 continue 使用
        'no-continue': 1,
        // 為了可以使用 ++a / a++
        'no-plusplus': 0,
        // 允許變數名稱包含底線
        'no-underscore-dangle': 0,
        // 允許使用三元運算子
        'no-unused-expressions': [
            2,
            {
                allowTernary: true,
            },
        ],
        // 不使用 array destructuring
        'prefer-destructuring': 0,
        // CocosCreator engine 自帶 'use strict'，所以不用自己加
        strict: 0,
        // 关闭 parseInt 必须指定第二个参数
        radix: 0,
        // 关闭不允许同名函数
        'no-dupe-class-members': 0,
        // 关闭一个文件只允许 1 个 class
        'max-classes-per-file': 0,
        // 关闭修改传入参数的限制
        'no-param-reassign': 0,
        // 关闭位操作限制
        'no-bitwise': 0,
        // 关闭函数名限制
        'func-names': 0,
        // 关闭点号取属性限制
        'dot-notation': 0,
        // In ES2015 (ES6) or later, if you don't want to be notified about arguments variables, then it's safe to disable this rule.
        'prefer-rest-params': 0,
        'no-console': [
            2,
            {
                allow: ['warn', 'error'],
            },
        ],
        'no-use-before-define': [
            'error',
            {
                functions: false,
                classes: false,
            },
        ],
        'no-await-in-loop': 0,
        // function 宣告的參數如果沒有使用，改為 warning
        'no-unused-vars': 1,
    },
    // 告知 lint 有這些 global variable
    globals: {
        cc: false,
        Editor: false,
        Immutable: false,
        jsb: false,
        sdkbox: false,
        CC_EDITOR: false,
        CC_PREVIEW: false,
        CC_DEV: false,
        CC_DEBUG: false,
        CC_BUILD: false,
        CC_JSB: false,
        CC_TEST: false,
        dragonBones: false,
        sp: false,
        require: false,
    },

    /**
     * .ts 套用的規則
     */
    overrides: [
        {
            files: ['*.ts'],
            env: {
                browser: true,
                commonjs: true,
                es6: true,
                node: true,
            },
            extends: [
                'airbnb-base',
                'airbnb-typescript/base',
                'plugin:@typescript-eslint/recommended-type-checked',
                'plugin:@typescript-eslint/stylistic-type-checked',
                'plugin:prettier/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
            plugins: ['@typescript-eslint', 'import'],
            rules: {
                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': ['error'],
                camelcase: 0,
                // 未使用变量报错规则
                '@typescript-eslint/no-unused-vars': [
                    2,
                    {
                        vars: 'all',
                        args: 'none',
                        ignoreRestSiblings: true,
                        varsIgnorePattern: 'property',
                    },
                ],
                '@typescript-eslint/ban-ts-comment': 0,
                // 允許類別內函式沒有調用到自身的屬性或其他函式
                'class-methods-use-this': 0,
                // cc.Class 為非正規 export 用法，所以要允許 unresolved-import
                'import/no-unresolved': 0,
                // TS 去除副档名规则
                'import/extensions': ['off', 'ignorePackages'],
                // 部分情境下會使用到，改為 warning
                'import/prefer-default-export': 1,
                // 保留 continue 使用
                'no-continue': 1,
                // 為了可以使用 ++a / a++
                'no-plusplus': 0,
                // 允許變數名稱包含底線
                'no-underscore-dangle': 0,
                // 允許使用三元運算子
                'no-unused-expressions': [
                    2,
                    {
                        allowTernary: true,
                    },
                ],
                // 不使用 array destructuring
                'prefer-destructuring': 0,
                // CocosCreator engine 自帶 'use strict'，所以不用自己加
                strict: 0,
                // 关闭 JS 未使用属性,开启 ts
                'no-unused-vars': 0,
                // 关闭 parseInt 必须指定第二个参数
                radix: 0,
                // 关闭不允许同名函数
                'no-dupe-class-members': 0,
                // 关闭一个文件只允许 1 个 class
                'max-classes-per-file': 0,
                // 关闭修改传入参数的限制
                'no-param-reassign': [
                    'error',
                    { props: true, ignorePropertyModificationsForRegex: ['^node', 'Node$'] },
                ],
                // 关闭位操作限制
                'no-bitwise': 0,
                // 关闭函数名限制
                'func-names': 0,
                // In ES2015 (ES6) or later, if you don't want to be notified about arguments variables, then it's safe to disable this rule.
                'prefer-rest-params': 0,
                'no-console': [
                    2,
                    {
                        allow: ['warn', 'error'],
                    },
                ],
                'no-use-before-define': [
                    'error',
                    {
                        functions: false,
                        classes: false,
                    },
                ],
                'no-await-in-loop': 0,
                'global-require': 0,
                // 关闭点号取属性限制
                '@typescript-eslint/dot-notation': 0,
                // 基礎屬性，固定值，強制使用 readonly
                '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
                // 因為strictNullChecks:false，此規則將無法按預期工作，故關閉
                '@typescript-eslint/prefer-nullish-coalescing': 0,
                '@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation'],
                // 部份情況下會使用到any類型，改為警告
                '@typescript-eslint/no-explicit-any': 'warn',
                '@typescript-eslint/restrict-template-expressions': 'off',
                '@typescript-eslint/unbound-method': 'off',
                // Cocos Creator 按鍵比較
                '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            },
        },
    ],
};
