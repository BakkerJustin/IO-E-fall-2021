// Adapted from https://editor.p5js.org/sjnha/sketches/B10skF48Z
var rx = 0;
var ry = 290;
var rw = 400;
var rh = 100;
let img;
let img1;

// https://p5js.org/reference/#/p5/preload
function preload(){
// My own image taken at Allan Gardens in Toronto, ON
img = loadImage('img/Background.png');
// Two images photoshopped together to represent a projection device
// https://www.taninihome.com/en/biny-spot-nickel-gold.html
// https://qdesigncentre.com/shop/hardware/1-3-8-black-metal/6-foot-pole/
img1 = loadImage('img/beam.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
noStroke();
image(img, 0,0);

  if (overRect(rx, ry, rw, rh)) {
    image(img1,0,0);
  } else {
    noFill();
  }
  rect(rx, ry, rw, rh);
}

function overRect(x, y, w, h) {
  if ((mouseX > x) && (mouseX < x + w) &&
    (mouseY > y) && (mouseY < y + h)) {
    return true;
  } else {
    return false;
  }
}