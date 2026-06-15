const canvasWidth = 800;
const canvasHeight = 600;

let showMousePos;
let labelPosX;
let labelPosY;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(220);
    fill(0);

    // ({labelPosX, labelPosY, showMousePos} = setCurrentStrategy(edgeAwareStrategy));
    ({labelPosX, labelPosY, showMousePos} = setCurrentStrategy(stickyCornerStrategy));

    if (showMousePos) text(`${mouseX}, ${mouseY}`, labelPosX, labelPosY)
}

function setCurrentStrategy(strategy) {
  return strategy();
}

function edgeAwareStrategy() {
    let labelPosX, labelPosY, showMousePos;

    if (mouseX < 0 || mouseY < 0) showMousePos = false;
    else if (mouseX > canvasWidth || mouseY > canvasHeight) showMousePos = false;
    else showMousePos = true;

    if (canvasWidth - mouseX < 80) {
        labelPosX = mouseX - 80;
    }
    else {
        labelPosX = mouseX + 20;
    }

    if (canvasHeight - mouseY < 45) {
        labelPosY = mouseY - 15;
    }
    else {
        labelPosY = mouseY + 45;
    }

    return {labelPosX, labelPosY, showMousePos};
}

function stickyCornerStrategy() {
    let labelPosX, labelPosY, showMousePos;
    let mouseOffsetX = 20;
    let mouseOffsetY = 40;
    let textWidth = 80;
    let textHeight = 20;

    const padding = 20;

    showMousePos = true;

    labelPosX = mouseX + mouseOffsetX;
    labelPosY = mouseY + mouseOffsetY;

    if (mouseX + mouseOffsetX + textWidth + padding > canvasWidth) {
        labelPosX = canvasWidth - textWidth - padding;
    }
    else if (mouseX - mouseOffsetX < 0) {
        labelPosX = mouseOffsetX + padding;
    }

    if (mouseY + mouseOffsetY + textHeight + padding > canvasHeight) {
        labelPosY = canvasHeight - textHeight - padding;
    }
    else if (mouseY - padding < 0) {
        labelPosY = mouseOffsetY + padding;
    }

    return {labelPosX, labelPosY, showMousePos};
}