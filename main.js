const initialRemainingTime = 360;
const cellSize = 70;
const cellRow = 4;
const cellCol = 4;
const cellSwapCount = 1000;

const gameStatus = {
  isGameStart: false,
  isGameClear: false,
  isGameOver: false,
  startTime: 0,
  remainingTime: 0,
};

const mainContainer = {
  element: null,
  width: 320,
  height: 480,
};

const screenContainer = {
  element: null,
  width: mainContainer.width - 10,
  height: mainContainer.height - 10,
};

const debugContainer = {
  element: null,
  width: 240,
  height: 32,
};

const canvas = {
  element: null,
  context: null,
  width: screenContainer.width,
  height: screenContainer.height,
};

const loaderContainer = { progressBarElement: null, messageElement: null };

const images = [
  {
    name: "birdWingUp",
    path: "image/bird_wing_up.png",
    element: null,
    isLoaded: false,
  },
  {
    name: "heartFull",
    path: "image/heart_full.png",
    element: null,
    isLoaded: false,
  },
  {
    name: "heartEmpty",
    path: "image/heart_empty.png",
    element: null,
    isLoaded: false,
  },
  {
    name: "balloon",
    path: "image/balloon.png",
    element: null,
    isLoaded: false,
  },
  {
    name: "scarecrow",
    path: "image/scarecrow.png",
    element: null,
    isLoaded: false,
  },
];

const init = () => {
  mainContainer.element = document.getElementById("main-container");
  mainContainer.element.style.position = "relative";
  mainContainer.element.style.width = mainContainer.width + "px";
  mainContainer.element.style.height = mainContainer.height + "px";
  mainContainer.element.style.margin = "5px";
  mainContainer.element.style.fontFamily =
    "'Helvetica Neue',Arial, 'Hiragino Kaku Gothic ProN','Hiragino Sans', Meiryo, sans-serif";
  mainContainer.element.style.backgroundColor = "#f5deb3";
  mainContainer.element.style.border = "2px solid #deb887";
  mainContainer.element.style.boxSizing = "border-box";
  mainContainer.element.style.borderRadius = "5px";
  mainContainer.element.style.display = "flex";
  mainContainer.element.style.alignItems = "center";
  mainContainer.element.style.justifyContent = "center";
  mainContainer.element.style.flexDirection = "column";
  mainContainer.element.style.overflow = "hidden";
  mainContainer.element.style.userSelect = "none";
  mainContainer.element.style.webkitUserSelect = "none";

  screenContainer.element = document.createElement("div");
  screenContainer.element.style.position = "relative";
  screenContainer.element.style.width = screenContainer.width + "px";
  screenContainer.element.style.height = screenContainer.height + "px";
  screenContainer.element.style.margin = "1px";
  screenContainer.element.style.display = "flex";
  screenContainer.element.style.alignItems = "center";
  screenContainer.element.style.justifyContent = "center";
  screenContainer.element.style.backgroundColor = "black";
  mainContainer.element.appendChild(screenContainer.element);

  loaderContainer.progressBarElement = document.createElement("div");
  loaderContainer.progressBarElement.classList.add("progress-bar");
  loaderContainer.progressBarElement.style.position = "absolute";
  loaderContainer.messageElement = document.createElement("div");
  loaderContainer.messageElement.classList.add("message");
  loaderContainer.messageElement.textContent = "読み込み中...";
  screenContainer.element.appendChild(loaderContainer.progressBarElement);
  screenContainer.element.appendChild(loaderContainer.messageElement);

  controller.init();

  canvas.element = document.createElement("canvas");
  canvas.element.style.cursor = "pointer";
  screenContainer.element.appendChild(canvas.element);

  canvas.context = canvas.element.getContext("2d");
  canvas.element.width = canvas.width;
  canvas.element.height = canvas.height;
  canvas.context.fillStyle = "lightblue";
  canvas.context.fillRect(0, 0, canvas.width, canvas.height);

  loadImages();
  draw();
};

const controller = {
  isPressed: false,
  init: () => {
    const handleButtonDown = (e) => {
      e.preventDefault();
      controller.isPressed = true;
    };

    const handleButtonUp = (e) => {
      e.preventDefault();
      controller.isPressed = false;
    };

    if (window.ontouchstart === null) {
      screenContainer.element.ontouchstart = handleButtonDown;
      screenContainer.element.ontouchend = handleButtonUp;
    } else {
      screenContainer.element.onpointerdown = handleButtonDown;
      screenContainer.element.onpointerup = handleButtonUp;
    }
  },
};

