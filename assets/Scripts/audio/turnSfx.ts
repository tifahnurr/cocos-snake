
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/assetEnum';
import { BaseAudio } from './baseAudio';
const { ccclass, property } = _decorator;

@ccclass('turnSfx')
export class turnSfx extends BaseAudio {
    constructor() {
        super('TurnSfx', ASSET_KEY.TURN_SFX, false, 0.5);
    }
}

