let 啵;
let song;
let amplitude;
let mic;

function preload(){
  啵= loadSound("assets/啵.mp3")
  song= loadSound("assets/song.mp3")
}


function setup() {
  createCanvas(400, 400);
  amplitude= new p5.Amplitude();
  mic= new p5.AudioIn();
  // mic.start();
}

function draw() {
  background(220);
let level= mic.getLevel();

console.log(level);

let dia= map(level, 0.0, 0.5, 40, 200)

noStroke();
fill(247,202,201);
circle(200, 200, dia);



// let vol= map(mouseX, 0, width, 0.0, 1.0);
// song.setVolume(vol);

// let panVol= map(mouseX, 0, width, -1.0, 1.0);
// song.pan(panVol)

// let rateVal= map(mouseX, 0, width, 0.5, 2.0);
// song.rate(rateVal);
// }

// function mousePressed(){
//   if(!song.isPlaying()){
//   song.loop();
// }
}

//sound.play()
//sound.pause()
//sound.loop()
//sound.stop()