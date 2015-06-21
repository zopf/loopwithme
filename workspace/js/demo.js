var img,
grid,
cellsId = 'box',
cells = [];

function setup() {
    cells = getElements("col-sm-4");
    for (var i = 0; i < cells.length; i++) {
        console.log(cells[i]);
        cells[i].style("background-color", "red");
    }

}

function draw() {
    // var cell_one = getElement('cell1');
    // cell_one.style("background-color", "black");
}
