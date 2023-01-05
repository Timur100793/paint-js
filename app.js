const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector('#jsSave');

Array.from(colors).forEach((color) => {
    color.addEventListener("click", handleColorClick);
});

const CANVAS_SIZE = 700;

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

let paiting = false;
let filling = false;

function stopPaiting() {
    paiting = false;
}

function onMouseMove(e) {
    x = e.offsetX;
    y = e.offsetY;
    if (!paiting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(e) {
    paiting = true;
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRange(e) {
    const range = e.target.value;
    ctx.lineWidth = range;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Заливка";
    } else {
        filling = true;
        mode.innerText = "Рисование";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM (e) {
    e.preventDefault();
}

function handleSaveClick () {
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS [Export].jpeg";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPaiting);
    canvas.addEventListener("mouseleave", stopPaiting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (range) {
    range.addEventListener("input", handleRange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if(save) {
    save.addEventListener('click', handleSaveClick)
}
