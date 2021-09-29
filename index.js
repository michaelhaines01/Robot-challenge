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

    const isoccupied = (location) => {
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

    const isvalid = (location) => {
      if (location[0] === 5 || location[0] === -1) {
        return false;
      } else if (location[1] === -1 || location[1] === 5) {
        return false;
      } else if (isoccupied(location)) {
        return false;
      }
      return true;
    };

    const updatetable = (location, id, direction) => {
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

    const resettable = (location) => {
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
    let location = [x, y];
    let compass = [
      { name: "NORTH", active: true },
      { name: "EAST", active: false },
      { name: "SOUTH", active: false },
      { name: "WEST", active: false },
    ];

    const setdirection = (direction) => {
      compass.forEach((o, i) => {
        if (o.name === direction) {
          compass[i].active = true;
        } else if (o.name !== direction && o.active === true) {
          compass[i].active = false;
        }
      });
    };
    setdirection(direction);

    const report = () => {
      let facing = compass.find((o) => o.active === true);
      if (counter > 1) {
        return `${location[0]},${location[1]},${facing.name}, ${counter} Robots present, Robot ${id} active.`;
      } else {
        return `${location[0]},${location[1]},${facing.name}`;
      }
    };

    const move = () => {
      if (
        compass[0].active == true &&
        tablemodule.isvalid([location[0], location[1] + 1])
      ) {
        tablemodule.resettable(location);
        location[1] = location[1] + 1;
        tablemodule.updatetable(location, id, compass[0].name);
      } else if (
        compass[1].active == true &&
        tablemodule.isvalid(table, [location[0] + 1, location[1]])
      ) {
        tablemodule.resettable(location);
        location[0] = location[0] + 1;
        tablemodule.updatetable(location, id, compass[1].name);
      } else if (
        compass[2].active === true &&
        tablemodule.isvalid([location[0], location[1] - 1])
      ) {
        tablemodule.resettable(location);
        location[1] = location[1] - 1;
        tablemodule.updatetable(table, location, id, compass[2].name);
      } else if (
        compass[3].active === true &&
        tablemodule.isvalid([location[0] - 1, location[1]])
      ) {
        tablemodule.resettable(location);
        location[0] = location[0] - 1;
        tablemodule.updatetable(location, id, compass[3].name);
      }
    };

    const turnleft = () => {
      compass.find((o, i) => {
        if (o.active == true) {
          if (i == 0) {
            compass[i].active = false;
            compass[3].active = true;
            robotdirection = compass[3].name;
            return true;
          } else {
            compass[i].active = false;
            compass[i - 1].active = true;
            robotdirection = compass[i - 1].name;
            return true;
          }
        }
      });
      tablemodule.updatetable(location, id, robotdirection);
      return compass;
    };

    const turnright = () => {
      compass.find((o, i) => {
        if (o.active == true) {
          if (i == 3) {
            compass[i].active = false;
            compass[0].active = true;
            robotdirection = compass[0].name;
            return true;
          } else {
            compass[i].active = false;
            compass[i + 1].active = true;
            robotdirection = compass[i + 1].name;
            return true;
          }
        }
      });
      tablemodule.updatetable(location, id, robotdirection);
      return compass;
    };
    return { move, report, turnleft, turnright };
  };

  const controller = (command) => {
    if (command.includes("PLACE")) {
      let Position = command.slice(6);
      let position = Position.split(",");
      if (tablemodule.isvalid([Number(position[0]), Number(position[1])])) {
        counter = counter + 1;
        id = id + 1;
        tablemodule.updatetable(
          [Number(position[0]), Number(position[1])],
          id,
          position[2]
        );
        const activerobot = tablemodule.findrobot(1);
        robot = Robot(
          activerobot.id,
          activerobot.x,
          activerobot.y,
          activerobot.direction
        );
      } else {
        return false;
      }
    } else if (command.includes("ROBOT")) {
      getrobotid = command.split(" ");
      activerobot = tablemodule.findrobot(getrobotid[1]);
      robot = Robot(
        activerobot.id,
        activerobot.x,
        activerobot.y,
        activerobot.direction
      );
    } else if (command === "LEFT") {
      robot.turnleft();
    } else if (command === "REPORT") {
      let output = robot.report();
      return output;
    } else if (command === "RIGHT") {
      robot.turnright();
    } else if (command === "MOVE") {
      robot.move();
    }
  };
  let table = tablemodule.createtable();
  return { controller };
})();

exports.commandline = robotchallenge;
