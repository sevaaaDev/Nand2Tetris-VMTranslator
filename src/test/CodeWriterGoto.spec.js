import { describe, expect, it, vi } from "vitest";
import CodeWriter from "../CodeWriter";

vi.mock("fs", () => {
  return { appendFileSync: vi.fn() };
});
// TODO: if goto is in function, it should be goto file.function.label instead of goto label
// FIX: how to know the goto is inside function?
describe("Codewriter GOTO", () => {
  it("produce correct goto asm", () => {
    let codeWriter = new CodeWriter();
    codeWriter.setFileName("goto");
    let result = codeWriter.writeGoto("FOO");
    expect(result).toBe(`// goto FOO
@goto.$FOO
0;JMP
`);
  });
  it("produce correct goto asm in function", () => {
    let codeWriter = new CodeWriter();
    codeWriter.setFileName("goto");
    codeWriter.writeFunction("Bar.main");
    let result = codeWriter.writeGoto("FOO");
    expect(result).toBe(`// goto FOO
@goto.Bar.main$FOO
0;JMP
`);
  });
  it("produce correct if-goto asm", () => {
    let codeWriter = new CodeWriter();
    codeWriter.setFileName("if-goto");
    let result = codeWriter.writeIf("FOO");
    expect(result).toBe(`// if-goto FOO
@SP
A=M-1
D=M+1
@if-goto.$FOO
D;JEQ
`);
  });
  it("produce correct label asm", () => {
    let codeWriter = new CodeWriter();
    codeWriter.setFileName("label");
    let result = codeWriter.writeLabel("FOO");
    expect(result).toBe(`// label FOO
(label.$FOO)
`);
  });
});
