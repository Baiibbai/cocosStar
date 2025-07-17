import Player from './Player';
import ProgressBarController from './ProgressBarController';
import Star from './Star';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Prefab)
    prefabStar: cc.Prefab = null;

    @property(cc.Prefab)
    prefabProgressBar: cc.Prefab = null;

    @property
    maxStarDuration = 0;

    @property
    minStarDuration = 0;

    @property(cc.Node)
    nodeGround: cc.Node = null;

    @property(cc.Node)
    nodePlayer: cc.Node = null;

    @property(cc.Label)
    labelScore: cc.Label = null;

    @property(cc.Label)
    labelGameOver: cc.Label = null;

    @property(cc.Button)
    btnStart: cc.Button = null;

    @property(cc.Button)
    btnMenu: cc.Button = null;

    @property(cc.Button)
    btnRestart: cc.Button = null;

    private groundY = 0;

    private scorePoint = 0;

    public starTimer = 0; // 剩餘時間（秒）

    newStar: cc.Node = null;

    public starDuration = 0;

    private isGameStarted = false;

    private progressBarController: ProgressBarController = null;

    private progressBarNode: cc.Node = null;

    start(): void {
        // 初始化邏輯
    }

    onLoad(): void {
        // 綁定按鈕事件
        this.btnStart.node.on('click', this.onBtnStart, this);

        if (this.btnMenu) {
            this.btnMenu.node.on('click', this.onBackToMenu, this);
        }

        if (this.btnRestart) {
            this.btnRestart.node.on('click', this.onRestartGame, this);
        }

        this.starTimer = 0;
        this.starDuration = 0;
        this.scorePoint = 0;

        // 地板頂部的Y座標
        this.groundY = this.nodeGround.y + this.nodeGround.height / 2;

        // 設置Player的初始位置
        this.nodePlayer.y = this.groundY;
        this.nodePlayer.x = 0;

        // 隱藏遊戲結束按鈕
        if (this.btnMenu) {
            this.btnMenu.node.active = false;
        }
        if (this.btnRestart) {
            this.btnRestart.node.active = false;
        }

        // 創建進度條
        this.createProgressBar();

        // 初始化時直接開始遊戲（因為是從菜單場景進入的）
        this.autoStartGame();
    }

    onDestroy(): void {
        // 清理事件監聽
        this.btnStart?.node?.off('click', this.onBtnStart, this);
        this.btnMenu?.node?.off('click', this.onBackToMenu, this);
        this.btnRestart?.node?.off('click', this.onRestartGame, this);
    }

    private createProgressBar(): void {
        if (this.prefabProgressBar) {
            this.progressBarNode = cc.instantiate(this.prefabProgressBar);
            this.node.addChild(this.progressBarNode);
            this.progressBarController = this.progressBarNode.getComponent(ProgressBarController);
        }
    }

    private resetGame(): void {
        this.starTimer = 0;
        this.starDuration = 0;
        this.scorePoint = 0;
        this.labelGameOver.node.active = false;
        this.labelScore.string = 'Score: 0';

        // 清理舊的星星
        if (this.newStar && this.newStar.isValid) {
            this.newStar.destroy();
            this.newStar = null;
        }

        // 隱藏進度條
        if (this.progressBarController) {
            this.progressBarController.hideProgressBar();
        }

        // 重置Player位置到地板上
        this.nodePlayer.y = this.groundY;
        this.nodePlayer.x = 0; // 重置到畫面中央

        // 重新啟用Player組件和動畫
        const player = this.nodePlayer.getComponent(Player);
        player.enabled = true;
        player.restartGame(); // 重新開始跳躍動畫
    }

    onBtnStart(): void {
        this.resetGame();
        this.btnStart.node.active = false;
        this.isGameStarted = true;
        this.spawnNewStar();
    }

    private autoStartGame(): void {
        // 從菜單場景進入時自動開始遊戲
        this.resetGame();
        this.btnStart.node.active = false;
        this.isGameStarted = true;
        this.spawnNewStar();
    }

    private onBackToMenu(): void {
        // 返回主菜單場景
        cc.director.loadScene('menu');
    }

    private onRestartGame(): void {
        // 重新載入當前遊戲場景
        cc.director.loadScene('game');
    }

    update(dt: number): void {
        if (!this.isGameStarted) {
            return;
        }

        if (this.starTimer > this.starDuration) {
            this.gameOver();
        }
        this.starTimer += dt;

        // 更新進度條
        this.updateProgressBar();
    }

    private updateProgressBar(): void {
        if (this.progressBarController && this.newStar) {
            this.progressBarController.updateProgress(this.starTimer, this.starDuration);

            // 更新進度條位置跟隨星星
            const starPos = this.newStar.getPosition();
            this.progressBarController.setPosition(cc.v3(starPos.x, starPos.y, 0));
        }
    }

    public spawnNewStar() {
        this.newStar = cc.instantiate(this.prefabStar);

        this.node.addChild(this.newStar);
        this.newStar.setPosition(this.getNewStarPosition());
        this.newStar.getComponent(Star).game = this;

        this.starDuration =
            this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.starTimer = 0;

        // 顯示並初始化進度條
        if (this.progressBarController) {
            this.progressBarController.showProgressBar();
        }
    }

    public gainScore() {
        this.scorePoint += 1;
        this.labelScore.string = `Score: ${this.scorePoint}`;

        // 星星被收集時隱藏進度條
        if (this.progressBarController) {
            this.progressBarController.hideProgressBar();
        }
    }

    private getNewStarPosition(): cc.Vec2 {
        const player = this.nodePlayer.getComponent(Player);

        // Y座標：地板以上 + 隨機高度（最大到跳躍高度）
        const randY = this.groundY + 50 + Math.random() * player.jumpHeight;

        // X座標：畫面左右兩側隨機
        const maxX = this.node.width / 2;
        const randX = (Math.random() - 0.5) * 2 * maxX; // -maxX 到 +maxX

        return cc.v2(randX, randY);
    }

    private gameOver(): void {
        this.labelGameOver.node.active = true;
        this.isGameStarted = false;

        // 顯示遊戲結束選項按鈕
        if (this.btnMenu) {
            this.btnMenu.node.active = true;
        }
        if (this.btnRestart) {
            this.btnRestart.node.active = true;
        }

        // 隱藏進度條
        if (this.progressBarController) {
            this.progressBarController.hideProgressBar();
        }

        // 停止Player的動作和更新
        this.nodePlayer.stopAllActions();
        this.nodePlayer.getComponent(Player).enabled = false;

        // 停止當前星星的更新
        if (this.newStar && this.newStar.isValid) {
            const star = this.newStar.getComponent(Star);
            if (star) {
                star.enabled = false;
            }
        }
    }
}
