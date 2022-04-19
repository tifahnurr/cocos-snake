import { _decorator, Component, Node, AudioSource, AudioClip, assetManager, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseAudio')
export class BaseAudio extends Component {
    private audioSource?: AudioSource | null;

    constructor(
        name: string, 
        protected readonly audioKey: string,
        protected loop = false,
        protected volume = 1,
    ) {
        super(name);
    }

    private reload() {
        this.audioSource = this.getComponent(AudioSource);
        this.setupAudio();
    }

    private getAudioClip() {
        return assetManager.assets.get(this.audioKey) as AudioClip;
    }

    private setupAudio() {
        const { audioSource, loop, volume } = this;
        const audioClip = this.getAudioClip();

        if (!audioSource || !audioClip) return;

        audioSource.clip = audioClip;
        audioSource.loop = loop;
        audioSource.volume = volume;
    }

    play() {
        this.reload();
        this.audioSource?.play();
    }

    stop() {
        this.audioSource?.stop();
    }

    public fadeOut(duration: number) {
        const { audioSource } = this;

        if (!audioSource?.playing) return;

        tween(audioSource).to(
            duration,
            {
                volume: 0,
            },
            {
                onComplete: () => {
                    this.stop();
                }
            }
        ).start();
    }
}
