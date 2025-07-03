// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad(): void {}

    start(): void {
        // 初始化邏輯
    }

    // update(dt: number): void {}
}
