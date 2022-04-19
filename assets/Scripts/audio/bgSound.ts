
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/assetEnum';
import { BaseAudio } from './baseAudio';
const { ccclass, property } = _decorator;

@ccclass('bgSound')
export class bgSound extends BaseAudio {
    constructor() {
        super('BgSound', ASSET_KEY.BG_SOUND, true, 0.5);
    }
}

