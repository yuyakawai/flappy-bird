export const enemyData = [
  {
    name: "scarecrow",
    width: 32,
    height: 38,
    update: (e) => {
      // empty
    },
  },
  {
    name: "balloon_red",
    width: 32,
    height: 38,
    update: (e) => {
      e.option.time++;
      e.y += Math.sin(e.option.time * 0.05) * 3;
    },
  },
  {
    name: "balloon_blue",
    width: 32,
    height: 38,
    update: (e) => {
      e.option.time++;
      e.y += Math.sin(e.option.time * 0.05) * 3;
    },
  },
  {
    name: "balloon_green",
    width: 32,
    height: 38,
    update: (e) => {
      e.option.time++;
      e.y += Math.sin(e.option.time * 0.05) * 3;
    },
  },
  {
    name: "jelly_blue",
    width: 32,
    height: 32,
    update: (e) => {
      // empty
    },
  },
  {
    name: "jelly_pink",
    width: 32,
    height: 32,
    update: (e) => {
      // empty
    },
  },
  {
    name: "jelly_yellow",
    width: 32,
    height: 32,
    update: (e) => {
      // empty
    },
  },
  {
    name: "jelly_green",
    width: 32,
    height: 32,
    update: (e) => {
      // empty
    },
  },
  {
    name: "jelly_gray",
    width: 32,
    height: 32,
    update: (e) => {
      // empty
    },
  },
  {
    name: "snowman",
    width: 32,
    height: 38,
    update: (e) => {
      // empty
    },
  },
  {
    name: "snowball",
    width: 32,
    height: 32,
    update: (e) => {
      e.x--;
      e.y--;
    },
  },
  {
    name: "mailbox",
    width: 32,
    height: 32,
    update: (e) => {
      // empty
    },
  },
];
