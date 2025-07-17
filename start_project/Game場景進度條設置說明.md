# Game場景進度條設置說明

本說明將指導您如何在Game場景中設置統一的星星進度條系統。

## 🎯 系統優勢

### 新架構的優點

- ✅ **統一管理**：只需一個進度條而不是每個星星都有
- ✅ **性能更好**：減少UI節點數量
- ✅ **更易維護**：集中式的進度條邏輯
- ✅ **跟隨顯示**：進度條會跟隨當前星星位置

## 📋 第一步：創建進度條預製體

### 1. 新建進度條預製體

```
1. 右鍵點擊 assets/prefab 資料夾
2. 選擇「新建」→「Prefab」
3. 命名為「ProgressBar」
4. 雙擊打開進行編輯
```

### 2. 建立節點結構

```
ProgressBar (根節點)
├── Container
    ├── Background (背景條 - Sprite)
    ├── FillArea
    │   └── Fill (填充條 - Sprite)
    └── TimeLabel (時間文字 - Label) [可選]
```

### 3. 詳細設置步驟

#### A. 設置根節點 (ProgressBar)

```
1. 添加組件：ProgressBarController 腳本
2. 大小：(120, 30)
3. 錨點：(0.5, 0.5)
```

#### B. 建立 Container 節點

```
1. 右鍵 ProgressBar → 創建空節點 → 命名為 "Container"
2. 大小：(100, 15)
3. 位置：(0, 0)
```

#### C. 建立背景條 (Background)

```
1. 右鍵 Container → 創建 2D對象 → Sprite → 命名為 "Background"
2. 添加 Sprite 組件
3. 顏色：深灰色 (80, 80, 80, 255)
4. 大小：(100, 15)
5. 錨點：(0.5, 0.5)
```

#### D. 建立填充區域 (FillArea)

```
1. 右鍵 Container → 創建空節點 → 命名為 "FillArea"
2. 添加 ProgressBar 組件
3. 大小：(100, 15)
4. Mode：FILLED
5. Progress：1.0
```

#### E. 建立填充條 (Fill)

```
1. 右鍵 FillArea → 創建 2D對象 → Sprite → 命名為 "Fill"
2. 添加 Sprite 組件
3. 顏色：綠色 (0, 255, 0, 255)
4. 大小：(100, 15)
5. Type：FILLED
6. Fill Type：HORIZONTAL
7. Fill Start：0.0
8. Fill Range：1.0
```

#### F. 建立時間標籤 (TimeLabel) [可選]

```
1. 右鍵 Container → 創建 2D對象 → Label → 命名為 "TimeLabel"
2. 位置：(0, -25) 在進度條下方
3. 文字：設置初始值如 "5.0s"
4. 字體大小：12
5. 顏色：白色
6. 對齊：居中
```

### 4. 設置 ProgressBar 組件

```
選擇 FillArea 節點，在 ProgressBar 組件中：
- Bar Sprite：拖拽 Fill 節點
- Mode：FILLED
- Total Length：1.0
- Progress：1.0
```

### 5. 設置 ProgressBarController 組件

```
選擇 ProgressBar 根節點，在 ProgressBarController 組件中：
- Progress Bar：拖拽 FillArea 節點
- Progress Bar Container：拖拽 Container 節點
- Bar Sprite：拖拽 Fill 節點
- Time Label：拖拽 TimeLabel 節點 (如果有)
```

### 6. 保存預製體

```
按 Ctrl+S 保存預製體
```

## 📋 第二步：在Game場景中設置

### 1. 打開Game場景

```
雙擊 assets/textures/game.fire 打開遊戲場景
```

### 2. 設置Game組件屬性

```
選擇 Canvas 根節點，在 Game 組件中：
- Prefab Star：拖拽 star.prefab (現有的)
- Prefab Progress Bar：拖拽 ProgressBar.prefab (新建的) ← 重要！
- 其他屬性保持不變
```

### 3. 檢查其他設置

```
確認以下屬性已正確設置：
✅ Max Star Duration：最大星星存在時間
✅ Min Star Duration：最小星星存在時間
✅ Node Ground：地板節點
✅ Node Player：玩家節點
✅ Label Score：分數標籤
✅ 其他按鈕和標籤
```

## 🎨 第三步：視覺效果設計

### 進度條顏色變化

```
自動顏色變化邏輯：
- 100%-50%：🟢 綠色 (安全)
- 50%-30%：🟡 黃色 (注意)
- 30%-10%：🟠 橙色 (警告)
- 10%-0%：🔴 紅色 + 閃爍 (緊急)
```

### 位置跟隨

```
進度條會自動：
- 跟隨當前星星位置
- 顯示在星星下方約100像素處
- 星星被收集或超時後隱藏
```

### 時間顯示 (可選)

```
如果添加了 TimeLabel：
- 顯示剩餘時間如 "3.2s"
- 實時更新倒計時
- 時間歸零時停止更新
```

## 🔧 第四步：測試和驗證

### 1. 運行遊戲測試

```
1. 保存場景
2. 點擊預覽按鈕
3. 開始遊戲
```

### 2. 檢查功能

```
✅ 星星生成時進度條出現
✅ 進度條跟隨星星位置
✅ 進度條顏色隨時間變化
✅ 剩餘10%時閃爍效果
✅ 收集星星時進度條消失
✅ 星星超時時進度條消失
✅ 新星星生成時進度條重新出現
```

### 3. 調試信息

```
如果有問題，檢查控制台是否有錯誤訊息
```

## ⚠️ 第五步：故障排除

### 常見問題

#### Q: 進度條不顯示？

```
檢查：
- Game 組件的 Prefab Progress Bar 是否已綁定
- ProgressBarController 組件是否正確添加
- Container 節點是否設為 active
```

#### Q: 進度條不跟隨星星？

```
檢查：
- setPosition 方法中的座標轉換
- 確認進度條在正確的UI層級
```

#### Q: 顏色不變化？

```
檢查：
- Bar Sprite 屬性是否綁定到 Fill 節點
- Fill 節點的 Sprite 組件是否正確設置
```

#### Q: 時間不更新？

```
檢查：
- Time Label 屬性是否綁定
- TimeLabel 節點是否存在並有 Label 組件
```

## 🚀 完成後的效果

設置完成後，您的遊戲將擁有：

1. **智能進度條**：只有一個進度條，自動跟隨當前星星
2. **豐富視覺反饋**：顏色漸變 + 閃爍效果
3. **時間顯示**：精確的倒計時顯示
4. **性能優化**：減少UI節點，提升性能
5. **統一管理**：所有進度條邏輯集中在Game場景

## 📝 優化建議

### 進一步改進

```
1. 添加進度條動畫效果
2. 自定義進度條樣式和形狀
3. 添加音效提示
4. 支持多個星星的進度條管理
5. 添加進度條的淡入淡出效果
```

完成這些設置後，您就擁有了一個專業的統一進度條系統！🎯✨
