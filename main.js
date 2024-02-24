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

const canvas = {
  element: null,
  context: null,
  width: screenContainer.width,
  height: screenContainer.height,
};

const loaderContainer = { progressBarElement: null, messageElement: null };

const images = [
  { name: "bird", path: "image/bird.png", element: null, isLoaded: false },
  { name: "heart", path: "image/hear.png", element: null, isLoaded: false },
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

const loadImages = () => {
  images.forEach((image) => {
    image.element = new Image();
    image.element.src = image.path;
    image.element.onload = () => {
      image.isLoaded = true;
    };
  });
};

const draw = () => {
  if (images.some((image) => image.isLoaded === false)) {
    return;
  }
  loader.element.style.display = "none";

  canvas.context.beginPath();
  canvas.context.fillStyle = "lightblue";
  canvas.context.fillRect(0, 0, canvas.width, canvas.height * 0.8);
  canvas.context.fillStyle = "green";
  canvas.context.fillRect(0, canvas.height * 0.8, canvas.width, canvas.height);

  canvas.context.drawImage(
    images.find((image) => image.name === "heart").element,
    0,
    0
  );
};

const bird = {
  element: null,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  init: () => {},

  update: () => {
    bird.element.style.left = bird.x + "px";
    bird.element.style.top = bird.y + "px";
  },
};

const cells = [...Array(cellRow * cellCol)].map((_, index) => {
  return {
    element: null,
    number: index + 1,
    isEmpty: false,
    x: 0,
    y: 0,
    init: () => {
      cells[index].x = index % cellRow;
      cells[index].y = Math.trunc(index / cellRow);
      cells[index].element = document.createElement("div");
      cells[index].element.style.position = "absolute";
      cells[index].element.style.width = cellSize + "px";
      cells[index].element.style.height = cellSize + "px";
      cells[index].element.style.left = cells[index].x * cellSize + "px";
      cells[index].element.style.top = cells[index].y * cellSize + "px";
      cells[index].element.style.border = "3px ridge #cb986f";
      cells[index].element.style.backgroundColor = "#ccb28e";
      cells[index].element.style.boxSizing = "border-box";
      cells[index].element.style.fontSize = cellSize * 0.6 + "px";
      cells[index].element.style.display = "flex";
      cells[index].element.style.alignItems = "center";
      cells[index].element.style.justifyContent = "center";
      cells[index].element.style.cursor = "pointer";
      cells[index].element.textContent = cells[index].number;
      screenContainer.element.appendChild(cells[index].element);

      if (index === cells.length - 1) {
        cells[index].isEmpty = true;
      }

      const handleEvent = (selfObject) => {
        return (e) => {
          e.preventDefault();
          if (
            gameStatus.isGameStart === false ||
            gameStatus.isGameClear ||
            gameStatus.isGameOver
          ) {
            return;
          }
          selfObject.swapCell(selfObject);
        };
      };

      if (window.ontouchstart === null) {
        cells[index].element.ontouchstart = handleEvent(cells[index]);
      } else {
        cells[index].element.onpointerdown = handleEvent(cells[index]);
      }
    },

    update: () => {},
  };
});

const resetGame = () => {
  gameStatus.startTime = performance.now();
  cells[0].swapNumber();
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
