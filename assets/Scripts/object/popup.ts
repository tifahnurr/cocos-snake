
import { _decorator, Component, Node, v3, RichText, Label, tween } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = popup
 * DateTime = Tue Apr 19 2022 09:44:46 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = popup.ts
 * FileBasenameNoExtension = popup
 * URL = db://assets/Scripts/object/popup.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('popup')
export class popup extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(RichText)
    label: RichText;

    @property(Node)
    mainButton: Node;

    @property(Node)
    secondButton: Node;

    @property(RichText)
    subText: RichText;

    start () {
        this.node.active = false;
        this.node.setScale(v3(0, 0, 0));
    }

    showPopup(text, subtext, button1, button1Function: Function, button2?, button2Function?: Function) {
        this.mainButton.off(Node.EventType.TOUCH_END)
        this.secondButton.off(Node.EventType.TOUCH_END)
        this.node.active = true;
        tween(this.node).to(0.2, {
            scale: v3(1, 1, 1)
        }).start();
        // this.node.setScale(v3(1, 1, 1));
        this.label.string = `<color=#000000>${text}</color>`;
        this.subText.string = `<color=#000000>${subtext}</color>`;
        this.mainButton.getChildByName('Label').getComponent(Label).string = button1;
        this.mainButton.on(Node.EventType.TOUCH_END, button1Function);
        if (button2) {
            this.secondButton.getChildByName('Label').getComponent(Label).string = button2;
            this.secondButton.on(Node.EventType.TOUCH_END, button2Function);
        } else {
            this.secondButton.setScale(v3(0, 0, 0));
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
