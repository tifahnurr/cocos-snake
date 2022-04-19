
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/assetEnum';
import { BaseSprite } from './baseSprite';
import { getAssetKey } from '../util/assetUtil';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = backgroundSprite
 * DateTime = Wed Apr 06 2022 13:32:45 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = backgroundSprite.ts
 * FileBasenameNoExtension = backgroundSprite
 * URL = db://assets/Scripts/sprite/backgroundSprite.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('LogoSprite')
export class LogoSprite extends BaseSprite {
    constructor() {
        super('Logo', ASSET_KEY.LOGO);
    }
    
}
