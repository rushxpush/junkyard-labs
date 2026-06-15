const objects = [];
const boxObject = { width: 40, height: 40, verticalSpeed: 0};
const speedY = 0;
const gravity = 0.001;
const maxVerticalSpeed = 1;
const bounce = 0;

function setup() {
    createCanvas(800, 600);
    frameRate(60);
}

function draw() {
    background(220);
    
    for (let i = 0; i < objects.length; i++) {
        objects[i].verticalSpeed = updateVerticalSpeed(objects[i].verticalSpeed);
        objects[i].y = updatePositionY(objects[i].y, objects[i].verticalSpeed)
        const x = objects[i].x;
        const y = objects[i].y;
        const width = objects[i].width;
        const height = objects[i].height;
        console.log('--------------');
        console.log('x: ', x);
        console.log('y: ', y);
        console.log('objects[i].verticalSpeed: ', objects[i].verticalSpeed);

        rect(x, y, width, height);
    }
}

function mouseClicked(event) {
    addBox();
}

// function addBox(x, y, width, height) {
//     objects.push(addBox(mouseX - boxObject.width / 2, mouseY - boxObject.height / 2, boxObject.width, boxObject.height));
//     return { x, y, width, height, speedY };
// }

function addBox() {
    objects.push(
        {
            x: mouseX - boxObject.width / 2, 
            y: mouseY - boxObject.height / 2, 
            width: boxObject.width, 
            height: boxObject.height,
            verticalSpeed: boxObject.verticalSpeed,
            bounce: boxObject.bounce
        }
    );
}

function updateVerticalSpeed(verticalSpeed) {
    if (verticalSpeed < maxVerticalSpeed) {
        verticalSpeed = verticalSpeed + gravity * deltaTime;
    }
    console.log('---')
    console.log('verticalSpeed: ', verticalSpeed);
    console.log('deltaTime: ', deltaTime)
    console.log('gravity: ', gravity);
    return verticalSpeed;
}

function updatePositionY(y, verticalSpeed) {
    return y + verticalSpeed * deltaTime;
}
