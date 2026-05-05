let b;
let chars = [" ", ".", "-", "=", "+", "o", "%", "0", "$", "#", "@"];
let charsK = ["ㅂ", "ㅃ", "ㅈ", "ㅉ", "ㄷ", "ㄸ", "ㄱ", "ㄲ", "ㅅ", "ㅆ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅣ", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "ㅟ", "ㅢ", "ㅘ", "ㅝ", "ㅙ", "ㅙ", "ㄳ", "ㄵ", "ㄶ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅄ"];
let charsW = [" "];

let myInput;
let button;

let isActive = false;

let currentSound = null;
let mySoundsE = [];
let mySoundsM = [];
let mySoundsC = [];
let mySoundsK = [];

let textE = ["Language is fascinating.", "It shapes how we understand the world.", "Can we fully express thought?"];
let textM = ["语言很有意思。", "它影响我们理解世界的方式。", "我们能完全表达思想吗？"];
let textC = ["語言好神奇。", "佢影響我哋點樣理解世界。", "我哋真係可以完全表達思想嗎？"];


function preload() {
  mySoundsE[0] = loadSound('assets/E1.m4a');
  mySoundsE[1] = loadSound('assets/E2.m4a');
  mySoundsE[2] = loadSound('assets/E3.m4a');
  mySoundsE[3] = loadSound('assets/E4.m4a');
  mySoundsE[4] = loadSound('assets/E5.m4a');
  mySoundsM[0] = loadSound('assets/M1.m4a');
  mySoundsM[1] = loadSound('assets/M2.m4a');
  mySoundsM[2] = loadSound('assets/M3.m4a');
  mySoundsM[3] = loadSound('assets/M4.m4a');
  mySoundsM[4] = loadSound('assets/M5.m4a');
  mySoundsC[0] = loadSound('assets/C1.m4a');
  mySoundsC[1] = loadSound('assets/C2.m4a');
  mySoundsC[2] = loadSound('assets/C3.m4a');
  mySoundsC[3] = loadSound('assets/C4.m4a');
  mySoundsC[4] = loadSound('assets/C5.m4a');
  mySoundsK[0] = loadSound('assets/K.m4a');
}

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

function playSound(s) {
  if (currentSound && currentSound.isPlaying()) {
    currentSound.stop();
  }
  s.play();
  currentSound = s;
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

function mousePressed() {
  userStartAudio();
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

    //Sound
    this.lastPlayed = 0;
    this.floatingTexts = [];
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
  display3() {
    textAlign(CENTER);

    fill(0, 30);
    this.displayFloatingText();

    for (let i = -80; i <= 80; i += 10) {
      text(charsK[floor(random(charsK.length))], this.x + i + this.expandRight, this.yUK1 + random(-60, 20));
      text(charsK[floor(random(charsK.length))], this.x + i + this.expandLeft, this.yUK1 + random(-60, 20));
    }

    this.expandRight = this.expandRight - random(-2, 1);
    this.expandLeft = this.expandLeft + random(-2, 1);
  }
  initStage4() {
    this.particles = [];

    for (let i = 0; i < 80; i++) {

      let p = {};

      p.x = this.x + random(-200, 200);
      p.y = this.y + random(-200, 200);

      let angle = random(TWO_PI);

      p.targetX = this.x + cos(angle) * 100;
      p.targetY = this.y + sin(angle) * 100;

      p.char = random(charsK);

      p.soundType = floor(random(3));
      p.soundIndex = floor(random(3));
      p.lastPlayed = 0;

      this.particles.push(p);
    }

    this.floatingTexts = [];

    for (let i = 0; i < 25; i++) {
      let t = {};

      t.x = random(width);
      t.y = random(height);
      t.size = random(12, 28);
      t.alpha = random(20, 80);

      let lang = floor(random(3));
      t.lang = lang;

      if (lang === 0) t.text = random(textE);
      if (lang === 1) t.text = random(textM);
      if (lang === 2) t.text = random(textC);

      t.lastPlayed = 0;

      this.floatingTexts.push(t);
    }

  }
  displayFloatingText() {
    textAlign(CENTER);

    for (let t of this.floatingTexts) {

      fill(0, 40);
      text(t.text, t.x, t.y);

      let d = dist(mouseX, mouseY, t.x, t.y);
      let now = millis();

      if (d < 60 && now - t.lastPlayed > 800) {

        if (t.lang === 0) playSound(random(mySoundsE));
        if (t.lang === 1) playSound(random(mySoundsM));
        if (t.lang === 2) playSound(random(mySoundsC));

        t.lastPlayed = now;
      }
      if (d < 80) {
        fill(240, 100);
        ellipse(t.x, t.y, 20);
      }
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

    if (this.stageTimer > 600) {
      this.stage = 5;
      this.stageTimer = 0;
    }
  }
  display4() {
    textAlign(CENTER);

    fill(0, 15);
    this.displayFloatingText();

    fill(0, this.stage4Fade);

    for (let p of this.particles) {
      fill(0, 120);
      text(p.char, p.x, p.y);

      fill(0, 50);
      text(p.char, p.x + random(-2, 2), p.y + random(-2, 2));

      let d = dist(mouseX, mouseY, p.x, p.y);
      let now = millis();

      if (d < 80 && now - p.lastPlayed > 800) {
        p.lastPlayed = now;
      }
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