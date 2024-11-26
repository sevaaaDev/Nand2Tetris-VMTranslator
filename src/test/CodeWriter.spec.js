import { describe, it, expect, vi } from "vitest";
import CodeWriter from "../CodeWriter";

describe("Code writer push", () => {
  it("return correct push local asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "local", 2);
    expect(result).toBe(`# push local 2
@2
D=A
@LCL
A=D+M
D=M

@SP
A=M
M=D

@SP
A=A+1
`);
  });
  it("return correct push constant asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "constant", 2);
    expect(result).toBe(`# push constant 2
@2
D=A

@SP
A=M
M=D

@SP
A=A+1
`);
  });
  it("return correct pop asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "local", 2);
    expect(result).toBe(`# pop
@2
D=A
@LCL
D=D+M
@R15
M=D

@SP
M=M-1
A=M
D=M

@R15
A=M
M=D
`);
  });
  it("return correct add asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writeArithmetic("add");
    expect(result).toBe(`# add
@SP
M=M-1
A=M
D=M
@SP
A=M-1
M=D+M
`);
  });
  it.todo("return correct and asm");
});
