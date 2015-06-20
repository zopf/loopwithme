function setup() {
    createCanvas(myWidth, myHeight);
    background(bg);
    fill(0);
    strokeWeight(0);
    player = new Entity(width/20, myHeight/2, 10, 10);
    player.color = yellow;
}

function draw() {
    // Simple test of rendering.
    ellipse(50, 50, 80, 80);
}
