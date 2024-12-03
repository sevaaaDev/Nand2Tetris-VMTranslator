import { describe, it, expect, vi } from "vitest";
import CodeWriter from "../CodeWriter";

describe("Code writer push", () => {
  it("return correct push local asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "local", 2);
    expect(result).toBe(`// push local 2
@LCL
D=M
@2
A=D+A
D=M

@SP
A=M
M=D

@SP
M=M+1
`);
  });
  it("return correct push this asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "this", 2);
    expect(result).toBe(`// push this 2
@THIS
D=M
@2
A=D+A
D=M

@SP
A=M
M=D

@SP
M=M+1
`);
  });
  it("return correct push that asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "that", 2);
    expect(result).toBe(`// push that 2
@THAT
D=M
@2
A=D+A
D=M

@SP
A=M
M=D

@SP
M=M+1
`);
  });
  it("return correct push argument asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "argument", 2);
    expect(result).toBe(`// push argument 2
@ARG
D=M
@2
A=D+A
D=M

@SP
A=M
M=D

@SP
M=M+1
`);
  });
  it("return correct push constant asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "constant", 2);
    expect(result).toBe(`// push constant 2
@2
D=A

@SP
A=M
M=D

@SP
M=M+1
`);
  });
  it("return correct push static asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "static", 2);
    expect(result).toBe(`// push static 2
@Foo.2
D=M

@SP
A=M
M=D

@SP
M=M+1
`);
  });
  it("return correct push pointer 0 (this) asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "pointer", 0);
    expect(result).toBe(`// push pointer 0
@THIS
D=M

@SP
A=M
M=D

@SP
M=M+1
`);
  });
  it("return correct push pointer 1 (that) asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "pointer", 1);
    expect(result).toBe(`// push pointer 1
@THAT
D=M

@SP
A=M
M=D

@SP
M=M+1
`);
  });
  it("return correct push temp 1 asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "temp", 1);
    expect(result).toBe(`// push temp 1
@5
D=A
@1
A=D+A
D=M

@SP
A=M
M=D

@SP
M=M+1
`);
  });
  it("return correct pop local asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "local", 2);
    expect(result).toBe(`// pop local 2
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
  it("return correct pop this asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "this", 2);
    expect(result).toBe(`// pop this 2
@2
D=A
@THIS
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
  it("return correct pop that asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "that", 2);
    expect(result).toBe(`// pop that 2
@2
D=A
@THAT
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
  it("return correct pop argument asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "argument", 2);
    expect(result).toBe(`// pop argument 2
@2
D=A
@ARG
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
  it("return correct pop static asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "static", 2);
    expect(result).toBe(`// pop static 2
@Foo.2
D=A
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
  it("return correct pop temp asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "temp", 2);
    expect(result).toBe(`// pop temp 2
@2
D=A
@5
D=D+A
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
  it("return correct pop pointer 0 (this) asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "pointer", 0);
    expect(result).toBe(`// pop pointer 0
@THIS
D=A
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
  it("return correct pop pointer 1 (that) asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "pointer", 1);
    expect(result).toBe(`// pop pointer 1
@THAT
D=A
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
});
