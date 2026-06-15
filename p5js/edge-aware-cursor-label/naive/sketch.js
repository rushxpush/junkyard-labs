const canvasWidth = 800;
const canvasHeight = 600;

let showMousePos;
let mousePosX;
let mousePosY;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(220);
    fill(0)

    if (mouseX < 0 || mouseY < 0) showMousePos = false;
    else if (mouseX > canvasWidth || mouseY > canvasHeight) showMousePos = false;
    else showMousePos = true;

    if (canvasWidth - mouseX < 80) {
        mousePosX = mouseX - 80;
    }
    else {
        mousePosX = mouseX + 20;
    }

    if (canvasHeight - mouseY < 45) {
        mousePosY = mouseY - 15;
    }
    else {
        mousePosY = mouseY + 45;
    }
    if (showMousePos) text(`${mouseX}, ${mouseY}`, mousePosX, mousePosY)
}
