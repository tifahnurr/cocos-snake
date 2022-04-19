import { _decorator, Component, Node, UITransform, Graphics } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundGraphics')
export class BackgroundGraphics extends Component {
    private graphics?: Graphics | null;

    private uiTransform?: UITransform | null;

    onLoad() {
        this.graphics = this.getComponent(Graphics);
        this.uiTransform = this.getComponent(UITransform);
        if (!this.graphics || !this.uiTransform) {
            return;
        }

        const { width, height } = this.uiTransform;
        this.graphics.fillRect(width * -0.5, height * -0.5, width, height);
    }
}