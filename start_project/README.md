# Cocos Creator TypeScript 遊戲專案

這是一個使用 TypeScript 開發的 Cocos Creator 遊戲專案，已配置完整的開發環境。

## 📋 專案結構

```
├── assets/                 # 遊戲資源
│   ├── scripts/           # TypeScript 腳本
│   ├── textures/          # 圖片資源
│   └── audio/             # 音效資源
├── settings/              # Cocos Creator 設定
├── creator.d.ts           # TypeScript 型別定義
├── tsconfig.json          # TypeScript 設定
├── .eslintrc.js           # ESLint 設定
├── package.json           # 專案依賴管理
├── .gitignore             # Git 忽略檔案
└── .editorconfig          # 編輯器設定
```

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 開發工具設定

確保您的編輯器（推薦 VSCode）已安裝以下擴展：
- TypeScript
- ESLint
- EditorConfig for VS Code

### 3. 開發指令

```bash
# 檢查代碼風格
npm run lint

# 自動修復代碼風格問題
npm run lint:fix

# 檢查 TypeScript 類型
npm run type-check

# 編譯 TypeScript（僅檢查，不輸出）
npm run build
```

## 🛠️ 設定檔案說明

### TypeScript 設定 (`tsconfig.json`)
- 支援 ES2015+ 語法
- 啟用裝飾器支援
- 設定路徑別名 `@/*` 指向 `assets/*`
- 啟用 source map 以便調試

### ESLint 設定 (`.eslintrc.js`)
- 使用 TypeScript ESLint 規則
- 針對 Cocos Creator 進行優化
- 定義所有 Cocos Creator 全域變數
- 強制使用單引號、分號等風格

### 型別定義 (`creator.d.ts`)
- 完整的 Cocos Creator API 型別定義
- 支援所有常用組件和類別
- 提供良好的 IDE 自動完成功能

## 📝 編寫規範

### 腳本命名
- 使用 PascalCase：`Player.ts`、`GameManager.ts`
- 類別名稱與檔案名稱一致

### 代碼風格
- 使用 4 個空格縮進
- 使用單引號
- 每行結尾必須加分號
- 物件大括號內部要有空格：`{ key: value }`

### 範例腳本

```typescript
const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    onLoad(): void {
        // 初始化邏輯
    }

    start(): void {
        // 遊戲開始邏輯
    }

    update(dt: number): void {
        // 每幀更新邏輯
    }
}
```

## 🔧 常見問題

### Q: 找不到 `cc` 的定義
A: 確保 `creator.d.ts` 檔案在專案根目錄，並且 `tsconfig.json` 中包含了該檔案。

### Q: ESLint 報錯
A: 執行 `npm run lint:fix` 自動修復大部分問題，剩餘問題請手動修復。

### Q: TypeScript 編譯錯誤
A: 執行 `npm run type-check` 檢查具體錯誤訊息。

## 🎯 建議的開發流程

1. 在 Cocos Creator 中建立場景和節點
2. 建立對應的 TypeScript 腳本
3. 使用 `npm run lint` 檢查代碼規範
4. 使用 `npm run type-check` 檢查型別錯誤
5. 在 Cocos Creator 中測試功能

## 📚 參考資源

- [Cocos Creator 官方文檔](https://docs.cocos.com/creator/manual/zh/)
- [TypeScript 官方文檔](https://www.typescriptlang.org/docs/)
- [ESLint 官方文檔](https://eslint.org/docs/) 