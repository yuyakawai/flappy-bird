import { images } from "./images.js";
import { enemyData } from "./data/enemy-data.js";
import { mapData } from "./data/map-data.js";
import { stageData } from "./data/stage-data.js";

let enemyList = [];

const gameStatus = {
  currentScene: null,
  isGameStart: false,
  isGameClear: false,
  isGameOver: false,
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

const loaderContainer = {
  progressBarElement: null,
  messageElement: null,
};

window.onload = () => {
  init();
};

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
  loadMap(world.stage);
  gameStatus.currentScene = scene.find((e) => e.name === "loadingImage");
  tick();
};

const scene = [
  {
    name: "loadingImage",
    update: () => {
      updateImageLoading();
    },
  },
  {
    name: "title",
    update: () => {
      updateTitle();
    },
  },
  {
    name: "gameover",
    update: () => {
      updateGameOver();
    },
  },
  {
    name: "stageClearBirdDown",
    update: () => {
      updateStageClearBirdDown();
    },
  },
  {
    name: "stageClearJellySpeech",
    update: () => {
      updateStageClearJellySpeech();
    },
  },
  {
    name: "nextStageMove",
    update: () => {
      updateNextStageMove();
    },
  },
  {
    name: "gamePlay",
    update: () => {
      updateGamePlay();
    },
  },
];

const tick = () => {
  gameStatus.currentScene.update();
  requestAnimationFrame(tick);
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
  stage: 0,
  x: 0,
};

const loadMap = (stage) => {
  enemyList = [];
  mapData
    .filter((e) => e.stage === stage)
    .forEach((e) => {
      const ed = enemyData.filter((enemy) => enemy.name === e.name).pop();
      setEnemy(e.name, e.x, e.y, ed.width, ed.height, e.option, ed.update);
    });
};

const updateImageLoading = () => {
  if (images.some((image) => image.isLoaded === false)) {
    return;
  }
  loaderContainer.progressBarElement.style.display = "none";
  loaderContainer.messageElement.style.display = "none";
  gameStatus.currentScene = scene.find((e) => e.name === "title");
};

const updateTitle = () => {
  drawGround();
  drawMountain();
  drawEnemy();
  drawSpeechBubble(160, 200, "画面をタップしてスタート");
  canvas.context.drawImage(
    images.find((image) => image.name === "title").element,
    70,
    30
  );
  drawCloud();

  world.x++;
  if (world.x > 1000) {
    world.x = 0;
  }
  if (controller.isPressed) {
    gameStatus.isGameStart = true;
    gameStatus.currentScene = scene.find((e) => e.name === "nextStageMove");
  }
};

const updateGameOver = () => {
  drawGameOverMessage();
  if (controller.isPressed) {
    resetGame();
    gameStatus.currentScene = scene.find((e) => e.name === "title");
  }
};

const updateStageClearBirdDown = () => {
  bird.y += 3;
  drawGround();
  drawMountain();
  life.draw();
  updateEnemy();
  drawEnemy();
  drawCloud();
  bird.draw();
  if (bird.y >= canvas.height - 80) {
    gameStatus.currentScene = scene.find(
      (e) => e.name === "stageClearJellySpeech"
    );
  }
};

const updateStageClearJellySpeech = () => {
  drawGround();
  drawMountain();
  life.draw();
  updateEnemy();
  drawEnemy();
  drawCloud();
  drawSpeechBubble(160, 200, "お手紙ありがとう！！");
  bird.draw();
  if (controller.isPressed) {
    gameStatus.currentScene = scene.find((e) => e.name === "nextStageMove");
  }
};

const updateNextStageMove = () => {
  world.stage++;
  world.x = 0;
  bird.resetPosition();
  loadMap(world.stage);
  gameStatus.currentScene = scene.find((e) => e.name === "gamePlay");
};

