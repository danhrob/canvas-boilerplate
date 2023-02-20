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
  
function collision (x1,y1,x2,y2,radius1,radius2) {
  //0 volno
  //sectou se radiusy a porovna distance
  //console.log('kolize:'+x1+' '+ y1 + ' ' + x2 + ' ' + y2);
  if (distance(x1,y1,x2,y2)<(radius1+radius2)) return 2;
  return 0;
}

function collisionOkraj (x,y,radius) {
  //0 nedotykam se okraje
  
  if (x<2*radius || x>(canvas.width-radius)|| y<2*radius || y>(canvas.height-radius)) 
  return 1;
  return 0;
}

//modry prijede k levemu tunelu a vyjede v pravem tunelu
function collisionTunel (x1,y1,x2,y2) {
  //actualX, actualY, tunelX, tunelY
  //porovna se distance k tunelu
  //nastavi se nove hodnoty pro actualX a actualY a angle
  if (distance(x1,y1,x2,y2)<100 && (Math.PI*1.5 - angle)<1 ) {
    //alert("tunel1 mene nez 50");
    actualX = innerWidth - 90;//  1500;// tunelElem2.offsetLeft;// 1200;//parseInt(tunelElem2.style.left.replace('px', '')) ;
    actualY =parseInt(tunelElem2.style.top.replace('px', '')) ;
    angle=Math.PI*1.5;
  }
}

//zeleny prijede k levemu tunelu a vyjede v pravem tunelu 
function collisionTunelZel (x1,y1,x2,y2) {
  //actualX2, actualY2, tunelX, tunelY
  //porovna se distance k tunelu
  //nastavi se nove hodnoty pro actualX a actualY a angle
  //console.log('collision Zel Vlevo x1:' + x1+' y1:'+y1 + ' x2:' + x2 + ' y2:' + y2 + ' angle2:'+angle2);
  if (distance(x1,y1,x2,y2)<100 && (Math.PI*1.5 - angle2)<1) {
    //alert("tunel1 mene nez 50");
    actualX2 = innerWidth - 90;//  1500;// tunelElem2.offsetLeft;// 1200;//parseInt(tunelElem2.style.left.replace('px', '')) ;
    actualY2 =parseInt(tunelElem2.style.top.replace('px', '')) ;
    angle2=Math.PI*1.5;
  }
}

//tunely napravo
function collisionTunelVpravo (x1,y1,x2,y2) {
  //actualX, actualY, tunelX, tunelY
  //porovna se distance k tunelu
  //nastavi se nove hodnoty pro actualX a actualY a angle
  //console.log('x1:' + x1+' y1:'+y1 + ' x2:' + x2 + ' y2:' + y2);
  if (distance(x1,y1,x2,y2)<100 && (Math.abs(angle)-Math.PI*0.5)<1) {
    //alert("tunel2 mene nez 50");
    actualX = 100;//  1500;// tunelElem2.offsetLeft;// 1200;//parseInt(tunelElem2.style.left.replace('px', '')) ;
    actualY =parseInt(tunelElem.style.top.replace('px', '')) ;
    angle=Math.PI*0.5;
  }
}

//zeleny prijede k levemu tunelu a vyjede v pravem tunelu 
function collisionTunelZelVpravo (x1,y1,x2,y2) {
  //actualX2, actualY2, tunelX, tunelY
  //porovna se distance k tunelu
  //nastavi se nove hodnoty pro actualX a actualY a angle
  if (distance(x1,y1,x2,y2)<100 && (angle2-Math.PI*0.5)<1) {
    //alert("tunel2 mene nez 50");
    actualX2 = 100;//  1500;// tunelElem2.offsetLeft;// 1200;//parseInt(tunelElem2.style.left.replace('px', '')) ;
    actualY2 =parseInt(tunelElem.style.top.replace('px', '')) ;
    angle2=Math.PI*0.5;
  }
}

function pick(x,y,ctx) {
  const bounding = canvas.getBoundingClientRect();
  const pixel = ctx.getImageData(x, y, 10, 10);
  const data = pixel.data;
  //vysledek v logu: rgba(0, 128, 0, 1)
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  return rgba;
}

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
//c.transform(1, 0.2, 0.8, 1, 0, 0);
canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

//let audio = new Audio("dnx-116856.mp3");

