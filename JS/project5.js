const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const brushSizeInput = document.getElementById("brush-size");
const brushColorInput = document.getElementById("brush-color");
const bgColorInput = document.getElementById("bg-color");
const undoButton = document.getElementById("undo");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");

let painting = false;
let brushSize = brushSizeInput.value;
let brushColor = brushColorInput.value;
let backgroundColor = bgColorInput.value;
let paths = [];
let currentPath = [];

canvas.width = 800;
canvas.height = 500;
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function startDrawing(e) {
    painting = true;
    currentPath = [];
    draw(e);
}

function stopDrawing() {
    painting = false;
    if (currentPath.length > 0) {
        paths.push([...currentPath]);
    }
}

function draw(e) {
    if (!painting) return;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    if (currentPath.length === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    currentPath.push({ x, y, brushSize, brushColor });
}

function undoLast() {
    if (paths.length > 0) {
        paths.pop();
        redrawCanvas();
    }
}

function clearCanvas() {
    paths = [];
    redrawCanvas();
}

function redrawCanvas() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    paths.forEach(path => {
        ctx.beginPath();
        path.forEach((point, index) => {
            ctx.lineWidth = point.brushSize;
            ctx.strokeStyle = point.brushColor;
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
        });
    });
}

function saveCanvas() {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseleave", stopDrawing);

brushSizeInput.addEventListener("input", () => brushSize = brushSizeInput.value);
brushColorInput.addEventListener("input", () => brushColor = brushColorInput.value);
bgColorInput.addEventListener("input", () => {
    backgroundColor = bgColorInput.value;
    redrawCanvas();
});

undoButton.addEventListener("click", undoLast);
clearButton.addEventListener("click", clearCanvas);
saveButton.addEventListener("click", saveCanvas);
