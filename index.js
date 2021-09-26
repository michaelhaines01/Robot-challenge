const tablemodule = () => {
  const createtable = () => {
    let table = [...Array(5)].map((x) => Array(5).fill(0));
    for (let y = 0; y < table.length; y++) {
      for (let x = 0; x < 5; x++) {
        table[y][x] = { x: x, y: table.length - 1 - y, occupied: false };
      }
    }
    return table;
  };

  const placetable = (table) => {
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table.length; k++) {
        if (table[i][k].x == x && table[i][k].y == y) {
          return (table[i][k].occupied = true);
        }
      }
    }
  };
  const changeboard = (table) => {
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table.length; k++) {
        if (table[i][k].x == location[0] && table[i][k].y == location[1]) {
          return (table[i][k].occupied = true);
        }
      }
    }
  };
  const updateboard = (table) => {
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table.length; k++) {
        if (table[i][k].x == location[0] && table[i][k].y == location[1]) {
          return (table[i][k].occupied = false);
        }
      }
    }
  };

  return { createtable, placetable, changeboard, updateboard };
};

const Robot = (x, y, table) => {
  let location = [x, y];
  let compass = [
    { name: "north", active: true },
    { name: "east", active: false },
    { name: "south", active: false },
    { name: "west:", active: false },
  ];

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
      table.updateboard();
      location[1] = location[1] + 1;
      table.changeboard();
    } else if (
      compass[1].active == true &&
      isvalid([location[0] + 1, location[1]])
    ) {
      table.updateboard();
      location[0] = location[0] + 1;
      table.changeboard();
    } else if (
      compass[2].active === true &&
      isvalid([location[0], location[1] - 1])
    ) {
      table.updateboard();
      location[1] = location[1] - 1;
      table.changeboard();
    } else if (
      compass[3].active === true &&
      isvalid([location[0] - 1, location[1]])
    ) {
      table.updateboard();
      location[0] = location[0] - 1;
      table.changeboard();
    }
  };
  //turn left
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

  return { move, report, left, right };
};

//report
//direction left and right
//move
tablemodule();
let table = tablemodule().createtable();
const robot1 = Robot(1, 2);

robot1.move();

robot1.report();
