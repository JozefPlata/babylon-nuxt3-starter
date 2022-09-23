export class CharacterManager {
    private static _instance: CharacterManager;

    private constructor() {}

    public static get Instance(): CharacterManager {
        return this._instance || (this._instance = new this());
    }
}
