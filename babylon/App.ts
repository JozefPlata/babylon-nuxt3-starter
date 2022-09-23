import {Game} from "~/babylon/game/Game";

export class App {
    private static _canvas: HTMLCanvasElement;

    constructor() {
        App._canvas = <HTMLCanvasElement> document.getElementById('babylon-canvas');

        new Game();
    }

    public static get canvas(): HTMLCanvasElement {
        return App._canvas;
    }
}
