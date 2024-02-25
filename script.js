const drawingGrid = document.querySelector("#drawing");
const resolutionInput = document.querySelector("#resolutionSlider");
const resolutionText = document.querySelector("#resolutionText");

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
            column.appendChild(pixel);
        }
    }
    resolutionText.textContent = `Resolution: ${resolution} x ${resolution}`;
}

refreshGrid()

resolutionInput.addEventListener('input', () => {
    refreshGrid();
});

window.onresize = refreshGrid;