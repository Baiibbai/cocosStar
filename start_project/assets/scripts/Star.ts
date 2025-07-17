const { ccclass, property } = cc._decorator;

// 避免循環導入，使用類型聲明
type Game = import('./Game').default;

@ccclass
export default class Star extends cc.Component {
    @property
    pickRadius = 0;

    @property(cc.AudioClip)
    scoreAudio: cc.AudioClip = null;

    // 引用 Game 組件
    game: Game = null;

    getPlayerDistance(): number {
        const playerPos = this.game.nodePlayer.getPosition();
        const starPos = cc.v2(this.node.x, this.node.y);
        const dist = cc.Vec2.distance(starPos, playerPos);
        return dist;
    }

    onPicked() {
        // 播放得分音效
        if (this.scoreAudio) {
            cc.audioEngine.playEffect(this.scoreAudio, false);
        }

        this.game.spawnNewStar();
        this.game.gainScore();
        this.node.destroy();
    }

    start(): void {}

    update(dt: number) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
        }

        // 更新透明度
        const opacityRatio = 1 - this.game.starTimer / this.game.starDuration;
        const minOpacity = 50;
        this.node.opacity = minOpacity + (255 - minOpacity) * opacityRatio;
    }
}
