// The original code comes from here https://editor.p5js.org/genekogan/sketches/Hk2Q4Sqe4
// I learned how to change the oscillator tyoe here https://p5js.org/reference/#/p5.Oscillator
// This is how I figured out to invert the video colours https://editor.p5js.org/dhhepting/sketches/_McmcH31k
// Changed the oscillator type to a square oscillator, cranked up the reverb and lowered the amplitude. 
// Took the skeleton off and left the key points. Then enlarged and skewed the points to ovals.

let video;
let poseNet;
let poses = [];
let skeletons = [];

let keypoints = [];
let prevkeypoints = [];
let osc, reverb;

let notes = [ 60];
let playing = [ false, false, false, false, false, false, false]


function setup() {
  createCanvas(720, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  video.hide();

  // audio 
  osc = new p5.SqrOsc();
  osc.start();
  osc.amp(0);
  reverb = new p5.Reverb();
  reverb.process(osc, 20, 2);
  reverb.amp(2);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
  filter('INVERT');
  drawKeypoints();
  drawSkeleton();


    
}

function drawKeypoints()  {
  if (poses.length == 0) {
    return;
  }

  prevkeypoints = keypoints;
  keypoints = poses[0].pose.keypoints;

  if (prevkeypoints.length == 0) {
    return;
  }
  
  for (let k=0; k<keypoints.length; k++) {
    let k1 = prevkeypoints[k];
    let k2 = keypoints[k];

    fill(0, 255, 0);
    ellipse(k2.position.x, k2.position.y, 50, 25);

    let d = dist(k1.position.x, k1.position.y, k2.position.x, k2.position.y);
    if (d < 25) {
      continue;
    }

    let n = floor(map(k2.position.x, 0, width, 0, notes.length));
    let l = floor(map(k2.position.y, height, 0, 0, 20, 600));
        
    if (!playing[n]) {
      playNote(n, 200);
    }

    // strokeWeight(3);
    // stroke(255, 0, 0);
    // line(k1.position.x, k1.position.y, k2.position.x, k2.position.y);
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      // stroke(255, 0, 0);
      // line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}


function playNote(n, duration) {
  var note = notes[n];
  var r = random();
  if (r < 0.25) {
    note += 12;
  } 
  else if (r < 0.4) {
    note -= 12;
  }
  osc.freq(midiToFreq(note));
  playing[n] = true;
  osc.fade(0.5,0.2);
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
      playing[n] = false;
    }, 
    duration-50);
  }
}

function gotPoses(results) {
  poses = results;
}
