// === Setup the initial game state ===
var initialState = {
  timeStamp: {},
  blocks: [],
  objects: [],
  keys: [],
  lastBonus: 0,
  score: 0,
};

// === Initialize Canvas ===
const canvas = document.getElementById('canvas');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var pc = getPixelCanvas(canvas, 3, getInitialState());

function getInitialState() {
  var state = copy(initialState);

  return state;
}