const updateGamePlay = () => {
  drawGround();
  drawMountain();

  bird.update();
  bird.draw();
  life.draw();

  updateEnemy();
  drawEnemy();
  drawCloud();

  if (world.x > stageData.find((e) => e.stage === world.stage).stageGoalX) {
    gameStatus.currentScene = scene.find(
      (e) => e.name === "stageClearBirdDown"
    );
    return;
  }

  if (gameStatus.isGameOver) {
    gameStatus.currentScene = scene.find((e) => e.name === "gameover");
    return;
  }

  world.x++;
};

const drawGround = () => {
  canvas.context.beginPath();
  canvas.context.fillStyle = stageData.find(
    (e) => e.stage === world.stage
  ).skyColor;
  canvas.context.fillRect(0, 0, canvas.width, canvas.height * 0.8);
  canvas.context.fillStyle = stageData.find(
    (e) => e.stage === world.stage
  ).groundColor;
  canvas.context.fillRect(0, canvas.height * 0.8, canvas.width, canvas.height);
  canvas.context.closePath();
};

const drawCloud = () => {
  if (stageData.find((e) => e.stage === world.stage).isCloud === false) {
    return;
  }

  [...Array(5)].map((_, index) => {
    canvas.context.beginPath();
    canvas.context.ellipse(
      250 * (index + 1) - world.x,
      100 * ((index % 2) + 1),
      70,
      25,
      0,
      0,
      2 * Math.PI
    );
    canvas.context.strokeStyle = "#ffffff";
    canvas.context.fillStyle = "#ffffff";
    canvas.context.globalAlpha = 0.7;
    canvas.context.fill();
    canvas.context.stroke();
    canvas.context.closePath();
  });
};

const drawMountain = () => {
  const color = stageData.find((e) => e.stage === world.stage).mountainColor;
  [...Array(5)].map((_, index) => {
    const dx = 500 * index + 100;
    canvas.context.beginPath();
    canvas.context.moveTo(50 + dx - world.x, 390);
    canvas.context.lineTo(130 + dx - world.x, 290);
    canvas.context.quadraticCurveTo(
      140 + dx - world.x,
      280,
      150 + dx - world.x,
      290
    );
    canvas.context.lineTo(230 + dx - world.x, 390);
    canvas.context.strokeStyle = color;
    canvas.context.fillStyle = color;
    canvas.context.globalAlpha = 1;
    canvas.context.fill();
    canvas.context.stroke();
    canvas.context.closePath();
  });
};

const life = {
  max: 5,
  count: 1,
  draw: () => {
    canvas.context.globalAlpha = 1;
    [...Array(life.max)].map((_, index) => {
      const imageName = index < life.count ? "heart_full" : "heart_empty";
      canvas.context.drawImage(
        images.find((image) => image.name === imageName).element,
        index * 32,
        0
      );
    });
  },
};

const bird = {
  x: 50,
  y: 200,
  width: 32,
  height: 32,
  isWingUp: true,
  isDamage: false,
  damageTime: 0,
  maxDamageTime: 64,
  isDead: false,

  update: () => {
    if (bird.y > canvas.height) {
      gameStatus.isGameOver = true;
    }

    if (bird.isDead) {
      bird.y += 3;
      return;
    }

    bird.x++;
    if (controller.isPressed) {
      bird.isWingUp = false;
      bird.y -= 4;
    } else {
      bird.isWingUp = true;
      bird.y += 3;
    }
    bird.y = Math.max(0, Math.min(bird.y, canvas.height - 80));

    if (bird.isDamage) {
      bird.damageTime++;
      if (bird.damageTime > bird.maxDamageTime) {
        bird.isDamage = false;
        bird.damageTime = 0;
      }
    } else {
      bird.checkCollision();
    }

    if (life.count === 0) {
      bird.isDead = true;
    }
  },

  draw: () => {
    canvas.context.globalAlpha = bird.isDamage ? 0.8 : 1;
    const imageName = bird.isDamage
      ? "bird_damage"
      : bird.isWingUp
      ? "bird_wing_up"
      : "bird_wing_down";

    canvas.context.save();
    canvas.context.translate(
      bird.x + bird.width / 2 - world.x,
      bird.y + bird.height / 2
    );
    canvas.context.rotate(bird.damageTime * 16 * (Math.PI / 180));
    canvas.context.drawImage(
      images.find((image) => image.name === imageName).element,
      -bird.width / 2,
      -bird.height / 2
    );
    canvas.context.restore();
  },

  checkCollision: () => {
    if (
      enemyList.some(
        (enemy) =>
          bird.x + bird.width > enemy.x &&
          bird.x < enemy.x + enemy.width &&
          bird.y + bird.height > enemy.y &&
          bird.y < enemy.y + enemy.height
      )
    ) {
      life.count--;
      bird.isDamage = true;
    }
  },

  resetPosition: () => {
    bird.x = 50;
    bird.y = 200;
  },
};

