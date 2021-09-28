describe("robotchallenge", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("Example a", () => {
    const robotchallenge = require("./index");
    robotchallenge.commandline.controller("PLACE 0,0,NORTH");
    robotchallenge.commandline.controller("MOVE");
    expect(robotchallenge.commandline.controller("REPORT")).toBe("0,1,NORTH");
  });
  test("Example b", () => {
    const robotchallenge = require("./index");
    robotchallenge.commandline.controller("PLACE 0,0,NORTH");
    robotchallenge.commandline.controller("LEFT");
    expect(robotchallenge.commandline.controller("REPORT")).toBe("0,0,WEST");
  });
  test("Example c", () => {
    const robotchallenge = require("./index");
    robotchallenge.commandline.controller("PLACE 1,2,EAST");
    robotchallenge.commandline.controller("MOVE");
    robotchallenge.commandline.controller("MOVE");
    robotchallenge.commandline.controller("LEFT");
    robotchallenge.commandline.controller("MOVE");
    expect(robotchallenge.commandline.controller("REPORT")).toBe("3,3,NORTH");
  });
  test("Try to place robot without declaring PLACE", () => {
    const robotchallenge = require("./index");
    expect(robotchallenge.commandline.controller("1,2,EAST")).toBeFalsy;
  });
  test("Try to place robot in occupied spot", () => {
    const robotchallenge = require("./index");
    robotchallenge.commandline.controller("PLACE 1,2,EAST");
    expect(robotchallenge.commandline.controller("PLACE 1,2,EAST")).toBeFalsy;
  });
  test("Try to move robot off the table", () => {
    const robotchallenge = require("./index");
    robotchallenge.commandline.controller("PLACE 0,0,SOUTH");
    robotchallenge.commandline.controller("MOVE");
    expect(robotchallenge.commandline.controller("REPORT")).toBe("0,0,SOUTH");
  });
  test("Try to move robot off the table", () => {
    const robotchallenge = require("./index");
    robotchallenge.commandline.controller("PLACE 0,0,SOUTH");
    robotchallenge.commandline.controller("MOVE");
    expect(robotchallenge.commandline.controller("REPORT")).toBe("0,0,SOUTH");
  });
  test("Report to include how many are placed and which is active", () => {
    const robotchallenge = require("./index");
    robotchallenge.commandline.controller("PLACE 0,0,SOUTH");
    robotchallenge.commandline.controller("PLACE 0,3,SOUTH");
    expect(robotchallenge.commandline.controller("REPORT")).toBe(
      "0,0,SOUTH, 2 Robots present, Robot 1 active."
    );
  });
  test("Select robot and move active robot", () => {
    const robotchallenge = require("./index");
    robotchallenge.commandline.controller("PLACE 3,3,SOUTH");
    robotchallenge.commandline.controller("PLACE 0,3,SOUTH");
    robotchallenge.commandline.controller("PLACE 4,3,SOUTH");
    robotchallenge.commandline.controller("ROBOT 2");
    robotchallenge.commandline.controller("LEFT");
    robotchallenge.commandline.controller("MOVE");
    expect(robotchallenge.commandline.controller("REPORT")).toBe(
      "1,3,EAST, 3 Robots present, Robot 2 active."
    );
  });
  test("Place multiple robots and the first robot to remain active", () => {
    const robotchallenge = require("./index");
    robotchallenge.commandline.controller("PLACE 1,3,SOUTH");
    robotchallenge.commandline.controller("PLACE 0,3,SOUTH");
    expect(robotchallenge.commandline.controller("REPORT")).toBe(
      "1,3,SOUTH, 2 Robots present, Robot 1 active."
    );
  });
});
