//globals
const robotchallenge = (() => {
  let id = 0;
  let counter = 0;
  const tablemodule = (() => {
    const createtable = () => {
      let table = [...Array(5)].map((x) => Array(5).fill(0));
      for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < 5; x++) {
          table[y][x] = {
            x: x,
            y: table.length - 1 - y,
            occupied: false,
            id: null,
            direction: null,
          };
        }
      }
      return table;
    };
    const isoccupied = (table, location) => {
      for (let i = 0; i < table.length; i++) {
        for (let k = 0; k < table.length; k++) {
          if (
            table[i][k].x == location[0] &&
            table[i][k].y == location[1] &&
            table[i][k].occupied === true
          ) {
            return true;
          }
        }
      }
    };
    const isvalid = (table, location) => {
      if (location[0] === 5 || location[0] === -1) {
        return false;
      } else if (location[1] === -1 || location[1] === 5) {
        return false;
      } else if (isoccupied(table, location)) {
        return false;
      }
      return true;
    };
    const updatetable = (table, location, id, direction) => {
      console.log(direction);
      for (let i = 0; i < table.length; i++) {
        for (let k = 0; k < table.length; k++) {
          if (table[i][k].x == location[0] && table[i][k].y == location[1]) {
            table[i][k].occupied = true;
            table[i][k].id = id;
            table[i][k].direction = direction;
            return table;
          }
        }
      }
    };
    const resettable = (table, location) => {
      for (let i = 0; i < table.length; i++) {
        for (let k = 0; k < table.length; k++) {
          if (table[i][k].x == location[0] && table[i][k].y == location[1]) {
            table[i][k].occupied = false;
            table[i][k].id = null;
            table[i][k].direction = null;
            return table;
          }
        }
      }
    };
    const findrobot = (id) => {
      for (let i = 0; i < table.length; i++) {
        for (let k = 0; k < table.length; k++) {
          if (table[i][k].id == id) {
            let location = table[i][k];
            return location;
          }
        }
      }
    };
    return {
      createtable,
      updatetable,
      resettable,
      findrobot,
      isoccupied,
      isvalid,
    };
  })();

  const Robot = (id, x, y, direction) => {
    let robotdirection = direction;
    let location = [x, y];
    let compass = [
      { name: "NORTH", active: true },
      { name: "EAST", active: false },
      { name: "SOUTH", active: false },
      { name: "WEST", active: false },
    ];
    console.log(direction);
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
      let facing = compass.find((o) => o.active === true);
      return `${location[0]},${location[1]},${facing.name} ${counter} Robots on table`;
    };
    const move = () => {
      if (
        compass[0].active == true &&
        tablemodule().isvalid(table, [location[0], location[1] + 1])
      ) {
        tablemodule.resettable(table, location);
        location[1] = location[1] + 1;
        console.log(location);
        tablemodule.updatetable(table, location, id, compass[0].name);
      } else if (
        compass[1].active == true &&
        tablemodule.isvalid(table, [location[0] + 1, location[1]])
      ) {
        tablemodule.resettable(table, location);
        location[0] = location[0] + 1;
        tablemodule.updatetable(table, location, id, compass[1].name);
      } else if (
        compass[2].active === true &&
        tablemodule.isvalid(table, [location[0], location[1] - 1])
      ) {
        tablemodule.resettable(table, location);
        location[1] = location[1] - 1;
        tablemodule.updatetable(table, location, id, compass[2].name);
      } else if (
        compass[3].active === true &&
        tablemodule.isvalid(table, [location[0] - 1, location[1]])
      ) {
        tablemodule.resettable(table, location);
        location[0] = location[0] - 1;
        tablemodule.updatetable(table, location, id, compass[3].name);
      }
    };
    const left = () => {
      compass.find((o, i) => {
        if (o.active == true) {
          if (i == 0) {
            compass[i].active = false;
            compass[3].active = true;
            robotdirection = compass[3].name;
            return true;
          } else {
            compass[i].active = false;
            robotdirection = compass[i - 1].active = true;
            robotdirection = compass[i - 1].name;
            return true;
          }
        }
      });
      tablemodule.updatetable(table, location, id, robotdirection);
      return compass;
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
  };

  const controller = () => {
    let command = document.getElementById("command").value;
    if (command.includes("PLACE")) {
      let positon = command.slice(6);
      let position = positon.split(",");
      //Check is valid
      if (
        tablemodule.isvalid(table, [Number(position[0]), Number(position[1])])
      ) {
        counter = counter + 1;
        id = id + 1;
        tablemodule.updatetable(
          table,
          [Number(position[0]), Number(position[1])],
          id,
          position[2]
        );
        //Default robot
        let activerobot = tablemodule.findrobot(1);
        robot = Robot(
          activerobot.id,
          activerobot.x,
          activerobot.y,
          activerobot.direction
        );
      } else {
        console.log(false);
      }
    } else if (command.includes("ROBOT")) {
      getrobotid = command.split(" ");
      activerobot = tablemodule.findrobot(getrobotid[1]);
      console.log(activerobot);
      robot = Robot(
        activerobot.id,
        activerobot.x,
        activerobot.y,
        activerobot.direction
      );
    } else if (command === "LEFT") {
      robot.left();
    } else if (command === "REPORT") {
      document.getElementById("output").innerHTML = robot.report();
    } else if (command === "RIGHT") {
      robot.right();
    } else if (command === "MOVE") {
      robot.move();
    }
    console.log(table);
  };
  let table = tablemodule.createtable();
  return { controller };
})();

//PLACE 0,2,NORTH
