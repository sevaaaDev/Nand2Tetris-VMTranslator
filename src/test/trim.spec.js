import trim from "../trim";
import { describe, it, expect } from "vitest";
describe("trim", () => {
  it("removes comment line", () => {
    let line = "// this is a comment";
    let trimmed = trim.comment(line);
    expect(trimmed).toBe("");
  });
  it("trim whitespace when comment empty", () => {
    let line = "real text    ";
    let trimmed = trim.whitespace(trim.comment(line));
    expect(trimmed).toBe("real text");
  });
  it("removes inline comment", () => {
    let line = "D=D+1   // this is a comment";
    let trimmed = trim.comment(line);
    expect(trimmed).toBe("D=D+1");
  });
  it("removes white spaces", () => {
    let line = "     D=D+1   // this is a comment      ";
    let trimmed = trim.whitespace(line);
    expect(trimmed).toBe("D=D+1   // this is a comment");
  });
  it("remove label line", () => {
    let line = "(LOOP) // comment";
    let trimmed = trim.label(line);
    expect(trimmed).toBe("");
  });
});
