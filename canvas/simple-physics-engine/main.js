const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
let lastTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;
const objects = [];
const gravity = 1;
const maxSpeed = 5;

document.addEventListener('mouseup', () => {
  createBox();
});

class Box {
  x; 
  y;
  width;
  height;
  velocityX;
  velocityY;

  constructor(x = 0, y = 0, width = 50, height = 50) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = 0;
    this.velocityY = 0;
  }

}

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
});


const printCanvasData = () => {
}

const createBox = () => {
  const width = 50;
  const height = 50;
  const x = mouseX() - width / 2;
  const y = mouseY() - height / 2;
  objects.push(new Box(x, y, width, height));
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

const gameLoop = (currentTime) => {
  requestAnimationFrame(gameLoop);

  // Time elapsed since last frame
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= frameInterval) {
    // Adjust lastTime while accounting for residual latency drops
    lastTime = currentTime - (deltaTime % frameInterval);

    update(deltaTime);

    render();
  }
}

const update = (deltaTime) => {
  for (let i = 0; i < objects.length; i++) {
    calculateVelocity(objects, i);
    calculatePosition(objects, i);
    checkOutOfBounds(objects, i);
  }
}

const checkOutOfBounds = (objects, index) => {
  if (objects[index].y > canvas.height) objects.splice(index, 1);
}

const calculateVelocity = (objects, index) => {
  if (objects[index].velocityY >= maxSpeed);
  objects[index].velocityY += gravity;
}

const calculatePosition = (objects, index) => {
  objects[index].y += objects[index].velocityY;
}

const render = () => {
  ctx.beginPath();
  ctx.clearRect(0, 0, 800, 600);
  for (let i = 0; i < objects.length; i++) {
    ctx.rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  }
  ctx.fill();
}

requestAnimationFrame(gameLoop);