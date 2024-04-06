export const enemyData = [
  {
    name: "scarecrow",
    width: 32,
    height: 38,
    collisionMargin: 8,
    isRotateAnimation: false,
    update: (e) => {
      // empty
    },
  },
  {
    name: "balloon_red",
    width: 32,
    height: 38,
    collisionMargin: 0,
    isRotateAnimation: false,
    update: (e) => {
      e.option.time++;
      e.y += Math.sin(e.option.time * 0.05) * 3;
    },
  },
  {
    name: "balloon_blue",
    width: 32,
    height: 38,
    collisionMargin: 4,
    isRotateAnimation: false,
    update: (e) => {
      e.option.time++;
      e.x--;
      e.y += Math.sin(e.option.time * 0.05) * 3;
    },
  },
  {
    name: "balloon_green",
    width: 32,
    height: 38,
    collisionMargin: 4,
    isRotateAnimation: false,
    update: (e) => {
      e.option.time++;
      e.x -= Math.sin(e.option.time * 0.1) * 3;
      e.y += Math.sin(e.option.time * 0.05) * 3;
    },
  },
  {
    name: "jelly_blue",
    width: 32,
    height: 32,
    collisionMargin: 0,
    isRotateAnimation: false,
    update: (e) => {
      // empty
    },
  },
  {
    name: "jelly_pink",
    width: 32,
    height: 32,
    collisionMargin: 0,
    isRotateAnimation: false,
    update: (e) => {
      // empty
    },
  },
  {
    name: "jelly_yellow",
    width: 32,
    height: 32,
    collisionMargin: 0,
    isRotateAnimation: false,
    update: (e) => {
      // empty
    },
  },
  {
    name: "jelly_green",
    width: 32,
    height: 32,
    collisionMargin: 0,
    isRotateAnimation: false,
    update: (e) => {
      // empty
    },
  },
  {
    name: "jelly_gray",
    width: 32,
    height: 32,
    collisionMargin: 0,
    isRotateAnimation: false,
    update: (e) => {
      // empty
    },
  },
  {
    name: "snowman",
    width: 32,
    height: 38,
    collisionMargin: 8,
    isRotateAnimation: false,
    update: (e) => {
      // empty
    },
  },
  {
    name: "snowball",
    width: 32,
    height: 32,
    collisionMargin: 8,
    isRotateAnimation: false,
    update: (e) => {
      e.option.initSpeedX += e.option.accelerationX;
      e.option.initSpeedY += e.option.accelerationY;
      e.x += e.option.initSpeedX;
      e.y += e.option.initSpeedY;
    },
  },
  {
    name: "sickle",
    width: 32,
    height: 32,
    collisionMargin: 2,
    isRotateAnimation: true,
    update: (e) => {
      e.option.initSpeedX += e.option.accelerationX;
      e.option.initSpeedY += e.option.accelerationY;
      e.x += e.option.initSpeedX;
      e.y += e.option.initSpeedY;
    },
  },
  {
    name: "mailbox",
    width: 32,
    height: 32,
    collisionMargin: 0,
    isRotateAnimation: false,
    update: (e) => {
      // empty
    },
  },
  {
    name: "rock",
    width: 32,
    height: 32,
    collisionMargin: 8,
    isRotateAnimation: false,
    update: (e) => {
      e.option.initSpeedX += e.option.accelerationX;
      e.option.initSpeedY += e.option.accelerationY;
      e.x += e.option.initSpeedX;
      e.y += e.option.initSpeedY;
    },
  },
];
