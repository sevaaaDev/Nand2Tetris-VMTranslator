import { describe, it, expect, vi } from "vitest";
import CodeWriter from "../CodeWriter";
vi.mock("fs", () => {
  return { appendFileSync: vi.fn() };
});

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
  it("return correct sub asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("sub");
    expect(result).toBe(`// sub
@SP
AM=M-1
D=M
@SP
A=M-1
M=D-M
M=-M
`);
  });
  it("return correct and asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("and");
    expect(result).toBe(`// and
@SP
AM=M-1
D=M
@SP
A=M-1
M=D&M
`);
  });
  it("return correct or asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("or");
    expect(result).toBe(`// or
@SP
AM=M-1
D=M
@SP
A=M-1
M=D|M
`);
  });
  it("return correct eq asm", () => {
    const codeWriter = new CodeWriter();
    codeWriter.writeArithmetic("eq");
    const result = codeWriter.writeArithmetic("eq");
    expect(result).toBe(`// eq
@SP
M=M-1
A=M-1
D=M
@SP
A=M
D=D-M
@EQ1
D;JEQ
@SP
A=M-1
M=0
@END_EQ1
0;JMP

(EQ1)
@SP
A=M-1
M=-1
(END_EQ1)
`);
  });
  it("return correct not asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("not");
    expect(result).toBe(`// not
@SP
A=M-1
M=!M
`);
  });
  it("return correct neg asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("neg");
    expect(result).toBe(`// neg
@SP
A=M-1
M=-M
`);
  });
  it("return correct lt asm", () => {
    const codeWriter = new CodeWriter();
    codeWriter.writeArithmetic("lt");
    const result = codeWriter.writeArithmetic("lt");
    expect(result).toBe(`// lt
@SP
M=M-1
A=M-1
D=M
@SP
A=M
D=D-M
@LT1
D;JLT
@SP
A=M-1
M=0
@END_LT1
0;JMP

(LT1)
@SP
A=M-1
M=-1
(END_LT1)
`);
  });
  it("return correct gt asm", () => {
    const codeWriter = new CodeWriter();
    codeWriter.writeArithmetic("gt");
    const result = codeWriter.writeArithmetic("gt");
    expect(result).toBe(`// gt
@SP
M=M-1
A=M-1
D=M
@SP
A=M
D=D-M
@GT1
D;JGT
@SP
A=M-1
M=0
@END_GT1
0;JMP

(GT1)
@SP
A=M-1
M=-1
(END_GT1)
`);
  });
});
