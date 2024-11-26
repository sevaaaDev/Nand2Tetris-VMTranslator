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

describe("Argument", () => {
  it("return segment from push command", () => {
    const parser = new Parser(["push local 1"]);
    expect(parser.arg1()).toBe("local");
  });
  it("return segment from pop command", () => {
    const parser = new Parser(["pop local"]);
    expect(parser.arg1()).toBe("local");
  });
  it("return index from push command", () => {
    const parser = new Parser(["push local 2"]);
    expect(parser.arg2()).toBe(2);
  });
  it("return index from pop command", () => {
    const parser = new Parser(["pop local 2"]);
    expect(parser.arg2()).toBe(2);
  });
  it("return arithmetic command", () => {
    const parser = new Parser(["add"]);
    expect(parser.arg1()).toBe("add");
  });
  it.todo("return function command");
  it.todo("return return command");
  it.todo("return call command");
  it.todo("return goto command");
  it.todo("return label command");
});
