let size;
let locX;
let locY;
let isRaining = false;
let cSize = 0;


//Split Cloud
let split = false;
let s1x, s1y, s1size;
let s2x, s2y, s2size;
let s3x, s3y, s3size;

function setup() {
  let canvas= createCanvas(800, 500); 
  canvas.parent("p5-canvas-container");
}

function draw() {
  background("rgba(0,148,255,0.95)");

  let moveX = map(sin(frameCount * 0.005), -1, 1, -250, 250);
  let moveY = map(cos(frameCount * 0.001), -1, 1, -100, 100);

  locX = 400 + moveX;
  locY = 250 + moveY;

  let sinVal = map(sin(frameCount * 0.01), -1, 1, 150, 170);
  size = sinVal - cSize;

  if (isRaining) {
    drawRain();
    cSize += 0.07;
  } else {
    cSize -= 0.12;
  }

  if (size < 0) size = 0;

  drawCreature(locX, locY);

  // Thunder
  if (size > 345) {
    drawThunder();
  }

  // Split
  if (size > 370 && split == false) {

    split = true;

    s1x = locX - 60;
    s1y = locY;
    s1size = 110;

    s2x = locX + 60;
    s2y = locY - 30;
    s2size = 120;

    s3x = locX;
    s3y = locY + 40;
    s3size = 115;

    size = 150; // shrink main cloud
    cSize = 0;
  }

  // Small clouds
  if (split) {

    drawCreatureSmall(s1x, s1y, s1size);
    drawCreatureSmall(s2x, s2y, s2size);
    drawCreatureSmall(s3x, s3y, s3size);

    s1size -= 0.3;
    s2size -= 0.3;
    s3size -= 0.3;

    if (s1size <= 0) {
      split = false;
    }
  }
}

function drawCreature(x, y) {
  push();
  translate(x, y);
  rotate(sin(frameCount * 0.009) * 0.2);
  drawBody();
  drawEyes();
  drawMouth();
  pop();
}

function drawBody() {

  if (size > 295) {
    fill(120);
  } else if (size < 60) {
    fill(150);
  } else {
    fill(255);
  }

  noStroke();

  ellipse(0, 0, size, size);
  ellipse(size * 0.5, size * 0.1, size * 0.8, size * 0.8);
  ellipse(-size * 0.5, size * 0.1, size * 0.8, size * 0.8);
  ellipse(size * 0.2, -size * 0.3, size * 0.7, size * 0.7);
  ellipse(-size * 0.2, -size * 0.3, size * 0.7, size * 0.7);
}

function drawEyes() {

  if (size > 315) {

    fill(0);
    ellipse(size * 0.18, size * -0.05, size * 0.22, size * 0.18);
    ellipse(size * -0.18, size * -0.05, size * 0.22, size * 0.18);

    stroke(0);
    strokeWeight(3);

    line(size * -0.3, size * -0.25,
         size * -0.05, size * -0.15);

    line(size * 0.3, size * -0.25,
         size * 0.05, size * -0.15);

  } else {

    fill(0);
    ellipse(size * 0.2, size * -0.1, size * 0.25);
    ellipse(size * -0.2, size * -0.1, size * 0.25);

    fill(255);
    ellipse(size * 0.15, size * -0.2, size * 0.08);
    ellipse(size * -0.15, size * -0.2, size * 0.08);
  }
}

function drawMouth() {
  stroke(0);
  strokeWeight(5);
  noFill();
  arc(0, size * 0.2, size * 0.4, size * 0.2, 0, PI);
}

function drawCreatureSmall(x, y, s) {
  push();
  translate(x, y);
  noStroke();
  fill(255);

  ellipse(0, 0, s, s);
  ellipse(s * 0.5, s * 0.1, s * 0.8, s * 0.8);
  ellipse(-s * 0.5, s * 0.1, s * 0.8, s * 0.8);

  pop();
}

function drawRain() {
  noStroke();
  fill("#63C0F1");

  for (let i = 0; i < 20; i++) {
    let rainX = random(locX - size, locX + size);
    let rainY = random(locY + size * 0.3, locY + size + 100);
    ellipse(rainX, rainY, 4, 10);
  }
}

function drawThunder() {
  fill("yellow");
  noStroke();

  beginShape();
  vertex(locX, locY + size * 0.5);
  vertex(locX + 15, locY + size * 0.9);
  vertex(locX - 5, locY + size * 0.9);
  vertex(locX + 10, locY + size * 1.4);
  endShape(CLOSE);
}

function mousePressed() {
  let d = dist(mouseX, mouseY, locX, locY);
  if (d < size) {
    isRaining = true;
  }
}

function mouseReleased() {
  isRaining = false;
}