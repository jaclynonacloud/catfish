import { Game } from "./Game";

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game(document.getElementById("game-canvas") as HTMLCanvasElement);
});