var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext("2d");
const canvasBackground = "rgb(46,46,46)";
const SIZE = 4;
const AVAILABLE_POSITION = Array(SIZE ** 2).fill(null).map((_, i) => i + 1);
const BLOCKS = [];
const BLOCK_SIZE = 100;
const blocks = [];
var clientX;
var clientY;
canvas.width = SIZE * BLOCK_SIZE;
canvas.height = SIZE * BLOCK_SIZE;
canvas.style.backgroundColor = canvasBackground;
while (AVAILABLE_POSITION.length > 0) {
    let random = getIntegerRandomNumberBetween(0, AVAILABLE_POSITION.length);
    let number = AVAILABLE_POSITION.splice(random, 1)[0];
    number = (number === 16) ? 0 : number;
    blocks.push(number);
    if (blocks.length % SIZE === 0) {
        BLOCKS.push(blocks.splice(0, blocks.length));
    }
}
window.requestAnimationFrame(game);
canvas.onclick = (e) => {
    window.clientX = e.clientX - window.innerWidth / 2 + canvas.width / 2;
    window.clientY = e.clientY - window.innerHeight / 2 + canvas.height / 2;
};
function game() {
    clearCanvas(context);
    if (isWin(BLOCKS.flat())) {
        let text = "You Win";
        let measure = context.measureText(text);
        context.font = "50px Arial";
        context.fillStyle = "white";
        context.fillText(text, canvas.width / 2 - measure.width / 2, canvas.height / 2 - measure.actualBoundingBoxAscent / 2);
        return;
    }
    BLOCKS.flat().forEach((block, index) => {
        const [blockXPos, blockYPos] = [
            (index % SIZE) * BLOCK_SIZE,
            Math.floor(index / SIZE) * BLOCK_SIZE,
        ];
        if (clientX) {
            if (clientX >= blockXPos && clientX <= blockXPos + BLOCK_SIZE &&
                clientY >= blockYPos && clientY <= blockYPos + BLOCK_SIZE) {
                let row = Math.floor(index / SIZE);
                let column = index % SIZE;
                let emptyLeft = (column > 0)
                    ? !Boolean(BLOCKS[row][column - 1])
                    : false;
                let emptyRight = (column < SIZE - 1)
                    ? !Boolean(BLOCKS[row][column + 1])
                    : false;
                let emptyBelow = (row > 0) ? !Boolean(BLOCKS[row - 1][column]) : false;
                let emptyAbove = (row < SIZE - 1)
                    ? !Boolean(BLOCKS[row + 1][column])
                    : false;
                if (emptyAbove) {
                    BLOCKS[row + 1][column] = block;
                    BLOCKS[row][column] = 0;
                }
                else if (emptyBelow) {
                    BLOCKS[row - 1][column] = block;
                    BLOCKS[row][column] = 0;
                }
                else if (emptyLeft) {
                    BLOCKS[row][column - 1] = block;
                    BLOCKS[row][column] = 0;
                }
                else if (emptyRight) {
                    BLOCKS[row][column + 1] = block;
                    BLOCKS[row][column] = 0;
                }
                clientX = 0;
                clientY = 0;
            }
        }
        if (block) {
            createBlock(blockXPos, blockYPos, context);
            addNumberToBlock(block, blockXPos, blockYPos, context);
        }
    });
    window.requestAnimationFrame(game);
}
function createBlock(x, y, context) {
    context.fillStyle = "white";
    context.strokeStyle = canvasBackground;
    context.lineWidth = 5;
    context.beginPath();
    context.rect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    context.fill();
    context.stroke();
    context.closePath();
}
function addNumberToBlock(block, x, y, context) {
    context.fillStyle = "black";
    context.font = "50px Arial";
    context.beginPath();
    context.fillText(block.toString(), x, y + BLOCK_SIZE / 2);
    context.fill();
    context.closePath();
}
function getIntegerRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function clearCanvas(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function isWin(blocks) {
    return blocks.every((value, index) => {
        if (index === blocks.length - 1 && blocks[blocks.length - 1] == 0) {
            return true;
        }
        return value === index + 1;
    });
}
// function solve() {
//   BLOCKS[0] = [1, 2, 3, 4];
//   BLOCKS[1] = [5, 6, 7, 8];
//   BLOCKS[2] = [9, 10, 11, 12];
//   BLOCKS[3] = [13, 14, 15, 0];
// }