let speedx;
let speedy;
let actualX;
let actualY;
let angle;
let speed;
let delay = 10; //zpozdeni v ms
let speedx2;
let speedy2;
let actualX2;
let actualY2;
//zde se dopočte, kolik bodů bude potřeba ke spojitému dosažení dané vzdálenosti pro obrázky hlavy
//hlava jede spojitě, narozdíl od těla
let actualXrotated=0;
let actualYrotated=0;
let actualX2rotated=0;
let actualY2rotated=0;
let angle2;
let speed2;
let score = 0;
let score2 = 0;
let audioplayed=false;
let stisknutoZelena=0;
let stisknutoModra=0;
let stisknutaPauzaZelena=0, stisknutaPauzaModra=0;  //X startstop  zelena, downArrow startstop modra
//pohybujici se tunel levy
let poziceTuneluLTop = randomIntFromRange(innerHeight*0.2,innerHeight*0.49);
let poziceTuneluLDown = randomIntFromRange(innerHeight*0.51, innerHeight * 0.8 );
let poziceTuneluLActual = 0.5 * innerHeight;
let poziceTuneluLrychlost = 0.5;
//pohybujici se tunel pravy
let poziceTuneluPTop = randomIntFromRange(innerHeight*0.2,innerHeight*0.49);
let poziceTuneluPDown = randomIntFromRange(innerHeight*0.51, innerHeight * 0.8 );
let poziceTuneluPActual = 0.5 * innerHeight;
let poziceTuneluPrychlost = 0.5;
//souradnice hlavy lineTo
let speedyDelta = Math.cos(angle);
let speedxDelta = Math.sin(angle);
let speedyDelta2 = Math.cos(angle2);
let speedxDelta2 = Math.sin(angle2);


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

//window.onload = function() {
  //alert("let's go!");
  //poNacteniStranky();
 //};

//window.addEventListener("load", (event) => {
  //audio.play();
//});

addEventListener('keydown',(event) => {
   //if (!audioplayed) {audioplayed=true; audio.play();}
   if (event.code === "ArrowLeft") {
      //console.log("arrowleft");
      //console.log(angle);
      angle += 0.2;
      stisknutoModra= -1;
      //console.log("aktualizovan vektor rychlosti doleva uhel:"+ toString(angle) + " speedx:" + toString(speedx) + " speedy:" + toString(speedy));
    }
    if (event.code === "ArrowRight") {
              //console.log("arrowright");
              angle -= 0.2;
              stisknutoModra=1; //doprava modra
    }
    if (event.code === "ArrowDown") {
      if (stisknutaPauzaModra==0) stisknutaPauzaModra = 1; else stisknutaPauzaModra = 0;
    } 
    
   
    //green
    if (event.key === "s" || event.key === "S") {
      
      //console.log("S");
      angle2 -= 0.2;
      stisknutoZelena=1; //doprava zelená
    }
    if (event.key === "a" || event.key === "A") {
      //console.log("A");
      angle2 += 0.2;
      stisknutoZelena= -1; //zelena doleva
    }
    if (event.key === "x" || event.key === "X") {
        if (stisknutaPauzaZelena==0) stisknutaPauzaZelena = 1; else stisknutaPauzaZelena = 0;
    }
          
  });

// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.polomerMax = 0; 
  }

  draw() {
    this.polomerMax++; if (this.polomerMax>1) this.polomerMax=-1;
    //this.radius += this.polomerMax; 
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath(); 
    c.beginPath();
    c.arc(this.x, this.y, this.radius+2, 0, Math.PI * 2, false);
    c.strokeStyle = 'orange';
    c.stroke();
    this.drawHead(this.x,this.y);
  }

  drawHead(x, y) {
    c.closePath();
    c.beginPath();
    //c.moveTo(this.x, this.y);
    c.moveTo(this.x,this.y);
    //byla lokalni promenna
    speedyDelta = Math.cos(angle);
    speedxDelta = Math.sin(angle);
    speedyDelta2 = Math.cos(angle2);
    speedxDelta2 = Math.sin(angle2);
    //console.log("angle:" + angle + " cos:" + speedyDelta + " sin:" + speedxDelta);
    //console.log("moveTo this.x:" + this.x + " this.y:" + this.y);
    //c.lineTo(speedxDelta+100, speedyDelta+100);
    //console.log("lineTo this.x + speedxDelta*20:" + this.x*speedxDelta+20 + " this.y+speedyDelta*20:" + this.y+speedyDelta*20);
    if (this.color=="blue") c.lineTo(this.x + speedxDelta*40, this.y+speedyDelta*40);
    if (this.color=="green") c.lineTo(this.x + speedxDelta2*40, this.y+speedyDelta2*40);
    c.closePath();
    //c.lineTo(x+30, y+30);
    c.strokeStyle=this.color;
    c.stroke(); 
  }

  update() {
    this.draw();

  }
}

