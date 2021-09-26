const createtable = () => {
  let table = [...Array(5)].map((x) => Array(5).fill(0));
  for (let y = 0; y < table.length; y++) {
    for (let x = 0; x < 5; x++) {
      table[y][x] = { x: x, y: table.length - 1 - y, occupied: false };
    }
  }
  return table;
};
let table = createtable();

const Robot = (x, y, direction) => {
  let location = [x, y];
  let compass = [
    { name: "north", active: true },
    { name: "east", active: false },
    { name: "south", active: false },
    { name: "west:", active: false },
  ];

  const place = () => {
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table.length; k++) {
        if (table[i][k].x == x && table[i][k].y == y) {
          return (table[i][k].occupied = true);
        }
      }
    }
  };

  const changeboard = () => {
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table.length; k++) {
        if (table[i][k].x == location[0] && table[i][k].y == location[1]) {
          return (table[i][k].occupied = true);
        }
      }
    }
  };
  const updateboard = () => {
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table.length; k++) {
        if (table[i][k].x == location[0] && table[i][k].y == location[1]) {
          return (table[i][k].occupied = false);
        }
      }
    }
  };

  const report = () => {
    let direction = compass.find((o) => o.active === true);

    return console.log(`${location[0]},${location[1]},${direction.name}`);
  };

  const isvalid = (location) => {
    if (location[0] === 5 || location[0] === -1) {
      return false;
    } else if (location[1] === -1 || location[1] === 5) {
      return false;
    }
    return true;
  };

  const move = () => {
    //switch case
    if (compass[0].active == true && isvalid([location[0], location[1] + 1])) {
      updateboard();
      location[1] = location[1] + 1;
      changeboard();
    } else if (
      compass[1].active == true &&
      isvalid([location[0] + 1, location[1]])
    ) {
      updateboard();
      location[0] = location[0] + 1;
      changeboard();
    } else if (
      compass[2].active === true &&
      isvalid([location[0], location[1] - 1])
    ) {
      updateboard();
      location[1] = location[1] - 1;
      changeboard();
    } else if (
      compass[3].active === true &&
      isvalid([location[0] - 1, location[1]])
    ) {
      updateboard();
      location[0] = location[0] - 1;
      changeboard();
    }
  };

  const left = () => {
    compass.find((o, i) => {
      //this is sloppy
      if (o.active == true) {
        if (i == 0) {
          compass[i].active = false;
          compass[3].active = true;
          return true;
        } else {
          compass[i].active = false;
          compass[i - 1].active = true;
          return true;
        }
      }
    });
  };
  const right = () => {
    compass.find((o, i) => {
      //this is sloppy
      if (o.active == true) {
        if (i == 3) {
          compass[i].active = false;
          compass[0].active = true;
          return true;
        } else {
          compass[i].active = false;
          compass[i + 1].active = true;
          return true;
        }
      }

      //compass[i].active = false;
    });
    return compass;
  };
  //find index of true value
  //change to false
  //move -1 change true

  return { place, move, report, left, right };
};

//report
//direction left and right
//move
const robot1 = Robot(1, 2);

robot1.place();
robot1.right();
robot1.move();
robot1.move();
robot1.left();
robot1.move();
robot1.report();
