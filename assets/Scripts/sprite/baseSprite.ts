import { _decorator, Component, Sprite, assetManager, SpriteFrame, Animation, UITransform, UIOpacity, Color, Texture2D, ImageAsset } from 'cc';
import { getScaleToNewDimension } from '../util/scalingUtil';
import { getSpriteFrameKey } from '../util/spritesheetUtil';
const { ccclass, property } = _decorator;

@ccclass('BaseSprite')
export class BaseSprite extends Component {
    protected sprite?: Sprite | null;

    protected uiTransform?: UITransform | null;

    protected uiOpacity?: UIOpacity | null;

    protected animation?: Animation | null;

    protected presetDimension = { width: 0, height: 0 };

    constructor(
        name: string,
        protected textureKey: string,
        protected frameKey?: number | string,
    ) {
        super(name);
    }

    onLoad() {
        this.sprite = this.getComponent(Sprite);
        this.uiTransform = this.getComponent(UITransform);
        this.uiOpacity = this.getComponent(UIOpacity);
        this.animation = this.getComponent(Animation);
        this.presetDimension = this.getPresetDimension();

        this.reload();
    }

    public reload() {
        this.setupSprite();
        this.adjustSize();
    }

    protected getPresetDimension() {
        const { presetDimension, uiTransform } = this;

        if (!uiTransform) return presetDimension;

        const { width, height } = uiTransform;
        return { width, height };
    }

    protected getSpriteFrame() {
        const imageAsset = assetManager.assets.get(getSpriteFrameKey(this.textureKey, this.frameKey)) as SpriteFrame;
        if (!imageAsset) return null;
        return imageAsset;
    }

    protected setupSprite() {
        if (this.sprite) {
            const spriteFrame = this.getSpriteFrame();
            if (spriteFrame) {
                this.sprite.spriteFrame = this.getSpriteFrame();    
            }
        }
    }

    /**
     * @deprecated Use adjustSize instead
     */
    protected adjustScaling() {
        const { node, presetDimension } = this;
        const { width: presetWidth, height: presetHeight } = presetDimension;

        const { width, height } = this.getSpriteFrame()?.rect || presetDimension;
        const { x, y } = getScaleToNewDimension(width, height, presetWidth, presetHeight);
        node.setScale(x, y);
    }

    protected adjustSize() {
        const { uiTransform, presetDimension } = this;
        const { width, height } = presetDimension;

        uiTransform?.setContentSize(width, height);
    }

    public setOpacity(opacity: number) {
        if (this.uiOpacity) {
            this.uiOpacity.opacity = opacity;
        }
    }

    public setColor(color: Color) {
        if (this.sprite) {
            this.sprite.color = color;
        }
    }

    public setFrame(frameKey?: number | string) {
        this.frameKey = frameKey;
        this.reload();
    }

    public setTexture(textureKey: string) {
        this.textureKey = textureKey;
        this.reload();
    }

    update() {
        if (!this.sprite?.spriteFrame) {
            this.reload();
        }
    }
}
