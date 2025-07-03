declare namespace cc {
    const _decorator: {
        ccclass: any;
        property: any;
    };
    
    class Component {
        node: any;
        start(): void;
        update(dt: number): void;
        onLoad(): void;
        onDestroy(): void;
        onEnable(): void;
        onDisable(): void;
    }
    
    class Label {
        string: string;
    }
    
    class Node {
        name: string;
        active: boolean;
        position: any;
        rotation: any;
        scale: any;
        getComponent<T>(type: any): T;
        addComponent<T>(type: any): T;
    }
    
    class Vec2 {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
    }
    
    class Vec3 {
        x: number;
        y: number;
        z: number;
        constructor(x?: number, y?: number, z?: number);
    }
    
    class Color {
        r: number;
        g: number;
        b: number;
        a: number;
        constructor(r?: number, g?: number, b?: number, a?: number);
    }
    
    class Size {
        width: number;
        height: number;
        constructor(width?: number, height?: number);
    }
    
    class Rect {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
    }
    
    // 其他常用類型
    class Sprite {
        spriteFrame: any;
    }
    
    class Button {
        interactable: boolean;
        target: Node;
        clickEvents: any[];
    }
    
    class RichText {
        string: string;
    }
    
    class EditBox {
        string: string;
        placeholder: string;
    }
    
    class ProgressBar {
        progress: number;
        totalLength: number;
    }
    
    class Slider {
        progress: number;
        handle: Node;
    }
    
    class ScrollView {
        content: Node;
        horizontal: boolean;
        vertical: boolean;
    }
    
    class Animation {
        play(name?: string): void;
        stop(name?: string): void;
    }
    
    class AudioSource {
        clip: any;
        volume: number;
        loop: boolean;
        play(): void;
        stop(): void;
    }
    
    // 物理相關
    class RigidBody {
        type: number;
        gravityScale: number;
        linearVelocity: Vec2;
        angularVelocity: number;
    }
    
    class Collider {
        tag: number;
        isTrigger: boolean;
    }
    
    class BoxCollider extends Collider {
        offset: Vec2;
        size: Size;
    }
    
    class CircleCollider extends Collider {
        offset: Vec2;
        radius: number;
    }
    
    // 常用函數
    const find: (path: string, referenceNode?: Node) => Node;
    const instantiate: (prefab: any) => Node;
    const tween: (target: any) => any;
    const lerp: (a: number, b: number, r: number) => number;
    const clamp: (value: number, min: number, max: number) => number;
    const clamp01: (value: number) => number;
    const misc: any;
    const director: any;
    const game: any;
    const sys: any;
    const loader: any;
    const resources: any;
    const assetManager: any;
}

// 全域常數
declare const CC_EDITOR: boolean;
declare const CC_RUNTIME: boolean;
declare const CC_PREVIEW: boolean;
declare const CC_DEV: boolean;
declare const CC_DEBUG: boolean;
declare const CC_JSB: boolean;
declare const CC_NATIVERENDERER: boolean;
declare const CC_SUPPORT_JIT: boolean;
declare const CC_WECHATGAME: boolean;
declare const CC_QQPLAY: boolean;
declare const CC_BAIDU: boolean;
declare const CC_ALIPAY: boolean;
declare const CC_XIAOMI: boolean;
declare const CC_BYTEDANCE: boolean;
declare const CC_OPPO: boolean;
declare const CC_VIVO: boolean;
declare const CC_HUAWEI: boolean;
declare const CC_COCOSPLAY: boolean;
declare const CC_RUNTIME_BASED: boolean;
declare const CC_NET: boolean;
declare const CC_DEBUG_ORIGIN: boolean;
declare const CC_PHYSICS_BUILTIN: boolean;

// 其他全域變數
declare const Editor: any;
declare const sp: any;
declare const dragonBones: any;
declare const fgui: any;
declare const goog: any;
declare const jsb: any;
declare const cc_extends: any;
declare const require: any;
declare const module: any;
declare const exports: any;
declare const __dirname: string;
declare const __filename: string; 