//import utils from './js/utils';

//alert('random number: ');
//alert(randomIntFromRange(1,100));

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
  


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

let speedx;
let speedy;
let actualX;
let actualY;
let angle;
let speed;
let delay = 10; //zpozdeni v ms

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
//alert("resize");
  init();
});

addEventListener('keydown',(event) => {
    if (event.code === "ArrowLeft") {
        console.log("arrowleft");
        console.log(angle);
        angle += 0.1;
        console.log("aktualizovan vektor rychlosti doleva uhel:"+ toString(angle) + " speedx:" + toString(speedx) + " speedy:" + toString(speedy));
}
    if (event.code === "ArrowRight") {
        console.log("arrowright");
        angle -= 0.1;
}
    
});

// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath(); 
    c.beginPath();
    c.arc(this.x, this.y, this.radius+2, 0, Math.PI * 2, false);
    c.strokeStyle = 'orange';
    c.stroke();
  }

  update() {
    this.draw();
  }
}

// Implementation
let circle1; 
let objects;
function init() {
    circle1 = new Circle(300,300,5,'blue');
    objects = [];
    actualX = randomIntFromRange(canvas.width*1/3,canvas.width*3/4);
    actualY = randomIntFromRange(canvas.height*1/3,canvas.height*3/4);
    speed = Math.random()*canvas.width/100;
    angle = Math.random() * Math.PI*2;// randomIntFromRange(-180,180)/180/Math.PI; 
    console.log(angle);
    speedx = Math.cos(angle)*speed;
    speedy = Math.sin(angle)*speed;
    //speedx = randomIntFromRange(-100,100)/10;
    //speedy = randomIntFromRange(-100,100)/10;
  //for (let i = 0; i < 40; i+=10) {
  //  objects.push(new Circle(i,300,10,'blue'));
  //}
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    delay--; if (delay<0) delay = 10; else return;
    actualX+=speedx;
    actualY+=speedy;
    angle += (Math.random()-0.5)*0.1;
    speed += speed * Math.random()*0.001;
    if (angle>Math.PI*2) angle = 0;
    if (angle<0) angle = Math.PI * 2 - 0.01;
    c.clearRect(0, 0, canvas.width, canvas.height);
    //objects.push(new Circle(randomIntFromRange(1,canvas.width),
    //    randomIntFromRange(1,canvas.height),10,'blue'));
    speedy = Math.cos(angle)*speed;
    speedx = Math.sin(angle)*speed;
    objects.push(new Circle(actualX, actualY,10,'blue'));
   //circle1.draw();
    c.fillText('nenaraž do čáry ani do stěny', mouse.x, mouse.y);
    objects.forEach(object => {
    object.update();
   });
}

init();
animate();