// Implementation
//let circle1; 
let objects, objects2, anglexx, anglexx2, rotationxx, rotationxx2;
function init() {
    //circle1 = new Circle(300,300,5,'blue');
    c.clearRect(0, 0, canvas.width, canvas.height);
    objects = [];
    actualX = randomIntFromRange(canvas.width*1/3,canvas.width*3/4);
    actualY = randomIntFromRange(canvas.height*1/3,canvas.height*3/4);
    actualXrotated = actualX;
    actualYrotated = actualY;
    //speed = Math.random()*canvas.width/80 + canvas.width/100 ;
    speed = randomIntFromRange(10,15)*canvas.width/1920;
    angle = Math.random() * Math.PI*2;// randomIntFromRange(-180,180)/180/Math.PI; 
    //console.log(angle);
    speedx = Math.cos(angle)*speed;
    speedy = Math.sin(angle)*speed;
    objects2 = [];
    actualX2 = randomIntFromRange(canvas.width*1/3,canvas.width*3/4);
    actualY2 = randomIntFromRange(canvas.height*1/3,canvas.height*3/4);
    //speed2 = Math.random()*canvas.width/80 + canvas.width/100 ;
    speed2 = randomIntFromRange(10,15)*canvas.width/1920;
    //test pro kolizi se zelenou
    //speed2=1;
    angle2 = Math.random() * Math.PI*2;// randomIntFromRange(-180,180)/180/Math.PI; 
    console.log(angle2);
    speedx2 = Math.cos(angle)*speed2;
    speedy2 = Math.sin(angle)*speed2;
    //document.getElementById('openFsBt').style.visibility="hidden";
    //document.getElementById('closeFsBt').style.visibility="visible";
    //openFullscreen();
    //document.getElementById('openFsBt').click();
    let poziceTuneluLTop = randomIntFromRange(innerHeight*0.2,innerHeight*0.49);
    let poziceTuneluLDown = randomIntFromRange(innerHeight*0.51, innerHeight * 0.8 );
    let poziceTuneluLActual = 0.5 * innerHeight;
    //pravy tunel init
    let poziceTuneluPTop = randomIntFromRange(innerHeight*0.2,innerHeight*0.49);
    let poziceTuneluPDown = randomIntFromRange(innerHeight*0.51, innerHeight * 0.8 );
    let poziceTuneluPActual = 0.5 * innerHeight;
}

// Access DOM element object
const rotated = document.getElementById('rotated');
const rotated2 = document.getElementById('rotated2');
const tunelElem = document.getElementById('tunel1');
const tunelElem2 = document.getElementById('tunel2');

// Variable to hold the current angle of rotation
rotationxx2 = 0;

// How much to rotate the image at a time
anglexx2= 1;

rotationxx = 0;
anglexx=1;

function rotateImage() {
  // Ensure angle range of 0 to 359 with "%" operator,
  // e.g., 450 -> 90, 360 -> 0, 540 -> 180, etc.
  rotationxx = (rotationxx + anglexx) % 360 + 180;
  //rotated.style.left = actualX -60 + "px";
  //rotated.style.top = actualY -50 + "px";
  //spojity pohyb hlavy

  //let deltaxR = Math.floor(Math.abs(Math.cos(angle))*10);
  let deltayR = -30;// Math.floor(Math.cos(angle)*40);
  let deltaxR = -30;//Math.floor(Math.sin(angle)*40);
  //let deltayR = 0;
  //this.x + speedxDelta*40, this.y+speedyDelta*40
  //this.x + speedxDelta*40, this.y+speedyDelta*40
  let speedyDeltaOK = Math.cos(angle);
  let speedxDeltaOK = Math.sin(angle);
  //rotated.style.left = (actualXrotated) + "px";
  //rotated.style.top = (actualYrotated) + "px";
  rotated.style.left = actualX -60 + "px";
  rotated.style.top = actualY -50 + "px";
  rotated.style.transform = `rotate(${rotationxx}deg)`;

  }

  function rotateImage2() {
    // Ensure angle range of 0 to 359 with "%" operator,
    // e.g., 450 -> 90, 360 -> 0, 540 -> 180, etc.
    rotationxx2 = (rotationxx2 + anglexx2) % 360 + 180;
    rotated2.style.left = actualX2 -60 + "px";
    rotated2.style.top = actualY2 -50 + "px";
    rotated2.style.transform = `rotate(${rotationxx2}deg)`;
  
    }

