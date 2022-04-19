
import { _decorator, Component, Node, Sprite } from 'cc';
import { SnakeSprite } from '../sprite/snakeSprite';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = snakePart
 * DateTime = Thu Apr 07 2022 13:40:47 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = snakePart.ts
 * FileBasenameNoExtension = snakePart
 * URL = db://assets/Scripts/object/snakePart.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SnakePart')
export class SnakePart {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    private direction?: {
        x: number,
        y: number
    }

    private node?: Node;

    private pos?: {
        x: number,
        y: number
    }

    public getDirection() {
        return this.direction;
    }

    public setDirection(x: number, y: number) {
        this.direction = {
            x: x, y: y
        }
    }

    public setPosition(x: number, y: number) {
        this.pos = {
            x: x, y: y
        }
    }

    public getPosition() {
        return this.pos;
    }

    public setNode(node: Node) {
        this.node = node;
    }

    public getNode() {
        return this.node;
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
