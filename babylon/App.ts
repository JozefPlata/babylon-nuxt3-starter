import {Game} from "~/babylon/game/Game";
import {Debug, DEBUG_MODE} from "~/babylon/game/DEBUG_MODE";

export class App {
    private static _canvas: HTMLCanvasElement;

    constructor() {
        App._canvas = <HTMLCanvasElement> document.getElementById('babylon-canvas');
        const debug = new Debug();

        new Game(DEBUG_MODE.PLAYER, debug);
    }

    public static get canvas(): HTMLCanvasElement {
        return App._canvas;
    }
}
