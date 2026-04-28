let b;
let chars = [" ", ".", "-", "=", "+", "o", "%", "0", "$", "#", "@"];
let charsK = ["ㅂ", "ㅃ", "ㅈ", "ㅉ", "ㄷ", "ㄸ", "ㄱ", "ㄲ", "ㅅ", "ㅆ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅣ", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "ㅟ", "ㅢ", "ㅘ", "ㅝ", "ㅙ", "ㅙ", "ㄳ", "ㄵ", "ㄶ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅄ"];
let charsW = [" "];

let myInput;
let button;

let isActive = false;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  b = new textBox(380, 250);

  myInput = createInput();
  myInput.position(360, 610);

  button = createButton('ENTER');
  button.position(490, 610);
  button.mousePressed(startAnimation);

  frameRate(30)
}


function draw() {
  background(220, 10);


  if (isActive) {
    b.activate();
  } else {
    textAlign(CENTER);
    text("Type something and press ENTER", width / 2, height / 2);
  }
}


function keyPressed() {
  if (keyCode === ENTER) {
    startAnimation();
  }

  if (keyCode === ' ') {
    b.triggerStage3();
  }
}

function startAnimation() {
  isActive = true;
  b.display0();
}

class textBox {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    this.yU = 250;
    this.yUK1 = 0;

    this.speedY = random(1, 3);
    this.stage = 0;
    this.textFade = 0;

    this.expandLeft = .5;
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

      if (this.yUK1 > this.y) {
        this.yUK1 = this.y;
        text("Try pressing space", this.x, this.y + 300);
      }
    }
    else if (this.stage === 3) {
      this.update3();
      this.display3();
    }
  }
  update1() {
    this.yU -= this.speedY;
  }
  display1() {
    textAlign(CENTER);
    fill(0);
    text(myInput.value(), this.x, this.y);

    for (let i = -40; i <= 40; i += 10) {
      fill(0);
      text(chars[floor(random(chars.length))], this.x + i + this.expandLeft, this.yU + random(-50, 0));
    }

    this.expandLeft = this.expandLeft - random(-2, 1);
  }
  update2() {
    this.yUK1 += this.speedY;
  }

  display2() {
    textAlign(CENTER);

    for (let i = -40; i <= 40; i += 10) {
      fill(0);
      text(
        charsK[floor(random(charsK.length))],
        this.x + i,
        this.yUK1 + random(-50, 0)
      );
    }
  } triggerStage3() {
    if (this.stage === 2) {
      this.stage = 3;
    }
  }
  update3() {
    this.yUK1 += this.speedY * 2; // faster fall
  }
  display3() {
    textAlign(CENTER);

    for (let i = -80; i <= 80; i += 10) {
      text(
        charsK[floor(random(charsK.length))],
        this.x + i,
        this.yUK1 + random(-100, 100)
      );
    }
  }
}



// display1() {
//     textAlign(CENTER);
//     fill(0);
//     text(myInput.value(), this.x, this.y);

//     for (let i = -40; i <= 40; i += 10) {
//       fill(0);
//       text(chars[floor(random(chars.length))], this.x + i, this.yU + random(-50, 0));
//     }
//   }