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
];
