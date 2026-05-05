let b;
let chars = [" ", ".", "-", "=", "+", "o", "%", "0", "$", "#", "@"];
let charsK = ["ㅂ", "ㅃ", "ㅈ", "ㅉ", "ㄷ", "ㄸ", "ㄱ", "ㄲ", "ㅅ", "ㅆ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅣ", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "ㅟ", "ㅢ", "ㅘ", "ㅝ", "ㅙ", "ㅙ", "ㄳ", "ㄵ", "ㄶ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅄ"];
let charsW = [" "];

let myInput;
let button;

let isActive = false;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  b = new textBox(width / 2, height / 2);

  myInput = createInput();
  myInput.size(200);

  button = createButton('ENTER');
  button.mousePressed(startAnimation);
  button.size(80);

  frameRate(30)
}


function draw() {
  background(220, 10);

  let totalWidth = 200 + 10 + 80;
  let startX = width / 2 - totalWidth / 2;

  myInput.position(startX, height / 2 + 200);
  button.position(startX + 200 + 10, height / 2 + 200);

  if (isActive === false) {
    textAlign(CENTER);

    fill(0);
    text(myInput.value(), width / 2, height / 2);
  } else {
    b.activate();
  }
}


function keyPressed() {
  if (keyCode === ENTER) {
    startAnimation();
  }

  if (key === " ") {
    if (b.stage === 2) {
      b.stage = 3;
      b.yUK1 = b.y;
      b.expandRight = 0;
      b.expandLeft = 0;
    }

  }
}

