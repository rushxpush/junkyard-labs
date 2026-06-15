const canvasAttributes = {
  width: 800,
  height: 600,
};

const mouseAttributes = {
  x: 0,
  y: 0,
};

document.addEventListener('mousemove', (event) => {
  mouseAttributes.x = event.x;
  mouseAttributes.y = event.y;
  console.log(`{ x: ${mouseX()}, y: ${mouseY() }`);
});


const printCanvasData = () => {
}

const mouseX = () => {
  let x = 0;
  if (mouseAttributes.x > canvas.offsetLeft && mouseAttributes.x < canvas.offsetLeft + canvasAttributes.width) {
    x = mouseAttributes.x - canvas.offsetLeft;
  }
  else if (mouseAttributes.x <= canvas.offsetLeft) x = 0;
  else if (mouseAttributes.x >= canvas.offsetLeft + canvasAttributes.width) x = canvasAttributes.width;

  return x;
}

const mouseY = () => {
  let y = 0;
  if (mouseAttributes.y > canvas.offsetTop && mouseAttributes.y < canvas.offsetTop + canvasAttributes.height) {
    y = mouseAttributes.y - canvas.offsetTop;
  }
  else if (mouseAttributes.y <= canvas.offsetTop) y = 0;
  else if (mouseAttributes.y >= canvas.offsetTop + canvasAttributes.height) y = canvasAttributes.height;

  return y;
}

const canvas = document.getElementById("canvas");
