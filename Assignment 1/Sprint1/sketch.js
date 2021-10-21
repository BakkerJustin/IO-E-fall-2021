// This includes the example code from class along with my own experimentation and input from my peers

/* 
August 2019 - Doug Whitton 
play 3 analog sensors that output sound and circle graphic
The Arduino file that's running is "threeSensorExample"
*/

let playing = false;
let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let input = 0, input1 = 0, input2 = 0;

// Setup for the songs and images

let song;
let song1;
let song2;

let img;
let img1;
let img2;
let img3;

function setup() {
  
  createCanvas(windowWidth, windowHeight);

///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
///////////////////////////////////////////////////////////////////    
    

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
  console.log("serial.list()   ", serial.list());

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/tty.usbmodem141401");
 /////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////
  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);

  // Insert audio files
  song = createAudio('assets/assets_sounds_confetti.mp3');
  song1 = createAudio('assets/assets_sounds_moon.mp3');
  song2 = createAudio('assets/assets_sounds_squiggle.mp3');
 
}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////


// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}



// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  input = splitter[0];                 //put the first sensor's data into a variable
  input1 = splitter[1];
  input2 = splitter[2]; 



}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device


// Load the images
function preload() {
  // https://www.pngegg.com/en/png-fbqit/download
  img = loadImage('assets/smile.png');
  // https://toppng.com/confetti-PNG-free-PNG-Images_42511
  img1 = loadImage('assets/confetti.png');
  // https://toppng.com/moon-PNG-free-PNG-Images_25446
  img2 = loadImage('assets/moon.png');
  // https://www.pinpng.com/download/iRwxihh_squiggle-png-transparent-png-squiggle-png-download/
  img3 = loadImage('assets/squiggle.png');
}

// Set up the background as white with a smiley face

function draw() {
  if (input == 0){
  background(255, 255 ,255);
  image(img, 0, 0);
}

// Set up each of the functions and their corresponding background colour

if (input == 1){
  background(0, 0, 0);
  playConfetti();
} 
if (input1 > 50){
  background(0, 0, 100);
  playMoon();
}
if (input2 > 50){
  background(150, 75, 100);
  playSquiggle();

};

// This function calls the confetti song and corresponding image on a button press

function playConfetti(){
  if (input == 1){
  song.play();
  image(img1, 0, 0);
}

// This tells the song to stop when the button is released

  if (input == 0) {
    song.stop();
  }
};

// This function calls the moon song and corresponding image when the potentiometer exceeds the threshold

function playMoon(){
  if (input1 > 50){
    song1.play();
    image(img2, 0, 0);
  }

// This tells the song to stop when the potentiometer is below the threshold

  if (input1 < 50){
    song1.stop();
  }
};

// This function calls the squggle song and corresponding image when the light sensor exceeds the threshold

function playSquiggle(){
  if (input2 > 50){
    song2.play();
    image(img3, 0, 0);  
  }

// This tells the song to stop when the light sensor is below the threshold

  if (input2 < 50){
    song2.stop();
  }
};

}

  


  

 