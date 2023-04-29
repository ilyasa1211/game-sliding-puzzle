var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "rgb(46,46,46)";
const SIZE = 4;
const AVAILABLE_POSITION = Array(Math.pow(SIZE, 2)).fill(null).map((_, i) => i + 1);
const BLOCKS = [];
while (AVAILABLE_POSITION.length > 0) {
    let random = getIntegerRandomNumberBetween(0, AVAILABLE_POSITION.length);
    let number = AVAILABLE_POSITION.splice(random, 1)[0];
    BLOCKS.push(number);
}
const BLOCK = {
    size: 100,
};
const spaceBetweenBlock = 10;
BLOCKS.splice(getIntegerRandomNumberBetween(0, BLOCKS.length), 1, 0);
window.requestAnimationFrame(game);
function game() {
    // console.log(1);
    BLOCKS.forEach((block, index) => {
        const [x, y] = [
            (index % SIZE) * BLOCK.size + spaceBetweenBlock,
            Math.floor(index / SIZE) * BLOCK.size + spaceBetweenBlock,
        ];
        if (block) {
            // create block
            context.fillStyle = "white";
            context.beginPath();
            context.rect(x, y, BLOCK.size, BLOCK.size);
            context.fill();
            context.closePath();
            // create number
            context.fillStyle = "black";
            context.font = "50px Arial"
            context.beginPath();
            context.fillText(block.toString(), x, y + BLOCK.size / 2);
            context.fill();
            context.closePath();
        }
    });
    window.requestAnimationFrame(game);
}
function getIntegerRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
