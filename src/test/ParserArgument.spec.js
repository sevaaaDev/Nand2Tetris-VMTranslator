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
  it("return label of goto command", () => {
    const parser = new Parser(["goto LABEL"]);
    expect(parser.arg1()).toBe("LABEL");
  });
  it("return label of if command", () => {
    const parser = new Parser(["if-goto LABEL"]);
    expect(parser.arg1()).toBe("LABEL");
  });
  it("return label name of label command", () => {
    const parser = new Parser(["label LABEL"]);
    expect(parser.arg1()).toBe("LABEL");
  });
  it("return func name function command", () => {
    const parser = new Parser(["function Foo 0"]);
    expect(parser.arg1()).toBe("Foo");
  });
  it("return total local var of function command", () => {
    const parser = new Parser(["function Foo 0"]);
    expect(parser.arg2()).toBe(0);
  });
  it("return func name from call command", () => {
    const parser = new Parser(["call Foo 2"]);
    expect(parser.arg1()).toBe("Foo");
  });
  it("return total arg from call command", () => {
    const parser = new Parser(["call Foo 2"]);
    expect(parser.arg2()).toBe(2);
  });
});
