
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/assetEnum';
import { BaseAudio } from './baseAudio';
const { ccclass, property } = _decorator;

@ccclass('crashSfx')
export class crashSfx extends BaseAudio {
    constructor() {
        super('CrashSfx', ASSET_KEY.CRASH_SFX, false, 0.5);
    }
}

