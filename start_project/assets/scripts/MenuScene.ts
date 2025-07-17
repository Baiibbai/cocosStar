const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuScene extends cc.Component {
    @property(cc.Button)
    btnStartGame: cc.Button = null;

    @property(cc.Button)
    btnExit: cc.Button = null;

    @property(cc.Label)
    labelTitle: cc.Label = null;

    start(): void {
        // 初始化邏輯
    }

    onLoad(): void {
        // 綁定按鈕事件
        this.btnStartGame.node.on('click', this.onStartGame, this);

        if (this.btnExit) {
            this.btnExit.node.on('click', this.onExitGame, this);
        }

        // 設置標題
        if (this.labelTitle) {
            this.labelTitle.string = '跳躍收集星星';
        }
    }

    onDestroy(): void {
        // 清理事件監聽
        this.btnStartGame?.node?.off('click', this.onStartGame, this);
        this.btnExit?.node?.off('click', this.onExitGame, this);
    }

    private onStartGame(): void {
        // 停止背景音樂
        cc.audioEngine.stopMusic();

        // 切換到遊戲場景
        cc.director.loadScene('game');
    }

    private onExitGame(): void {
        // 在網頁環境下，這不會真正關閉瀏覽器
        // 但可以顯示提示訊息或其他處理
        cc.director.end();
    }
}
