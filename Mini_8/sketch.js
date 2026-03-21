let woozi= [];
let logos;
let change = 0;

function preload(){
  for (let i=1; i<=2; i++)
  woozi.push(loadImage("assets/woozi_" + i + ".jpg"));
}

function setup() {
  createCanvas(800, 800);

   eraseBg(woozi, 100);
   logos= crop(woozi, 0, 0, 500, 500);
}

function draw() {
  background(197,185,205);
  // imageMode(CENTER);
  image(logos[change], 0, 0, 500, 500);

  change = floor((frameCount/ 10) % 2)
}

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
}