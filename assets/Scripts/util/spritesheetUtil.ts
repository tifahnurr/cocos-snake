export function getSpriteFrameKey(key: string, frame?: string | number) {
    if (frame !== undefined) {
        return (`${key}_${frame}`)
    }
    return key;
}