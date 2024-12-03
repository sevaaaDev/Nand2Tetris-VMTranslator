import { describe, it, expect } from "vitest";
import CodeWriter from "../CodeWriter";

describe("Code Writer arithmetic", () => {
  it("return correct add asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("add");
    expect(result).toBe(`// add
@SP
M=M-1
A=M
D=M
@SP
A=M-1
M=D+M
`);
  });
  it.todo("return correct sub asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("sub");
    expect(result).toBe(`// sub
@SP
M=M-1
A=M
D=M
@SP
A=M-1
M=D-M
`);
  });
  it.todo("return correct and asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("and");
    expect(result).toBe(`// and
@SP
M=M-1
A=M
D=M
@SP
A=M-1
M=D&M
`);
  });
  it.todo("return correct or asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("or");
    expect(result).toBe(`// or
@SP
M=M-1
A=M
D=M
@SP
A=M-1
M=D|M
`);
  });
  it.todo("return correct eq asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("eq");
    expect(result).toBe(`// eq
@SP
M=M-1
A=M
D=M
@SP
A=M-1
M=D|M
`);
  });
  it.todo("return correct not asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("not");
    expect(result).toBe(`// not
@SP
M=M-1
A=M
M=!M
`);
  });
  it.todo("return correct neg asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("neg");
    expect(result).toBe(`// neg
@SP
M=M-1
A=M
M=-M
`);
  });
  it.todo("return correct and asm");
});
