const canvas = document.getElementById("canvas");
let screenWidth = canvas.parentElement.clientWidth;
let screenHeight = canvas.parentElement.clientHeight;
canvas.width = screenWidth;
canvas.height = screenHeight;
const ctx = canvas.getContext("2d");
const headerBtn = document.getElementById("headerButton");
const timer = document.getElementById("timer");
const score = document.getElementById("score");

// Class

class hinhChuNhat {
  constructor(x, sizeX, sizeY) {
    this.x = x;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.y = -this.sizeY;
    this.spd = 2;
  }

  posUpd() {
    this.y = this.y + this.spd;
  }

  draw() {
    ctx.drawImage(texture, this.x, this.y, this.sizeX, this.sizeY);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY);
  }
}

class hinhVuong {
  constructor(x, size) {
    this.x = x;
    this.sizeX = size;
    this.sizeY = this.sizeX;
    this.y = -this.size;
    this.spd = 2;
  }

  posUpd() {
    this.y = this.y + this.spd;
  }

  draw() {
    ctx.drawImage(texture, this.x, this.y, this.sizeX, this.sizeY);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY);
  }
}

class hinhBinhHanh {
  constructor(x, sizeX, sizeY, offset) {
    this.x = x;
    this.sizeX = sizeX;
    this.offset = offset;
    this.sizeY = sizeY;
    this.y = -this.sizeY;
    this.spd = 2;
  }

  posUpd() {
    this.y = this.y + this.spd;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.sizeX, this.y);
    ctx.lineTo(this.x + this.sizeX + this.offset, this.y + this.sizeY);
    ctx.lineTo(this.x + this.offset, this.y + this.sizeY);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      texture,
      this.x,
      this.y,
      this.sizeX + this.offset,
      this.sizeY,
    );

    ctx.restore();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

class hinhThang {
  constructor(x, sizeX, sizeY, offset) {
    this.x = x;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.offset = offset;
    this.y = -this.sizeY;
    this.spd = 2;
  }

  posUpd() {
    this.y = this.y + this.spd;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.sizeX, this.y);
    ctx.lineTo(this.x + this.sizeX + this.offset, this.y + this.sizeY);
    ctx.lineTo(this.x - this.offset, this.y + this.sizeY);
    ctx.closePath();

    ctx.clip();

    ctx.drawImage(
      texture,
      this.x - this.offset,
      this.y,
      this.sizeX + this.offset * 2,
      this.sizeY,
    );

    ctx.restore();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

class hinhThoi {
  constructor(x, sizeX, sizeY, offset) {
    this.x = x;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.offset = offset;
    this.y = -this.sizeY;
    this.spd = 2;
  }

  posUpd() {
    this.y = this.y + this.spd;
  }

  draw() {
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(this.x + this.sizeX / 2, this.y);

    ctx.lineTo(this.x + this.sizeX, this.y + this.sizeY / 2);
    ctx.lineTo(this.x + this.sizeX / 2, this.y + this.sizeY);
    ctx.lineTo(this.x, this.y + this.sizeY / 2);

    ctx.closePath();

    ctx.clip();

    ctx.drawImage(texture, this.x, this.y, this.sizeX, this.sizeY);

    ctx.restore();

    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

class check {
  constructor(x, y, answer) {
    this.x = x;
    this.y = y;
    this.answer = answer;
  }
  draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.font = "20px serif";
    if (this.answer == true) {
      ctx.fillText("+10", this.x, this.y);
    } else {
      ctx.fillText("-5", this.x, this.y);
    }
  }
}

// Variables

const shapes = [];
const checks = [];
const texture = new Image();
texture.src = "src/img/round1/wood.png";

texture.onload = () => {
  gameLoop();
};

// Functions

function addElements() {
  if (time <= 0) return;

  const delay = (0.5 + Math.random() * 0.5) * 1000;

  setTimeout(() => {
    spawnShape();
    addElements();
  }, delay);
}

function spawnShape() {
  const random = Math.floor(Math.random() * 9);

  switch (random) {
    case 0:
      shapes.push(
        new hinhBinhHanh(
          Math.random() * (canvas.width - 300),
          150 + Math.random() * 100,
          100 + Math.random() * 100,
          25 + Math.random() * 25,
        ),
      );
      break;

    case 1:
      shapes.push(
        new hinhChuNhat(
          Math.random() * (canvas.width - 250),
          150 + Math.random() * 100,
          100 + Math.random() * 100,
        ),
      );
      break;

    case 2:
      shapes.push(
        new hinhThang(
          Math.random() * (canvas.width - 300),
          150 + Math.random() * 100,
          100 + Math.random() * 100,
          25 + Math.random() * 25,
        ),
      );
      break;

    case 3:
      shapes.push(
        new hinhThoi(
          Math.random() * (canvas.width - 300),
          150 + Math.random() * 100,
          100 + Math.random() * 100,
          25 + Math.random() * 25,
        ),
      );
      break;

    default:
      // 4,5,6,7,8
      shapes.push(
        new hinhVuong(
          Math.random() * (canvas.width - 200),
          100 + Math.random() * 100,
        ),
      );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let hinh in shapes) {
    if (shapes[hinh].y - shapes[hinh].sizeY > screenHeight) {
      shapes.splice(hinh, 1);
      continue;
    }
    shapes[hinh].posUpd();
    shapes[hinh].draw();
  }
  for (let i in checks) {
    checks[i].draw();
  }
  requestAnimationFrame(animate);
}

function timeSet() {
  setTimeout(() => {
    if (time > 0) {
      time -= 1;
      timer.textContent = "Thời gian: " + time + " giây";
      requestAnimationFrame(timeSet);
    }
  }, 1000);
}

function getMousePosition(event) {
  let rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  console.log(mouseX + " - " + mouseY);
}

function checkSelected(shape) {
  if (
    mouseX > shape.x &&
    mouseX < shape.x + shape.sizeX &&
    mouseY > shape.y &&
    mouseY < shape.y + shape.sizeY
  ) {
    return true;
  } else {
    return false;
  }
}

function correct(x, y, isCorrect) {
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.font = "20px serif";
  if (isCorrect == true) {
    ctx.fillText("+10", x, y);
  } else {
    ctx.fillText("-5", x, y);
  }
}

// Events

let mouseX = 0;
let mouseY = 0;

let gameStarted = false;
let currentScore = 0;
let time = 30;

let pattern;

texture.onload = () => {
  pattern = ctx.createPattern(texture, "repeat");
};

headerBtn.addEventListener("click", () => {
  if (gameStarted == false) {
    animate();
    addElements();
    timeSet();
    gameStarted = true;
  }
});

canvas.addEventListener("mousedown", (event) => {
  for (let i in shapes) {
    if (checkSelected(shapes[i]) == true) {
      if (shapes[i] instanceof hinhChuNhat) {
        currentScore += 10;
        checks.push(new check(mouseX, mouseY, true));
        setTimeout(() => {
          checks.splice(0, 1);
        }, 1000);
      } else {
        currentScore -= 5;
        checks.push(new check(mouseX, mouseY, false));
        setTimeout(() => {
          checks.splice(0, 1);
        }, 1000);
      }
      score.textContent = "Điểm: " + currentScore;
      shapes.splice(i, 1);
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  getMousePosition(e);
});

window.addEventListener("resize", () => {
  canvas.width = screenWidth;
  canvas.height = screenHeight;
});
