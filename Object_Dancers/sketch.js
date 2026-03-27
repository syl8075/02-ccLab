/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new SavannaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class SavannaDancer {
  constructor(startX, startY) {
    this.x= startX;
    this.y= startY;
    // add properties for your dancer here:
    //head
    this.headW= 108;
    this.headH= 108;
    //eyes
    this.eyeW= 10;
    this.eyeY= 30;
    this.eyeH= 20;
    this.eyeX= 30;
      //mouth
    this.mouthW= 20;
    this.mouthH= 9;
    this.mouthY= 55;
    //cheek
    this.cheekW= 20;
    this.cheekH= 10;
    this.cheekY= 50;
    //update
    this.bounce= 0;
    this.blink;
    this.shake;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.bounce= sin(frameCount* 0.08)* 10;
    let blinkSpeed = let sinVal = map(sin(frameCount * 0.07), -1, 1, 0, 20);

  if (blinkSpeed > 0.95) {
    this.blink = 2;
    } else {
    this.blink = this.eyeH;
    }
    this.shake= sin(frameCount* 0.05)* 0.5;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y+ this.bounce);
    rotate(this.shake);
    // ******** //
    // ⬇️ draw your dancer from here ⬇️

  //Frog head
  fill(144, 238, 144);
  noStroke();
  ellipse(0, 0, 180, 138);

  circle(-72, -56, 57);
  circle(72, -56, 57);

  fill(0);
  stroke(0);
  strokeWeight(5);
  fill(144, 238, 144);
  arc(0, -48, 20, 9, 2* PI, PI);

  fill(0);
  noStroke();
  circle(-72, -52, 30);
  circle(72, -52, 30);

  fill(200);
  circle(-72, -58, 10);
  circle(70, -58, 10);

  //Savana's Head
  noStroke()
  fill(240, 211, 192);
  ellipse(0, 16, this.headW, this.headH);

  //Savanna's Hair
  fill(0);
  arc(0, -10, 99, 60 , 159.9, PI / 10.5); 
  arc(43, 20, 25, 80, 29.5, PI / 2);
  arc(-43, 20, 25, 80, PI/2, 30.25);
  arc(0, -10, 99, 60 , 159.9, PI / 10.5); 

  //Savanna's Eyes
  stroke(0);
  strokeWeight(3);
  ellipse(-this.eyeX, this.eyeY, this.eyeW, this.blink);
  ellipse(this.eyeX, this.eyeY, this.eyeW, this.blink);

  //Savanna's Mouth
  fill(245, 116, 124);
  noStroke();
  strokeWeight(1);
  ellipse(0, this.mouthY, this.mouthW, this.mouthH);

  fill(255, 177, 182);
  noStroke();
  ellipse(0, 59, 10, 2);

  //Savanna's cheek
  noStroke();
  fill(255, 217, 236);
  ellipse(-this.eyeXOffset, this.cheekY, this.cheekW, this.cheekH);
  ellipse(this.eyeXOffset, this.cheekY, this.cheekW, this.cheekH);

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    // this.drawReferenceShapes();

    pop();
  }
  // drawReferenceShapes() {
  //   noFill();
  //   stroke(255, 0, 0);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/