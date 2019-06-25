// === Setup the initial game state ===
var initialState = {
    timeStamp: {},
    blocks: [],
    keys: [],
};

// === Initialize Canvas ===
const canvas = document.getElementById('canvas');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var pc = getPixelCanvas(canvas, 3, initialState);
