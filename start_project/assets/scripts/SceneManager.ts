// 場景管理器 - 處理場景切換和數據持久化

interface GameData {
    bestScore: number;
    totalGamesPlayed: number;
}

export default class SceneManager {
    private static instance: any;

    // 遊戲數據
    public bestScore = 0;

    public currentScore = 0;

    public totalGamesPlayed = 0;

    private constructor() {
        this.loadGameData();
    }

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance as SceneManager;
    }

    // 載入場景
    public loadScene(sceneName: string): void {
        cc.director.loadScene(sceneName);
    }

    // 載入場景並傳遞回調
    public loadSceneWithCallback(sceneName: string, onLaunched?: () => void): void {
        cc.director.loadScene(sceneName, onLaunched);
    }

    // 更新當前分數
    public updateCurrentScore(score: number): void {
        this.currentScore = score;
        if (score > this.bestScore) {
            this.bestScore = score;
            this.saveGameData();
        }
    }

    // 遊戲結束時調用
    public onGameEnd(): void {
        this.totalGamesPlayed += 1;
        this.saveGameData();
    }

    // 獲取最佳分數
    public getBestScore(): number {
        return this.bestScore;
    }

    // 獲取當前分數
    public getCurrentScore(): number {
        return this.currentScore;
    }

    // 獲取總遊戲次數
    public getTotalGamesPlayed(): number {
        return this.totalGamesPlayed;
    }

    // 重置所有數據
    public resetAllData(): void {
        this.bestScore = 0;
        this.currentScore = 0;
        this.totalGamesPlayed = 0;
        this.saveGameData();
    }

    // 保存遊戲數據到本地存儲
    private saveGameData(): void {
        const gameData: GameData = {
            bestScore: this.bestScore,
            totalGamesPlayed: this.totalGamesPlayed,
        };
        (cc.sys.localStorage as Storage).setItem('jumpStarGameData', JSON.stringify(gameData));
    }

    // 從本地存儲載入遊戲數據
    private loadGameData(): void {
        const savedData = (cc.sys.localStorage as Storage).getItem('jumpStarGameData');
        if (savedData) {
            try {
                const gameData = JSON.parse(savedData) as GameData;
                this.bestScore = gameData.bestScore || 0;
                this.totalGamesPlayed = gameData.totalGamesPlayed || 0;
            } catch (error) {
                // 如果數據損壞，重置為默認值
                this.resetAllData();
            }
        }
    }
}
