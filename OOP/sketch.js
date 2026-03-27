let myBalls1, myBalls2;

function setup() {
  createCanvas(400, 400);
  myBalls= new Balls();
}

function draw() {
  background(197,185,205);

  myBalls1.display(200, 200);
  myBalls1.move();

  myBalls2.display(100, 100);
}

class Balls{
  constructor(startX, startY){
    this.x= startX;
    this.y= startY;
    this.dia= 50;
  }
  move(){
    this.offset= frameCount* 0.1
    this.x = cos(this.offset)* 10+ 200;
    this.y = sin(this.offset)* 10+ 200;
  }
  display(){
    fill(247,202,201);
    noStroke();
    circle(this.x, this.y, this.dia);
    fill(146,168,209)
    circle(this.x+ 100, this.y+ 100, this.dia)
  }
}
