let size = 150;
let locX;
let locY;
let isRaining = false;
let cSize = 0;
let growAmount = 0;
let split = false;
let s1x, s1y, s1size;
let s2x, s2y, s2size;
let s3x, s3y, s3size;

function setup() {
  let canvas= createCanvas(800, 500); 
  canvas.parent("p5-canvas-container");

  locX = width / 2;
  locY = height / 2;
}

function draw() {
  drawBackground();
  drawSun();
  updateCloud();
  checkMouseEffect();

  drawCreature(locX, locY);

  if (isRaining) {
    drawRain();
  }

  if (size > 345) {
    drawThunder();
  }

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

  size = 150;
  cSize = 0;
}

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

function drawBackground() {
  if (size < 280) {
    background(135, 206, 235);
  } else if (size < 330) {
    background(100, 160, 200);
  } else {
    background(60, 90, 130);
  }
  if (size > 345 && frameCount % 10 < 3) {
    background(200, 200, 255);
  }
}

function updateCloud() {
  let moveX = map(sin(frameCount * 0.005), -1, 1, -250, 250);
  let moveY = map(cos(frameCount * 0.001), -1, 1, -100, 100);

  locX = 400 + moveX;
  locY = 250 + moveY;

  let sinVal = map(sin(frameCount * 0.01), -1, 1, 150, 170);
  size = sinVal - cSize + growAmount;
  growAmount *= 0.9;

  if (isRaining) {
    cSize += 0.07;
  } else {
    cSize -= 0.12;
  }

  if (size < 0) {
    size = 0;
  }
}

function checkMouseEffect() {
  let d = dist(mouseX, mouseY, locX, locY);

  if (d < size) {
    growAmount += 3;
  }
}

function drawSun() {
  let sunX = sin(frameCount * 0.005) * 400;
  let sunY = cos(frameCount * 0.005) * 400;

  let sunSize = 150 + random(-3, 3);

  push();
  translate(400, 400);

  noStroke();
  fill(255, 158, 16);

  circle(sunX, sunY, sunSize);

  pop();
}

function drawCreature(x, y) {
  push();

  translate(x, y);
  rotate(sin(frameCount * 0.009) * 0.2);

  drawBody();
  drawEyes();
  drawMouth();
  drawBlush();

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
  let eyeMoveX = map(mouseX, 0, width, -size * 0.05, size * 0.05);
  let eyeMoveY = map(mouseY, 0, height, -size * 0.05, size * 0.05);

  fill(0);
  ellipse(size * 0.2, size * -0.1, size * 0.25);
  ellipse(size * -0.2, size * -0.1, size * 0.25);

  fill(255);
  ellipse(size * 0.15 + eyeMoveX, size * -0.2 + eyeMoveY, size * 0.08);
  ellipse(size * -0.15 + eyeMoveX, size * -0.2 + eyeMoveY, size * 0.08);

  // angry eyebrows when thunder
  if (size > 345) {
    stroke(0);
    strokeWeight(4);

    line(size * -0.3, size * -0.3, size * -0.05, size * -0.15);

    line(size * 0.3, size * -0.3, size * 0.05, size * -0.15);
  }
}

function drawMouth() {
  stroke(0);
  strokeWeight(5);
  noFill();

  // angry when thunder
  if (size > 345) {
    arc(0, size * 0.3, size * 0.4, size * 0.2, PI, TWO_PI);
  }

  // sad when raining
  else if (isRaining) {
    arc(0, size * 0.3, size * 0.4, size * 0.2, PI, TWO_PI);
  }

  // normal happy
  else {
    arc(0, size * 0.2, size * 0.4, size * 0.2, 0, PI);
  }
}

function drawBlush() {
  let d = dist(mouseX, mouseY, locX, locY);

  // no blush if angry
  if (d < size && size < 345) {
    noStroke();
    fill(255, 150, 150, 150);

    ellipse(size * 0.35, size * 0.05, size * 0.18);
    ellipse(-size * 0.35, size * 0.05, size * 0.18);
  }
}

function drawRain() {
  noStroke();
  fill("#63C0F1");

  for (let i = 0; i < 20; i++) {
    let rainX = random(locX - size, locX + size);
    let rainY = random(locY + size * 0.3, locY + size + 300);

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