const drawingGrid = document.querySelector("#drawing");
const resolutionInput = document.querySelector("#resolutionSlider");
const resolutionText = document.querySelector("#resolutionText");
const rainbowButton = document.querySelector("#rainbowButton");

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};

let eraser = false;
let rainbow = false;
let currentRainbowColor = "rgb(255, 0, 0)";

let targetColor = "rgb(0, 0, 0)";

function generateRainbowColor()
{
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    currentRainbowColor = `rgb(${r}, ${g}, ${b})`;
}

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
        element.target.style.backgroundColor = targetColor;
        if (eraser) { element.target.style.backgroundColor = "white"; }
        else if (rainbow) {
            element.target.style.backgroundColor = currentRainbowColor;
            generateRainbowColor();
            rainbowButton.style.backgroundColor = currentRainbowColor;
        }
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

function rainbowToggle(element) {
    let button = element.target;
    rainbow = !rainbow;
    if (!rainbow) { button.style.backgroundColor = "white"; }
    else { 
        generateRainbowColor();
        button.style.backgroundColor = currentRainbowColor; 
    }
}

function changeColor(element) {
    targetColor = element.target.value;
}

function windowLoad()
{
    refreshGrid();
    document.querySelector('#clearButton').addEventListener('click', refreshGrid);
    document.querySelector('#eraserButton').addEventListener('click', eraserToggle);
    rainbowButton.addEventListener('click', rainbowToggle);
    document.querySelector('#colorPicker').addEventListener('change', changeColor);
}

window.onload = windowLoad;
window.onresize = refreshGrid;