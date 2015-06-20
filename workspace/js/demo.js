var img,
board,
cells;

function setup() {
    //     canvas = createCanvas(400, 400);
    //     img = createImg("http://th07.deviantart.net/fs70/PRE/i/2011/260/3/5/dash_hooray_by_rainbowcrab-d49xk0d.png");
    //
    //     img.position(190, 50);
    //     img.size(200, AUTO);
    //
    //     canvas.position(300, 50);
    //     // Attach listeners for mouse events related to canvas
    //     canvas.mouseOver(uniHide);
    //     canvas.mouseOut(uniShow);
}

function draw() {
    var box_one = getElement('box1');
    box_one.style("background-color", "black");
    // All drawing happens in the canvas.
    // noStroke();
    // background(220, 180, 200);
    // fill(180, 200, 40);
    // strokeWeight(6);
    // stroke(180, 100, 240);
    // for (var i=0; i<width; i+=15) {
    //     line(i, 0, i, height);
    // }
}

// Create functions for hiding and showing uni image. These will be hooked into mouse events related to canvas above.
function uniHide() {
    img.hide();
}

function uniShow() {
    img.show();
}
