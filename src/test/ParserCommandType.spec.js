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
  it.todo("return function command");
  it.todo("return return command");
  it.todo("return call command");
  it.todo("return goto command");
  it.todo("return label command");
});
