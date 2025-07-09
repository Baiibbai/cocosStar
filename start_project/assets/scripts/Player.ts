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

    private accLeft = false;

    private accRight = false;

    private xSpeed = 0;

    public getJumpHeight(): number {
        return this.node.y;
    }

    start(): void {
        // 初始化邏輯
    }

    onLoad(): void {
        // 直接使用鏈式呼叫創建跳躍動畫
        cc.tween(this.node)
            .repeatForever(
                cc
                    .tween(this.node)
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
