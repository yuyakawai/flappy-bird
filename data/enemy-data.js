export const enemyData = [
  {
    id: 1,
    name: "scarecrow",
    width: 32,
    height: 38,
    update: (e) => {
      // empty
    },
  },
  {
    id: 2,
    name: "balloon",
    width: 32,
    height: 38,
    update: (e) => {
      e.option.time++;
      e.y += Math.sin(e.option.time * 0.05) * 3;
    },
  },
  {
    id: 3,
    name: "jelly",
    width: 32,
    height: 32,
    update: (e) => {
      // empty
    },
  },
  {
    id: 4,
    name: "snowman",
    width: 32,
    height: 38,
    update: (e) => {
      // empty
    },
  },
];
