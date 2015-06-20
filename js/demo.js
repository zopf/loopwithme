var
width = 800,
height = width - 200,
bg = 0,
myHeight = height,
myWidth = width,
myHeight = 400;

function setup() {
    createCanvas(myWidth, myHeight);
    background(bg);
    fill(0);
    strokeWeight(0);
}

function draw() {
    // Simple test of rendering.
    ellipse(50, 50, 80, 80);
}
