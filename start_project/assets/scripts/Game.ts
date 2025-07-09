import Player from './Player';
import Star from './Star';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Prefab)
    prefabStar: cc.Prefab = null;

    @property
    maxStarDuration = 0;

    @property
    minStarDuration = 0;

    @property(cc.Node)
    nodeGround: cc.Node = null;

    @property(cc.Node)
    nodePlayer: cc.Node = null;

    private groundY = 0;

    newStar: cc.Node = null;

    start(): void {
        // 初始化邏輯
    }

    onLoad(): void {
        // 地板頂部的Y座標
        this.groundY = this.nodeGround.y + this.nodeGround.height / 2;
        console.warn('地板Y座標:', this.groundY); // 調試用
        this.spawnNewStar();
    }

    update(dt: number): void {
        // 更新邏輯
    }

    public spawnNewStar() {
        this.newStar = cc.instantiate(this.prefabStar);

        this.node.addChild(this.newStar);
        this.newStar.setPosition(this.getNewStarPosition());
        this.newStar.getComponent(Star).game = this;
    }

    private getNewStarPosition(): cc.Vec2 {
        const player = this.nodePlayer.getComponent(Player);

        // Y座標：地板以上 + 隨機高度（最大到跳躍高度）
        const randY = this.groundY + 50 + Math.random() * player.jumpHeight;

        // X座標：畫面左右兩側隨機
        const maxX = this.node.width / 2;
        const randX = (Math.random() - 0.5) * 2 * maxX; // -maxX 到 +maxX

        console.warn('星星位置:', randX, randY); // 調試用
        return cc.v2(randX, randY);
    }
}
