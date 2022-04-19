
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/assetEnum';
import { BaseAudio } from './baseAudio';
const { ccclass, property } = _decorator;

@ccclass('silenceSfx')
export class silenceSfx extends BaseAudio {
    constructor() {
        super('SilenceSfx', ASSET_KEY.SILENCE_SFX, false, 0.5);
    }
}

