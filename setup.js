// === Setup the initial game state ===
var initialState = {
  timeStamp: {},
  blocks: [],
  objects: [],
  keys: [],
  score: 0,
};

// === Initialize Canvas ===
const canvas = document.getElementById('canvas');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var pc = getPixelCanvas(canvas, 3, getInitialState());

function play() {
  /**
   * If an AudioContext is created prior to the document receiving a
   * user gesture, it will be created in the "suspended" state, and
   * you will need to call resume() after a user gesture is
   * received.
   */
    audioContext.resume().then(() => {
        sound.play();
    });
}


function getInitialState() {
  var state = copy(initialState);

  return state;
}