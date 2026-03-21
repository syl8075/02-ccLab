let backTrack;
let img;
let x= [];
let y= [];
let sounds= [];

function preload(){
  // backTrack= loadSound("assets/my-sounds/00.mp3")
  for (let i=1; i<8; i++){
    sounds.push(loadSound("assets/my-sounds/0" +i + ".mp3"))
  }
  img= loadImage("assets/images/asterisk.png")
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  // backTrack.loop();
}

function draw() {
  background(197,185,205);
  for(let i=0; i<x.length; i++){

    drawCircle(x[i], y[i]);
  }
}

function drawCircle(x, y){
  tint(146,168,209);
  image(img, x, y);
  noStroke();
  fill(247,202,201);
  circle(x, y, 20);

  //Filters!!!
  //Blur
  filter(BLUR, 0.1);
  //Threshold
  // filter(THRESHOLD, 0.1);
}

function mousePressed(){
  x.push(mouseX);
  y.push(mouseY);
  
   
let index= (x.length- 1)% sounds.length
  // let index= floor(map(mouseY, 0, height, 0, sounds[index].play));
 sounds[index].play();

  console.log (index);
}