const setEnemy = (name, x, y, width, height, option, update) => {
  enemyList.push({
    name: name,
    x: x,
    y: y,
    width: width,
    height: height,
    option: option,
    update: update,
  });
};

const drawEnemy = () => {
  enemyList.forEach((enemy) => {
    canvas.context.drawImage(
      images.find((image) => image.name === enemy.name).element,
      enemy.x - world.x,
      enemy.y
    );
  });
};

const updateEnemy = () => {
  enemyList.forEach((enemy) => {
    enemy.update(enemy);
  });
};

const drawGameOverMessage = () => {
  canvas.context.globalAlpha = 1;
  canvas.context.font = "36px sans-serif";
  canvas.context.fillStyle = "red";
  canvas.context.fillText("Game Over", 55, 200);
};

const drawSpeechBubble = (x, y, text) => {
  const bubbleWidth = text.length * 20;
  const bubbleHeight = 40;
  const bubbleX = x - bubbleWidth / 2;
  const bubbleY = y - bubbleHeight;

  canvas.context.fillStyle = "lightyellow";
  canvas.context.strokeStyle = "burlywood";
  canvas.context.lineWidth = 1;
  canvas.context.beginPath();
  canvas.context.moveTo(bubbleX + 10, bubbleY);
  canvas.context.lineTo(bubbleX + bubbleWidth - 10, bubbleY);
  canvas.context.quadraticCurveTo(
    bubbleX + bubbleWidth,
    bubbleY,
    bubbleX + bubbleWidth,
    bubbleY + 10
  );
  canvas.context.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - 10);
  canvas.context.quadraticCurveTo(
    bubbleX + bubbleWidth,
    bubbleY + bubbleHeight,
    bubbleX + bubbleWidth - 10,
    bubbleY + bubbleHeight
  );
  canvas.context.lineTo(bubbleX + 10, bubbleY + bubbleHeight);
  canvas.context.quadraticCurveTo(
    bubbleX,
    bubbleY + bubbleHeight,
    bubbleX,
    bubbleY + bubbleHeight - 10
  );
  canvas.context.lineTo(bubbleX, bubbleY + 10);
  canvas.context.quadraticCurveTo(bubbleX, bubbleY, bubbleX + 10, bubbleY);

  canvas.context.fill();
  canvas.context.stroke();
  canvas.context.closePath();

  const edgeX = bubbleX + bubbleWidth * 0.7;
  const edgeY = bubbleY + bubbleHeight;
  canvas.context.moveTo(edgeX, edgeY);
  canvas.context.lineTo(edgeX + 20, edgeY + 20);
  canvas.context.lineTo(edgeX - 20, edgeY);
  canvas.context.fill();
  canvas.context.stroke();

  canvas.context.fillStyle = "black";
  canvas.context.font = "18px sans-serif";
  canvas.context.textAlign = "center";
  canvas.context.textBaseline = "middle";
  canvas.context.fillText(text, x, y - bubbleHeight / 2);
};

const resetGame = () => {
  gameStatus.isGameStart = false;
  gameStatus.isGameClear = false;
  gameStatus.isGameOver = false;
  world.stage = 0;
  world.x = 0;
  bird.resetPosition();
  bird.isDead = false;
  bird.isDamage = false;
  bird.damageTime = 0;
  life.count = life.max;
  loadMap(world.stage);
};
