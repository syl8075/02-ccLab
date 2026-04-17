let b;
let chars = [" ", ".", "-", "=", "+", "o", "%", "0", "$", "#", "@"];
let charsK = ["ㅂ", "ㅃ", "ㅈ", "ㅉ", "ㄷ", "ㄸ", "ㄱ", "ㄲ", "ㅅ", "ㅆ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅣ", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "ㅟ", "ㅢ", "ㅘ", "ㅝ"];


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  b = new textBox(400, 250);
}


function draw() {
  background(220);

  b.display();
  b.update();

}

class textBox {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.yU = 250;
    this.yU1 = 750;
    this.spd = 1;
    this.speedY = floor(random(-1, -3))
  }
  display() {
    text("fhuaifhudjshf", this.x, this.y)
    text(chars[floor(random(0, 10))], this.x, this.yU);
    text(charsK[floor(random(0, 36))], 450, this.yU1);
  }

  update() {
    this.yU1 = this.yU1 - this.speedY;
    if (this.yU <= 500) {
      this.yU = this.yU + this.speedY;
    }
    if (this.yU1 >= 250) {
      this.yU1 = 0;
    }
    console.log(this.yU1)
  }
}