const loadImages = () => {
  images.forEach((image) => {
    image.element = new Image();
    image.element.src = image.path;
    image.element.onload = () => {
      image.isLoaded = true;
    };
  });
};

const world = {
  x: 0,
};

const draw = () => {
  if (images.some((image) => image.isLoaded === false)) {
    return;
  }
  loaderContainer.progressBarElement.style.display = "none";
  loaderContainer.messageElement.style.display = "none";

  canvas.context.beginPath();
  canvas.context.fillStyle = "lightblue";
  canvas.context.globalAlpha = 1;
  canvas.context.fillRect(0, 0, canvas.width, canvas.height * 0.8);
  canvas.context.fillStyle = "green";
  canvas.context.fillRect(0, canvas.height * 0.8, canvas.width, canvas.height);
  canvas.context.closePath();
  canvas.context.drawImage(
    images.find((image) => image.name === "heartFull").element,
    0,
    0
  );
  canvas.context.drawImage(
    images.find((image) => image.name === "heartFull").element,
    32,
    0
  );
  canvas.context.drawImage(
    images.find((image) => image.name === "heartEmpty").element,
    64,
    0
  );
  canvas.context.drawImage(
    images.find((image) => image.name === "balloon").element,
    100 - world.x,
    200
  );
  canvas.context.drawImage(
    images.find((image) => image.name === "scarecrow").element,
    250 - world.x,
    400
  );

  // mountain
  canvas.context.beginPath();
  canvas.context.moveTo(50 - world.x, 390);
  canvas.context.lineTo(130 - world.x, 290);
  canvas.context.quadraticCurveTo(140 - world.x, 280, 150 - world.x, 290);
  canvas.context.lineTo(230 - world.x, 390);
  canvas.context.strokeStyle = "#2f4f4f";
  canvas.context.fillStyle = "#2f4f4f";
  canvas.context.globalAlpha = 1;
  canvas.context.fill();
  canvas.context.stroke();
  canvas.context.closePath();

  // bird update
  bird.update();
  bird.draw();

  // cloud
  canvas.context.beginPath();
  canvas.context.ellipse(100 - world.x, 100, 70, 25, 0, 0, 2 * Math.PI);
  canvas.context.strokeStyle = "#ffffff";
  canvas.context.fillStyle = "#ffffff";
  canvas.context.globalAlpha = 0.7;
  canvas.context.fill();
  canvas.context.stroke();
  canvas.context.closePath();

  world.x;
};

const bird = {
  element: null,
  x: 50,
  y: 200,
  width: 32,
  height: 44,
  update: () => {
    bird.x++;
    if (controller.isPressed) {
      bird.y -= 4;
    } else {
      bird.y += 3;
    }
    bird.y = Math.max(0, Math.min(bird.y, canvas.height - 80));
  },

  draw: () => {
    canvas.context.globalAlpha = 1;
    canvas.context.drawImage(
      images.find((image) => image.name === "birdWingUp").element,
      bird.x - world.x,
      bird.y
    );
  },
};

const showGameClearMessage = () => {
  let messageElement = document.createElement("div");
  messageElement.style.position = "relative";
  messageElement.style.zIndex = "1";
  messageElement.style.width = screenContainer.width + "px";
  messageElement.style.height = screenContainer.height * 0.9 + "px";
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.color = "blue";
  messageElement.style.fontSize = "32px";
  messageElement.textContent = "Game Clear !!";
  screenContainer.element.appendChild(messageElement);
};

const showGameOverMessage = () => {
  let messageElement = document.createElement("div");
  messageElement.style.position = "relative";
  messageElement.style.zIndex = "1";
  messageElement.style.width = screenContainer.width + "px";
  messageElement.style.height = screenContainer.height * 0.9 + "px";
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.color = "red";
  messageElement.style.fontSize = "32px";
  messageElement.textContent = "Game Over";
  screenContainer.element.appendChild(messageElement);
};

const tick = () => {
  if (gameStatus.isGameClear || gameStatus.isGameOver) {
    return;
  }

  if (gameStatus.isGameStart) {
    //TODO
  }

  draw();
  requestAnimationFrame(tick);
};

window.onload = () => {
  init();
  tick();
};
