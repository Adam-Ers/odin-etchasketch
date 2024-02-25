const drawingGrid = document.querySelector("#drawing");
const resolutionInput = document.querySelector("#resolutionSlider");
const resolutionText = document.querySelector("#resolutionText");

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};

let eraser = false;

function refreshGrid() {
    let resolution = resolutionInput.value;
    drawingGrid.innerHTML = '';
    let width = drawingGrid.clientWidth / resolution;
    console.log(drawingGrid.clientWidth);
    let row = document.createElement("div");
    row.classList.add("row");
    drawingGrid.appendChild(row);
    for (let x = 0; x < resolution; x++)
    {
        let column = document.createElement("div");
        column.classList.add("column");
        row.appendChild(column);
        for (let y = 0; y < resolution; y++)
        {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.minWidth = `${width}px`;
            pixel.style.minHeight = `${width}px`;
            pixel.addEventListener('mouseover', onMouseOver);
            pixel.addEventListener('mousedown', onMouseOver);
            column.appendChild(pixel);
        }
    }
    resolutionText.textContent = `Resolution: ${resolution} x ${resolution}`;
}

function onMouseOver(element) {
    if (mouseDown || element.type === 'mousedown') 
    { 
        element.target.style.backgroundColor = "black";
        if (eraser) { element.target.style.backgroundColor = "white"; }
    }
}

resolutionInput.addEventListener('input', () => {
    refreshGrid();
});

function eraserToggle(element) {
    let button = element.target;
    if (eraser) { button.style.backgroundColor = "white"; }
    else { button.style.backgroundColor = "pink"; }
    eraser = !eraser;
}

function windowLoad()
{
    refreshGrid();
    document.querySelector('#clearButton').addEventListener('click', refreshGrid);
    document.querySelector('#eraserButton').addEventListener('click', eraserToggle);
}

window.onload = windowLoad;
window.onresize = refreshGrid;