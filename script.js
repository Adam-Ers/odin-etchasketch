const drawingGrid = document.querySelector("#drawing");
const resolutionInput = document.querySelector("#resolutionSlider");
const resolutionText = document.querySelector("#resolutionText");
const rainbowButton = document.querySelector("#rainbowButton");

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};

const resizeObserver = new ResizeObserver(entries => {
    resizeGrid();
})

let eraser = false;
let rainbow = false;
let currentRainbowColor = "rgb(255, 0, 0)";
let grid = false;

Coloris({
    themeMode: 'dark',
    alpha: false,
    swatches: [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'indigo',
    ]
});

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
            if (grid) { pixel.style.border = "1px solid darkgray"};
            pixel.addEventListener('mouseover', onMouseOver);
            pixel.addEventListener('mousedown', onMouseOver);
            column.appendChild(pixel);
        }
    }
    resolutionText.textContent = `Resolution: ${resolution} x ${resolution}`;
}

function resizeGrid() {
    let resolution = resolutionInput.value;
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        let width = drawingGrid.clientWidth / resolution;
        pixel.style.minWidth = `${width}px`;
        pixel.style.minHeight = `${width}px`;
        pixel.style.maxWidth = `${width}px`;
        pixel.style.maxHeight = `${width}px`;
    })
}

function gridToggle() {
    grid = !grid;
    let grid_color = 255 - (50 * grid);
    document.querySelector('#gridButton').style.backgroundColor = `rgb(${grid_color}, ${grid_color}, ${grid_color})`;
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        if (grid) { pixel.style.border = '1px solid darkgray';}
        else { pixel.style.border = 'none';}
    })
}

function onMouseOver(element) {
    if (mouseDown || element.type === 'mousedown') 
    { 
        targetColor = document.querySelector('#colorPicker').value;
        element.target.style.backgroundColor = targetColor;
        if (element.target.style.backgroundColor === '') { element.target.style.backgroundColor = 'black';}
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

function windowLoad()
{
    document.querySelector('#clearButton').addEventListener('click', refreshGrid);
    document.querySelector('#eraserButton').addEventListener('click', eraserToggle);
    document.querySelector('#gridButton').addEventListener('click', gridToggle);
    rainbowButton.addEventListener('click', rainbowToggle);
    resizeObserver.observe(drawingGrid);
    refreshGrid();
    setTimeout(refreshGrid, 10);
}

window.onload = windowLoad;