rotateImage();//doplnit do main.js
rotateImage2();
// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    //hybajici se levy tunel
    if (poziceTuneluLActual<poziceTuneluLTop && poziceTuneluLrychlost<0) 
    {
      poziceTuneluLrychlost*=-1;
    }

    if (poziceTuneluLActual>=poziceTuneluLDown && poziceTuneluLrychlost>0) 
    {
      poziceTuneluLrychlost*=-1;
    }
    poziceTuneluLActual+=poziceTuneluLrychlost;
    tunelElem.style.top =  poziceTuneluLActual + 'px';
    //hybajici se pravy tunel
    if (poziceTuneluPActual<poziceTuneluPTop && poziceTuneluPrychlost<0) 
    {
      poziceTuneluPrychlost*=-1;
    }

    if (poziceTuneluPActual>=poziceTuneluPDown && poziceTuneluPrychlost>0) 
    {
      poziceTuneluPrychlost*=-1;
    }
    poziceTuneluPActual+=poziceTuneluPrychlost;
    tunelElem2.style.top =  poziceTuneluPActual + 'px';

    // hlava jede pořád spojitě
    rotationxx = - angle * 180/ Math.PI;
    //this.x + speedxDelta*40, this.y+speedyDelta*40
    speedyDelta = Math.abs(Math.cos(angle))*1;//*speed/16;
    speedxDelta = Math.abs(Math.sin(angle))*1;//*speed/16;
    distanceRotated = distance(actualXrotated,actualYrotated,actualX,actualY);
    if (distanceRotated>20) {
      speedxDelta=speedxDelta*distanceRotated/6;
      speedyDelta=speedyDelta*distanceRotated/6;
    }
 