function startAnimation() {
  isActive = true;
  b.display0();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class textBox {
  constructor(startX, startY) {
    //Part one
    this.x = startX;
    this.y = startY;

    this.yU = 250;
    this.yUK = 0;
    this.yUKP = 250;
    this.yUK1 = 250;

    this.speedY = random(1, 3);
    this.stage = 0;
    this.textFade = 10;

    //Part 2
    this.expandRight = 0;
    this.expandLeft = 0;

    this.spreadRight = 0;
    this.spreadLeft = 0;

    //Part 3
    this.targetSpread = 60;
    this.easing = 0.08;

    this.particles = [];
    this.centerX = this.x;
    this.centerY = this.y;
    this.radius = 120;

    this.stage4Fade = 0;
    this.transitionPause = 0;

    //Part 4
    this.final = 0;
    this.gatherStarted = false;

    this.stageTimer = 0;

    //Part 5
    this.splitText = ["ㅁ", "ㅜ", "ㅇ", "ㅓ", "ㅅ", " ", "ㅇ", "ㅣ", "ㄹ", "ㄲ", "ㅏ", "ㅇ", "ㅛ"];
    this.breakApart = false;
    this.splitX = [];
    this.splitY = [];
    this.splitSpeed = [];
  }
  displayGlitch() {
    let txt = myInput.value();
    let result = "";

    for (let i = 0; i < txt.length; i++) {
      if (random() < 0.1) {
        result += chars[floor(random(chars.length))];
      } else {
        result += txt[i];
      }
    }

    text(result, this.x, this.y);
  }
  display0() {

    fill(200, this.textFade);
    text("What do you want to say", this.x - 40, this.y);

    this.stage = 1;
    this.yU = this.y;
    this.yUK1 = 0;
  }
  activate() {
    if (this.stage === 1) {
      this.update1();
      this.display1();

      if (this.yU < 0) {
        this.stage = 2;
      }
    }
    else if (this.stage === 2) {
      this.update2();
      this.display2();

      if (this.yUK >= this.y) {
        this.yUK = this.y;
      }
    }
    else if (this.stage === 3) {
      this.update3();
      this.display3();

      if (this.expandRight > 150) {
        this.transitionPause++;

        if (this.transitionPause > 30) {
          this.stage = 4;
          this.transitionPause = 0;
        }
      }
    }
    else if (this.stage === 4) {
      if (!this.gatherStarted) {
        this.initStage4();
        this.gatherStarted = true;
      }
      this.update4();
      this.display4();
    }
    else if (this.stage === 5) {
      this.update5();
      this.display5();
    }
  }
  update1() {
    this.yU -= this.speedY;
  }
  display1() {
    textAlign(CENTER);
    fill(0);
    this.displayGlitch();

    for (let i = -30; i <= 30; i += 15) {
      fill(0);
      text(chars[floor(random(chars.length))], this.x + i + this.spreadRight, this.yU + random(-50, 0));
      text(chars[floor(random(chars.length))], this.x + i + this.spreadLeft, this.yU + random(-50, 0));
    }

    this.spreadRight += (20 - this.spreadRight) * 0.2;
    this.spreadLeft += (-20 - this.spreadLeft) * 0.2;
  }
  update2() {
    this.yUK += this.speedY;
  }
  display2() {
    textAlign(CENTER);

    fill(0, 50);
    text(myInput.value(), this.x, this.y);

    if (this.yUK >= 200) {
      this.spreadRight += (this.targetSpread - this.spreadRight) * this.easing;
      this.spreadLeft += (-this.targetSpread - this.spreadLeft) * this.easing;
    }
    fill(0, 160);
    for (let i = -20; i <= 20; i += 10) {
      text(
        charsK[floor(random(charsK.length))],
        this.x + i,
        this.yUK + random(-5, 5)
      );
    }
    fill(0, 120);
    for (let i = -30; i <= 30; i += 15) {
      text(
        charsK[floor(random(charsK.length))],
        this.x + i + this.spreadRight * 0.5,
        this.yUK + random(-10, 10)
      );

      text(
        charsK[floor(random(charsK.length))],
        this.x + i + this.spreadLeft * 0.5,
        this.yUK + random(-10, 10)
      );
    }
    fill(0, 80);
    for (let i = -30; i <= 30; i += 15) {
      text(
        charsK[floor(random(charsK.length))],
        this.x + i + this.spreadRight,
        this.yUK + random(-15, 15)
      );

      text(
        charsK[floor(random(charsK.length))],
        this.x + i + this.spreadLeft,
        this.yUK + random(-15, 15)
      );
    }
    if (this.yUK >= this.y) {
      fill(0, 150);
      text("Press SPACE", this.x, this.y + 300);
    }
  }
  update3() {
    this.expandRight += 2;
    this.expandLeft -= 2;
  }
  display3() {// also not workiing try to fix it
    textAlign(CENTER);

    for (let i = -80; i <= 80; i += 10) {
      text(charsK[floor(random(charsK.length))], this.x + i + this.expandRight, this.yUK1 + random(-60, 20));
      text(charsK[floor(random(charsK.length))], this.x + i + this.expandLeft, this.yUK1 + random(-60, 20));
    }

    this.expandRight = this.expandRight - random(-2, 1);
    this.expandLeft = this.expandLeft + random(-2, 1);
  } initStage4() {
    this.particles = [];

    for (let i = 0; i < 80; i++) {

      let p = {};

      p.x = this.x + random(-200, 200);
      p.y = this.y + random(-200, 200);

      let angle = random(TWO_PI);

      p.targetX = this.x + cos(angle) * 100;
      p.targetY = this.y + sin(angle) * 100;

      p.char = random(charsK);

      this.particles.push(p);
    }
  }
  update4() {
    this.stage4Fade += 5;
    for (let i = 0; i < this.particles.length; i++) {

      let currentX = this.particles[i].x;
      let targetX = this.particles[i].targetX;

      let currentY = this.particles[i].y;
      let targetY = this.particles[i].targetY;

      this.particles[i].x = currentX + (targetX - currentX) * 0.05;
      this.particles[i].y = currentY + (targetY - currentY) * 0.05;
    }
    this.stageTimer++;

    if (this.stageTimer > 180) {
      this.stage = 5;
      this.stageTimer = 0;
    }
  }
  display4() {
    textAlign(CENTER);
    fill(0, this.stage4Fade);

    for (let p of this.particles) {
      fill(0, 120);
      text(p.char, p.x, p.y);

      fill(0, 50);
      text(p.char, p.x + random(-2, 2), p.y + random(-2, 2));
    }
  }
  update5() {
    this.final += 2;
    this.stageTimer++;

    if (this.stageTimer > 180 && !this.breakApart) {
      this.breakApart = true;

      this.final = 255;

      for (let i = 0; i < this.splitText.length; i++) {
        this.splitX[i] = this.x + i * 22 - 140;
        this.splitY[i] = this.y;
        this.splitSpeed[i] = random(1, 3);
      }
    }

    if (this.breakApart) {
      for (let i = 0; i < this.splitText.length; i++) {
        this.splitY[i] += this.splitSpeed[i];
        this.splitSpeed[i] += 0.1;
      }
    }
  }
  display5() {
    background(220, 40);
    textAlign(CENTER);

    textSize(24 + sin(frameCount * 0.05) * 2);

    fill(0, this.final);


    if (!this.breakApart) {
      text("무엇일까요?", this.x, this.y);
    }

    else {
      for (let i = 0; i < this.splitText.length; i++) {
        text(this.splitText[i], this.splitX[i], this.splitY[i]);
      }
    }
  }
} 