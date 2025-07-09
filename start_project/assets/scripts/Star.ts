import Game from './Game';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Star extends cc.Component {
    @property
    pickRadius = 0;

    // 引用 Game 組件
    game: Game = null;

    getPlayerDistance(): number {
        const playerPos = this.game.nodePlayer.getPosition();
        const starPos = cc.v2(this.node.x, this.node.y);
        const dist = cc.Vec2.distance(starPos, playerPos);
        return dist;
    }

    onPicked() {
        this.game.spawnNewStar();
        this.node.destroy();
    }

    start(): void {
        // 初始化邏輯
    }

    update(dt: number) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
        }
    }
}
