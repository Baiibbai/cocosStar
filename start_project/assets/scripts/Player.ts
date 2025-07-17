const { ccclass, property } = cc._decorator;

// 定義鍵盤事件介面
interface KeyboardEvent {
    keyCode: number;
    isPressed: boolean;
    type: string;
    target: unknown;
}

@ccclass
export default class Player extends cc.Component {
    // 跳躍高度
    @property
    jumpHeight = 0;

    // 跳躍時間
    @property
    jumpDuration = 0;

    // 最大移動速度
    @property
    maxMoveSpeed = 0;

    // 加速度
    @property
    accel = 0;

    @property(cc.AudioClip)
    jumpAudio = null;

    private accLeft = false;

    private accRight = false;

    private xSpeed = 0;

    public getJumpHeight(): number {
        return this.node.y;
    }

    private playJumpAudio(): void {
        if (this.jumpAudio) {
            cc.audioEngine.playEffect(this.jumpAudio as cc.AudioClip, false);
        }
    }

    public restartGame(): void {
        // 停止所有現有動畫
        this.node.stopAllActions();

        // 重置移動相關的狀態
        this.xSpeed = 0;
        this.accLeft = false;
        this.accRight = false;

        // 重新啟動跳躍動畫（Game.ts已經設置了正確的起始位置）
        cc.tween(this.node)
            .repeatForever(
                cc
                    .tween(this.node)
                    .call(() => {
                        // 在每次跳躍開始時播放音效
                        this.playJumpAudio();
                    })
                    .by(this.jumpDuration, { y: this.jumpHeight }, { easing: 'sineOut' })
                    .by(this.jumpDuration, { y: -this.jumpHeight }, { easing: 'sineIn' }),
            )
            .start();
    }

    start(): void {
        // 初始化邏輯
    }

    onLoad(): void {
        // 直接使用鏈式呼叫創建跳躍動畫，並在每次跳躍開始時播放音效
        cc.tween(this.node)
            .repeatForever(
                cc
                    .tween(this.node)
                    .call(() => {
                        // 在每次跳躍開始時播放音效
                        this.playJumpAudio();
                    })
                    .by(this.jumpDuration, { y: this.jumpHeight }, { easing: 'sineOut' })
                    .by(this.jumpDuration, { y: -this.jumpHeight }, { easing: 'sineIn' }),
            )
            .start();
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        cc.systemEvent.on('keyup', this.onKeyUp, this);
    }

    onDestroy(): void {
        cc.systemEvent.off('keydown', this.onKeyDown, this);
        cc.systemEvent.off('keyup', this.onKeyUp, this);
    }

    update(dt: number): void {
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        }
        if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = (this.maxMoveSpeed * this.xSpeed) / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;

        // 限制玩家在畫面邊界內
        const halfScreenWidth = cc.winSize.width / 2;
        if (this.node.x <= -halfScreenWidth) {
            this.node.x = -halfScreenWidth;
        } else if (this.node.x >= halfScreenWidth) {
            this.node.x = halfScreenWidth;
        }
    }

    private onKeyDown(event: KeyboardEvent): void {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            default:
                break;
        }
    }

    private onKeyUp(event: KeyboardEvent): void {
        // unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
            default:
                break;
        }
    }
}