actualXrotated = actualXrotated + (distanceRotated*speedxDelta*20);
actualYrotated = actualYrotated + (distanceRotated*speedyDelta*20);
/*
    if (actualXrotated < actualX) actualXrotated = actualXrotated + speedxDelta;//1;//speedx/5;
    if (actualYrotated < actualY) actualYrotated = actualYrotated + speedyDelta;//1; //speedy/5;
    if (actualXrotated > actualX) actualXrotated = actualXrotated - speedxDelta;//1; //speedx/5;
    if (actualYrotated > actualY) actualYrotated = actualYrotated - speedyDelta;// 1;//speedy/5;
    */
    //pro pripad, ze by rychlost +1 pro hlavu nestacila
    //napr.tunel
    //if (actualXrotated < (actualX-50)) actualXrotated = actualX;//speedx/5;
    //if (actualYrotated < (actualY-50)) actualYrotated = actualY; //speedy/5;
    //if (actualXrotated > (actualX+50)) actualXrotated = actualX; //speedx/5;
    //if (actualYrotated > (actualY+50)) actualYrotated = actualY;
    
    //actualYrotated = actualY + 1;

    rotateImage();
    rotationxx2 = - angle2 * 180/ Math.PI;
    rotateImage2();
    

    delay--; if (delay<0) delay = 12; else return; //15
    //tests
    console.log("actualXrotated:" + actualXrotated +
     " actualYrotated:" + actualYrotated + " distanceRotated:" + distanceRotated);
    if (score>0 || score2>0) {
      //audio.pause();
      //audio.currentTime=0;
      if (score2>0)
      alert("The winner is BLUE player!");
      if (score>0)
      alert("The winner is GREEN player!");
      score=0;score2=0;
      init();
    }
    //polomerMax++; if (polomerMax>1) polomerMax=-1;
    //polomerMax2++; if (polomerMax2>1) polomerMax2=-1;
    if (stisknutaPauzaModra==0){
      actualX+=speedx;
      actualY+=speedy;
      angle += (Math.random()-0.5)*0.1;
      speed += speed * Math.random()*0.001;
      if (angle>Math.PI*2) angle = 0;
      if (angle<0) angle = Math.PI * 2 - 0.01;
    }
    if (stisknutaPauzaZelena==0){
      //2
      actualX2+=speedx2;
      actualY2+=speedy2;
      angle2 += (Math.random()-0.5)*0.1;
      speed2 += speed2 * Math.random()*0.001;
      if (angle2>Math.PI*2) angle2 = 0;
      if (angle2<0) angle2 = Math.PI * 2 - 0.01;
    }

    /*
    rotationxx = - angle * 180/ Math.PI;
    rotateImage();
    rotationxx2 = - angle2 * 180/ Math.PI;
    rotateImage2();
*/


    //c.clearRect(0, 0, canvas.width, canvas.height);
    //objects.push(new Circle(randomIntFromRange(1,canvas.width),
    //    randomIntFromRange(1,canvas.height),10,'blue'));
    speedy = Math.cos(angle)*speed;
    speedx = Math.sin(angle)*speed;
    //nevykreslovat vzdy, jen pokud neni vykresleno
    if (stisknutaPauzaModra==0) {
      const circle = new Circle (actualX, actualY,(Math.random()*6) + 7,'blue');
      objects.push(circle);
      //objects.push(new Circle(actualX, actualY,(Math.random()*6) + 7,'blue'));
      circle.update();
    }
    //2
    speedy2 = Math.cos(angle2)*speed2;
    speedx2 = Math.sin(angle2)*speed2;
    if (stisknutaPauzaZelena==0)
    {
      const circle = new Circle (actualX2, actualY2,(Math.random()*6) + 7,'green');
      objects2.push(circle);
      //objects.push(new Circle(actualX, actualY,(Math.random()*6) + 7,'blue'));
      circle.update();
      //objects2.push(new Circle(actualX2, actualY2,(Math.random()*6) + 7,'green'));
    }
   //circle1.draw();
    //c.fillText('nenaraž do čáry ani do stěny', mouse.x, mouse.y);
    c.font = "15px Arial";

    if (stisknutoZelena>0) {
      c.font = "16px Arial bold";
      stisknutoZelena = 0;
    }
    if (stisknutoZelena<0) {
      c.font = "16px Arial bold";
      stisknutoZelena = 0;
    }
    //c.color = 'green';
    c.fillStyle = "#11bb11";
    c.fillText('Zelená čára: S + A ', 200, 20);
    c.font = "15px Arial";
    if (stisknutoModra>0) {
      c.font = "16px Arial bold";
      stisknutoModra = 0;
    }
    if (stisknutoModra<0) {
      c.font = "16px Arial bold";
      stisknutoModra = 0;
    }
    c.fillStyle = "#1111bb";
    c.fillText('Modrá čára: -> + <-', canvas.width - 200, 20);
    c.font = "15px Arial";
    objects2.forEach(object2 => {
    //object2.radius += object2.polomerMax; if (object2.polomerMax>2) object2.polomerMax=-3;
    
    
    //object2.update();
    
    
    if (collisionOkraj(actualX2,actualY2,object2.radius)>0) score2++;
    if (collision(actualX,actualY,object2.x,object2.y,object2.radius,10)) score++;
    if (collision(actualX2+speedx2,actualY2+speedy2,object2.x,object2.y,5*innerWidth/1920,5*innerWidth/1900)) score2++;
    collisionTunelZel(actualX2, actualY2,
      parseInt(tunelElem.style.left.replace('px', '')),
      parseInt(tunelElem.style.top.replace('px', '')));
    collisionTunelZelVpravo(actualX2, actualY2,
        innerWidth-40,
        parseInt(tunelElem2.style.top.replace('px', '')));
   });
   objects.forEach(object => {
    //object.radius += object.polomerMax; if (object.polomerMax>2) object.polomerMax=-3;
   
   //neni potreba update v pripade, ze nemenime nic nakresleneho
    //object.update();
   
   
    if (collisionOkraj(actualX,actualY,object.radius)>0) score++;
    if (collision(actualX2,actualY2,object.x,object.y,object.radius,10)) score2++;
    if (collision(actualX+speedx,actualY+speedy,object.x,object.y,5*innerWidth/1920,5*innerWidth/1900)) score++;
    collisionTunel(actualX, actualY,
      parseInt(tunelElem.style.left.replace('px', '')),
      parseInt(tunelElem.style.top.replace('px', '')));
    
    collisionTunelVpravo(actualX, actualY,
      innerWidth - 40,
      parseInt(tunelElem2.style.top.replace('px', '')));
    
    //console.log(pick(actualX, actualY, c));
   });
}

init();
animate();