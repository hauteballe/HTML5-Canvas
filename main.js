const canvas = document.querySelector("#draw");
const context = canvas.getContext("2d");
const inputs = document.querySelectorAll(".menu input");
let widthPicker = document.querySelector("#width-size");
let colorPicker = document.querySelector("#color-panel");

canvas.width = canvas.offsetWidth;
canvas.clientHeight = window.innerHeight;

context.lineJoin = "round";
context.lineCap = "round";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true;

function updateCanvasStyles(strokeStyle, lineWidth) {
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
}

function draw(elem) {
  if (!isDrawing) return;
  updateCanvasStyles(colorPicker.value, widthPicker.value);
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(elem.offsetX, elem.offsetY);
  context.stroke();

  [lastX, lastY] = [elem.offsetX, elem.offsetY];
}

canvas.addEventListener("mousedown", (elem) => {
  isDrawing = true;
  [lastX, lastY] = [elem.offsetX, elem.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

document.getElementById("clear").onclick = function () {
  context.clearRect(0, 0, 950, 450);
  context.beginPath();
};

updateCanvasStyles("#006EFF", 60);
