import { describe, it, expect, vi } from "vitest";
import Parser from "../Parser";

vi.mock("n-readlines", () => {
  const nReadLines = vi.fn(function (cmd) {
    this.array = [...cmd, false];
    this.count = 0;
  });

  nReadLines.prototype.next = vi.fn(function () {
    return this.array[this.count++];
  });
  return { default: nReadLines };
});

describe("commandType", () => {
  it("return push command", () => {
    const parser = new Parser(["push local 1"]);
    expect(parser.commandType()).toBe("C_PUSH");
  });
  it("return pop command", () => {
    const parser = new Parser(["pop local"]);
    expect(parser.commandType()).toBe("C_POP");
  });
  it("return arithmetic command", () => {
    const parser = new Parser(["add"]);
    expect(parser.commandType()).toBe("C_ARITHMETIC");
  });
  it("return function command", () => {
    const parser = new Parser(["function Foo 2"]);
    expect(parser.commandType()).toBe("C_FUNCTION");
  });
  it("return return command", () => {
    const parser = new Parser(["return"]);
    expect(parser.commandType()).toBe("C_RETURN");
  });
  it("return call command", () => {
    const parser = new Parser(["call Foo"]);
    expect(parser.commandType()).toBe("C_CALL");
  });
  it("return goto command", () => {
    const parser = new Parser(["goto END"]);
    expect(parser.commandType()).toBe("C_GOTO");
  });
  it("return label command", () => {
    const parser = new Parser(["label FOO "]);
    expect(parser.commandType()).toBe("C_LABEL");
  });
  it("return if command", () => {
    const parser = new Parser(["if-goto FOO"]);
    expect(parser.commandType()).toBe("C_IF");
  });
});
