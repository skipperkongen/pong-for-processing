var rightX, rightY;
var leftX, leftY;

var paddleWidth, paddleHeight;

var ballX, ballY, ballSize, ballXspeed;

var hasStarted;
var ballYspeed;

function setup() {
  // Set skærmstørrelsen til at være det samme som browseren
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  // Størrelse på paddles
  paddleWidth = 15;
  paddleHeight = 150;

  // Start koordinator til right paddle (x = 95% inde på skærmen, y = midten af skærmen)
  rightX = width*0.95;
  rightY = height/2-paddleHeight/2;

  // Start koordinator til left paddle (x = 5% inde på skærmen, y = midten af skærmen)
  leftX = width*0.05;
  leftY = height/2-paddleHeight/2;

  // Start koordinator til bolden
  ballY = height/2;
  ballX = width/2;
  ballSize = 15;

  ballXspeed = 10;
  ballYspeed = random(-10, 10);
}

function draw() {  
  background(0);
  fill(255);
  noStroke();

  //Tegn to rektangler som to spillere
  rect(leftX, leftY, paddleWidth, paddleHeight);
  rect(rightX, rightY, paddleWidth, paddleHeight);

  //Tegn en circle som bold
  ellipse(ballX, ballY, ballSize, ballSize);

  //Tjek om spilleren rykker sig
  checkleftYPlayerMovement(leftY);
  checkRightYPlayerMovement(rightY);

  moveBall(ballX, ballY);
  checkBallCollision();
}

// Funktion der får bolden til at bevæge sig
function moveBall() {
  ballX += ballXspeed;
  ballY += ballYspeed;
} 

function checkBallCollision() {
  //Paddle collision detection
  if (ballX + ballSize/2 > width*0.95 && ballY > rightY && ballY < rightY+paddleHeight) {
    ballXspeed *= -1;
  } else if (ballX - ballSize/2 < width*0.05 + paddleWidth && ballY > leftY && ballY < leftY+paddleHeight) {
    ballXspeed *= -1;
  }

  //Change y-direction if the ball touches top or bottom of canvas
  if (ballY < 0 || ballY > height) {
    ballYspeed *= -1;
  }

  //Reset bolden hvis den er out of bounds
  if (ballX < width*0.05 || ballX + ballSize/2 > width*0.95+paddleWidth) {
    resetBall();
  }
}


function resetBall() {
  ballY = height/2;
  ballX = width/2;
  ballYspeed = random(-5, 5);
  ballXspeed *= -1;
}

// Funktion der tjekker om right spiller bevæger sig
function checkRightYPlayerMovement(y) {
  if (isPlayerInbound(y)) {
    rightY = mouseY;
  } else {
    if (y > height/2) {
      rightY -= 5;
    } else if (y < height/2) {
      rightY += 5;
    }
  }
}

// Funktion der tjekker om left spiller bevæger sig
function checkleftYPlayerMovement(y) {
  if (isPlayerInbound(y)) {
    if (keyIsDown(DOWN_ARROW)) {
      leftY += 20;
    } else if (keyIsDown(UP_ARROW)) { 
      leftY -= 20;
    }
  } else {
    if (y > height/2) {
      leftY -= 5;
    } else if (y < height/2) {
      leftY += 5;
    }
  }
}

// Funktion der tjekker om spilleren er inde på banen
function isPlayerInbound(y) {
  if (y < 0 || y+(paddleHeight) > height) {
    return false;
  } else {
    return true;
  }
}