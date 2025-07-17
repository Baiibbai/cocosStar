const { ccclass, property } = cc._decorator;

@ccclass
export default class ProgressBarController extends cc.Component {
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Node)
    progressBarContainer: cc.Node = null;

    @property(cc.Sprite)
    barSprite: cc.Sprite = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    private isVisible = false;

    onLoad(): void {
        // 初始時隱藏進度條
        this.hideProgressBar();
    }

    start(): void {
        // 初始化邏輯
    }

    public showProgressBar(): void {
        if (this.progressBarContainer) {
            this.progressBarContainer.active = true;
            this.isVisible = true;

            // 初始化進度條
            if (this.progressBar) {
                this.progressBar.progress = 1.0;
            }

            // 設置初始顏色為綠色
            if (this.barSprite) {
                this.barSprite.node.color = cc.Color.GREEN.clone();
            }
        }
    }

    public hideProgressBar(): void {
        if (this.progressBarContainer) {
            this.progressBarContainer.active = false;
            this.isVisible = false;
        }
    }

    public updateProgress(currentTime: number, totalTime: number): void {
        if (!this.isVisible || !this.progressBar) {
            return;
        }

        // 計算剩餘時間比例
        const remainingRatio = 1 - currentTime / totalTime;
        this.progressBar.progress = Math.max(0, remainingRatio);

        // 更新顏色
        this.updateBarColor(remainingRatio);

        // 更新時間文字（如果有的話）
        if (this.timeLabel) {
            const remainingTime = Math.max(0, totalTime - currentTime);
            this.timeLabel.string = `${remainingTime.toFixed(1)}s`;
        }

        // 閃爍效果
        this.updateBlinkEffect(remainingRatio);
    }

    private updateBarColor(remainingRatio: number): void {
        if (!this.barSprite) {
            return;
        }

        let newColor: cc.Color;

        if (remainingRatio < 0.1) {
            // 剩餘10%以下：深紅色
            newColor = cc.Color.RED.clone();
        } else if (remainingRatio < 0.3) {
            // 剩餘30%以下：橙色
            newColor = new cc.Color(255, 128, 0, 255);
        } else if (remainingRatio < 0.5) {
            // 剩餘50%以下：黃色
            newColor = cc.Color.YELLOW.clone();
        } else {
            // 剩餘50%以上：綠色
            newColor = cc.Color.GREEN.clone();
        }

        this.barSprite.node.color = newColor;
    }

    private updateBlinkEffect(remainingRatio: number): void {
        if (!this.progressBarContainer) {
            return;
        }

        if (remainingRatio < 0.1) {
            // 剩餘10%以下閃爍
            const blinkSpeed = 8;
            const alpha = (Math.sin((Date.now() / 100) * blinkSpeed) + 1) / 2;
            this.progressBarContainer.opacity = 100 + alpha * 155;
        } else {
            // 重置透明度
            this.progressBarContainer.opacity = 255;
        }
    }

    public setPosition(worldPos: cc.Vec3): void {
        if (this.progressBarContainer) {
            // 將世界座標轉換為UI座標
            const camera = cc.Camera.findCamera(this.node);
            if (camera) {
                const screenPos = camera.getWorldToScreenPoint(worldPos);
                const uiPos = this.node.parent.convertToNodeSpaceAR(
                    cc.v3(screenPos.x, screenPos.y, 0),
                );

                // 設置進度條位置在星星下方
                this.progressBarContainer.position = cc.v3(uiPos.x, uiPos.y - 100, 0);
            }
        }
    }
}
