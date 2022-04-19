
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/assetEnum';
import { BaseAudio } from './baseAudio';
const { ccclass, property } = _decorator;

@ccclass('eatSfx')
export class eatSfx extends BaseAudio {
    constructor() {
        super('EatSfx', ASSET_KEY.EAT_SFX, false, 0.5);
    }
}

