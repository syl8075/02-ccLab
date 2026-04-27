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
      text(chars[floor(random(chars.length))], this.x + i, this.yU + random(-50, 0));
    }
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






//


// if (frameCount % 1 == 0) {
//       text(chars[floor(random(chars.length))], 340, this.yU - 10);
//       text(chars[floor(random(chars.length))], 350, this.yU);
//       text(chars[floor(random(chars.length))], 365, this.yU - 69);
//       text(chars[floor(random(chars.length))], 370, this.yU);
//       text(chars[floor(random(chars.length))], 375, this.yU - 50);
//       text(chars[floor(random(chars.length))], this.x, this.yU);
//       text(chars[floor(random(chars.length))], 385, this.yU - 92);
//       text(chars[floor(random(chars.length))], 395, this.yU);
//       text(chars[floor(random(chars.length))], 400, this.yU - 134);
//       text(chars[floor(random(chars.length))], 405, this.yU - 55);
//       text(chars[floor(random(chars.length))], 410, this.yU - 23);
//       text(chars[floor(random(chars.length))], 415, this.yU);
//       text(chars[floor(random(chars.length))], 420, this.yU - 35);
//       text(chars[floor(random(chars.length))], 425, this.yU - 144);
//       text(chars[floor(random(chars.length))], 430, this.yU - 28);
//       text(chars[floor(random(chars.length))], 445, this.yU - 299);
//       text(chars[floor(random(chars.length))], 450, this.yU - 63);
//       text(chars[floor(random(chars.length))], 460, this.yU - 52);
//     }
//     if (frameCount % 3 == 0) {
//       text(chars[floor(random(chars.length))], 345, this.yU1 - 437);
//       text(chars[floor(random(chars.length))], 365, this.yU1 - 369);
//       text(chars[floor(random(chars.length))], 390, this.yU1 - 188);
//       text(chars[floor(random(chars.length))], 455, this.yU1 - 699);
//       text(chars[floor(random(chars.length))], 350, this.yU1 - 100);
//       text(chars[floor(random(chars.length))], 365, this.yU1 - 369);
//       text(chars[floor(random(chars.length))], 370, this.yU1 - 381);
//       text(chars[floor(random(chars.length))], 375, this.yU1 - 450);
//       text(chars[floor(random(chars.length))], this.x, this.yU1 - 202);
//     }

//     if (frameCount % 5 == 0) {
//       text(chars[floor(random(chars.length))], 355, this.yU2 - 1);
//       text(chars[floor(random(chars.length))], 360, this.yU2 - 193);
//       text(chars[floor(random(chars.length))], 435, this.yU2);
//       text(chars[floor(random(chars.length))], 440, this.yU2 - 58);
//       text(chars[floor(random(chars.length))], 420, this.yU2 - 35);
//       text(chars[floor(random(chars.length))], 425, this.yU2 - 44);
//     }



//     text(charsK[floor(random(charsK.length))], 450, this.yUK1);



// display2() {

//     if (frameCount % 1 == 0) {
//       text(charsK[floor(random(charsK.length))], 340, this.yUK1 + 10);
//       text(charsK[floor(random(charsK.length))], 350, this.yUK1);
//       text(charsK[floor(random(charsK.length))], 365, this.yUK1 + 69);
//       text(charsK[floor(random(charsK.length))], 370, this.yUK1);
//       text(charsK[floor(random(charsK.length))], 375, this.yUK1 + 50);
//       text(charsK[floor(random(charsK.length))], this.x, this.yUK1);
//       text(charsK[floor(random(charsK.length))], 385, this.yUK1 + 92);
//       text(charsK[floor(random(charsK.length))], 395, this.yUK1);
//       text(charsK[floor(random(charsK.length))], 400, this.yUK1 + 134);
//       text(charsK[floor(random(charsK.length))], 405, this.yUK1 + 55);
//       text(charsK[floor(random(charsK.length))], 410, this.yUK1 + 23);
//       text(charsK[floor(random(charsK.length))], 415, this.yUK1);
//       text(charsK[floor(random(charsK.length))], 420, this.yUK1 + 35);
//       text(charsK[floor(random(charsK.length))], 445, this.yUK1 + 299);
//       text(charsK[floor(random(charsK.length))], 450, this.yUK1 + 63);
//       text(charsK[floor(random(charsK.length))], 460, this.yUK1 + 52);
//     }
//     if (frameCount % 3 == 0) {
//       text(charsK[floor(random(charsK.length))], 345, this.yUK1 + 37);
//       text(charsK[floor(random(charsK.length))], 365, this.yUK1 + 69);
//       text(charsK[floor(random(charsK.length))], 390, this.yUK1 + 188);
//       text(charsK[floor(random(charsK.length))], 455, this.yUK1 + 9);
//       text(charsK[floor(random(charsK.length))], 350, this.yUK1);
//       text(charsK[floor(random(charsK.length))], 365, this.yUK1 + 69);
//       text(charsK[floor(random(charsK.length))], 370, this.yUK1);
//       text(charsK[floor(random(charsK.length))], 375, this.yUK1 + 50);
//       text(charsK[floor(random(charsK.length))], this.x, this.yUK1);
//     }

//     if (frameCount % 5 == 0) {
//       text(charsK[floor(random(charsK.length))], 355, this.yUv + 1);
//       text(charsK[floor(random(charsK.length))], 360, this.yUK1 + 193);
//       text(charsK[floor(random(charsK.length))], 435, this.yUK1);
//       text(charsK[floor(random(charsK.length))], 440, this.yUK1 + 58);
//       text(charsK[floor(random(charsK.length))], 420, this.yUK1 + 35);
//       text(charsK[floor(random(charsK.length))], 425, this.yUK1 + 44);
//       text(charsK[floor(random(charsK.length))], 425, this.yUK1 + 144);
//       text(charsK[floor(random(charsK.length))], 430, this.yUK1 + 28);
//     }







// update() {
//     // move

//     this.yU += this.speedY;
//     this.yU1 += this.speedY;
//     this.yU2 += this.speedY;
//     this.yUK1 -= this.speedY;

//     // reset positions
//     if (this.yU > 250) {
//       this.yU = 0;
//     }

//     if (this.yU1 > 250) {
//       this.yU1 = 0;
//     }

//     if (this.yU2 > 250) {
//       this.yU2 = 0;
//     }

//     if (this.yUK1 < 250) {
//       this.yUK1 = height;
//     }
//   }