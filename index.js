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
  //THIS DOESNT WORK
  const placetable = (location, table) => {
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table.length; k++) {
        if (table[i][k].x == location[0] && table[i][k].y == location[1]) {
          table[i][k].occupied = true;
          /*if (
            table[i][k].occupied === true &&
            table[i][k].x !== location[0] &&
            table[i][k].y !== location[1]
          ) {
            table[i][k].occupied = false;
          }
        }*/
          return table;
        }
      }
    }
  };
  const changeboard = (table, location) => {
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table.length; k++) {
        if (table[i][k].x == location[0] && table[i][k].y == location[1]) {
          table[i][k].occupied = true;
          return table;
        }
      }
    }
  };
  const updateboard = (table, location) => {
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table.length; k++) {
        if (table[i][k].x == location[0] && table[i][k].y == location[1]) {
          table[i][k].occupied = false;
          return table;
        }
      }
    }
  };

  return { createtable, placetable, changeboard, updateboard };
};

const Robot = (id, x, y, direction) => {
  let robotdirection = direction;
  let id = id;
  let location = [x, y];
  let compass = [
    { name: "NORTH", active: true },
    { name: "EAST", active: false },
    { name: "SOUTH", active: false },
    { name: "WEST:", active: false },
  ];
  const isvalid = (location) => {
    if (location[0] === 5 || location[0] === -1) {
      return false;
    } else if (location[1] === -1 || location[1] === 5) {
      return false;
    }
    return true;
  };

  place = (location) => {
    if (isvalid(location)) {
      tablemodule().placetable(location, table);

      return true;
    }
    return false;
  };
  place(location);
  if (place) {
    const setdirection = (robotdirection) => {
      compass.forEach((o, i) => {
        if (o.name === robotdirection) {
          compass[i].active = true;
        } else if (o.name !== robotdirection && o.active === true) {
          compass[i].active = false;
        }
      });
    };
    setdirection(robotdirection);

    const report = () => {
      console.log(compass);
      let facing = compass.find((o) => o.active === true);
      console.log(facing);
      return console.log(`${location[0]},${location[1]},${facing.name}`);
    };

    const move = () => {
      //switch case
      if (
        compass[0].active == true &&
        isvalid([location[0], location[1] + 1])
      ) {
        tablemodule().updateboard(table, location);
        location[1] = location[1] + 1;
        console.log(location);
        tablemodule().changeboard(table, location);
      } else if (
        compass[1].active == true &&
        isvalid([location[0] + 1, location[1]])
      ) {
        tablemodule().updateboard(table, location);
        location[0] = location[0] + 1;
        tablemodule().changeboard(table, location);
      } else if (
        compass[2].active === true &&
        isvalid([location[0], location[1] - 1])
      ) {
        tablemodule().updateboard(table, location);
        location[1] = location[1] - 1;
        tablemodule().changeboard(table, location);
      } else if (
        compass[3].active === true &&
        isvalid([location[0] - 1, location[1]])
      ) {
        tablemodule().updateboard(table, location);
        location[0] = location[0] - 1;
        tablemodule().changeboard(table, location);
      }
    };

    const left = () => {
      compass.find((o, i) => {
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
      });
      return compass;
    };

    return { move, report, left, right };
  }
};
let table = tablemodule().createtable();
let i = 0;
const getcommand = () => {
  let command = document.getElementById("command").value;
  if (command.includes("PLACE")) {
    i = i + 1;
    let positon = command.slice(6);
    let position = positon.split(",");
    robot = Robot(i, Number(position[0]), Number(position[1]), position[2]);
  } else if (command === "LEFT") {
    robot.left();
  } else if (command === "REPORT") {
    robot.report();
    console.log(table);
  } else if (command === "RIGHT") {
    robot.right();
  } else if (command === "MOVE") {
    robot.move();
  }
  console.log(table);
};

//PLACE 0,2,NORTH
