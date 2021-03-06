let bubbles=[];
var numYellow = 0;
var numBlack = 0;
var yellowClick = 0;
var blackClick = 0;
var colors = ['black', 'yellow'];
let counter = 0;
let scores = [];
let count = 0;

function setup() {
  createCanvas(1024, 600);

  while(bubbles.length<25) {
    let x=random(60, width-60);
    let y=random(60, height-60);
    let r=30;
    let currentColor = colors[Math.round(Math.random())];
    var c = new Bubble(x, y, r, currentColor);
    var overlapping = false;
    for (let j = 0; j < bubbles.length; j++) {
      let other = bubbles[j];
      let d = dist(c.x, c.y, other.x, other.y);
      if (d < c.r + other.r) {
        overlapping = true;
      }
    }
    // If not keep it!
    if (!overlapping) {
      bubbles.push(c);
    }
  }
  bubbles.forEach(element => {
    if (element.col == 'yellow'){numYellow+=1}
    else{numBlack+=1}
  });
}
// console.log(numBlack,numYellow);


function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      let clickedCircle = bubbles.splice(i, 1);
      console.log(clickedCircle[0].col);
      if (clickedCircle[0].col=='yellow'){yellowClick+=1}
      else{blackClick+=1}
      console.log(yellowClick,blackClick);
    }
  }
}

function restart(){
  window.location.reload();
}

function draw() {
  background(245);
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].show();
    }
    if(yellowClick==numYellow){
      let score = Math.round(((yellowClick-blackClick)/numYellow)*100);
      console.log(score)
      let scoreLine = "Your score is "+score;
      noLoop();
      clear();
      textSize(40);
      fill(0, 102, 153);
      text(scoreLine, 10, 60);
      fill(0, 102, 153);
      text("Refresh the page and take retest. Do this 3 times and note the score.", 10, 90, 800, 300);
  }
}

class Bubble {
  constructor(x, y, r, col) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    let flag = false;
    flag = (d < this.r) ? (true) : (false);
    return flag;
  }

  show() {
    fill(this.col);
    ellipse(this.x, this.y, this.r * 2);
  }
}


