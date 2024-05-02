let lastX = 0;
let lastY = 0;
let isDrawing = false;
const colorPicker = document.getElementById("colorPicker");
const canvaColor = document.getElementById("canvaColor");
const myCanvas = document.getElementById("myCanvas");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const retrieveBtn = document.getElementById("retrieveBtn");
const fontSize = document.getElementById("fontSize");
const ctx = myCanvas.getContext("2d");
colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});
myCanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});
myCanvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});
myCanvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
canvaColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  console.log("color", e.target.value);
  ctx.fillRect(0, 0, 800, 500);
});
fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});
clearBtn.addEventListener("click", (e) => {
  localStorage.setItem("canvasContents", myCanvas.toDataURL());
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
});
saveBtn.addEventListener("click", (e) => {
  // localStorage.setItem('canvasContents', myCanvas.toDataURL());
  let link = document.createElement("a");
  link.download = "my-canvas.jpg";
  link.href = myCanvas.toDataURL();
  link.click();
  link.remove();
});
retrieveBtn.addEventListener("click", (e) => {
  let savedCanvas = localStorage.getItem("canvasContents");
  if (savedCanvas) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    let img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      localStorage.removeItem("canvasContents"); // Correct method to remove item
    };
    img.src = savedCanvas;
  }
});
