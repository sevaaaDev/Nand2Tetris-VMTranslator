import { describe, it, expect, vi } from "vitest";
import Parser from "../Parser.js";

vi.mock("n-readlines", () => {
  const nReadLines = vi.fn(function (cmd) {
    this.array = [...cmd, "false"];
    this.count = 0;
  });

  nReadLines.prototype.next = vi.fn(function () {
    return this.array[this.count++];
  });
  return { default: nReadLines };
});

describe("Parser", () => {
  it("advance to next command", () => {
    const parser = new Parser(["push constant 1", "add"]);
    expect(parser.currentCommand).toEqual(["push", "constant", "1"]);
    if (parser.hasMoreCommand()) {
      parser.advance();
    }
    expect(parser.currentCommand).toEqual(["add"]);
  });
  it("advance to next command, not line", () => {
    const parser = new Parser(["push constant 1", "", "add"]);
    expect(parser.currentCommand).toEqual(["push", "constant", "1"]);
    if (parser.hasMoreCommand()) {
      parser.advance();
    }
    expect(parser.currentCommand).toEqual(["add"]);
  });
  it("return correct command type", () => {
    const parser = new Parser(["push constant 1", "add"]);
    expect(parser.commandType()).toBe("C_PUSH");
    parser.hasMoreCommand();
    parser.advance();
    expect(parser.commandType()).toBe("C_ARITHMETIC");
  });
  it("return false when file end", () => {
    const parser = new Parser(["add"]);
    expect(parser.hasMoreCommand()).toBe(false);
  });
  it("return the correct arg1", () => {
    const parser = new Parser(["push local 2"]);
    expect(parser.arg1()).toBe("local");
  });
  it("return the correct arg2", () => {
    const parser = new Parser(["push local 2"]);
    // push = command
    // local = arg 1
    // 2 = arg 2
    expect(parser.arg2()).toBe(2);
  });
  it("return the correct arg1 if type arithmetic", () => {
    const parser = new Parser(["add"]);
    // if arithmetic
    // arg1 = command
    expect(parser.arg1()).toBe("add");
  });
  it.todo("return the correct arg2 if type unsupported");
});

// Parser gets the file
// It advance thru line/command
// when called parser.commandType, it return the current command type
// it wont advance before we call advance
//
// Parser
// - currentCommand
// - hasMoreCommand()
//    return bool if file not end
// - advance()
//    go to next line, change currentCommand to next command
// - commandType()
//    return the command type of current command
//    C_ARITHMETIC
//    C_PUSH
//    C_POP
//    C_FUNCTION
//    C_LABEL
//    C_GOTO
//    C_RETURN
//    C_CALL
//    C_IF
// - arg1()
//    return the first argument of currentCommand
//    if arithmetic , return the command itself
//    if type return, dont call
//    else, the segment
// - arg2()
//    return the second argument of currentCommand
//    if not function push pop call, dont call
//    else the index for push pop
//
//based on this, the code writer has to be called with parser method, until file is end
//how to know if file is end? how to advance thru line with function call (not with event)
//
