
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/assetEnum';
import { BaseAudio } from './baseAudio';
const { ccclass, property } = _decorator;

@ccclass('buttonSfx')
export class buttonSfx extends BaseAudio {
    constructor() {
        super('ButtonSfx', ASSET_KEY.BUTTON_SFX, false, 0.5);
    }
}

