import { describe, it, expect, vi } from "vitest";
import CodeWriter from "../CodeWriter";

describe("Code writer", () => {
  it("return correct push asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("push", "local", 2);
    expect(result).toBe(`# push
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
  it("return correct pop asm", () => {
    const codeWriter = new CodeWriter();
    const result = codeWriter.writePushPop("pop", "local", 2);
    expect(result).toBe(`# pop


@SP
M=M-1

@2
D=A
@LCL
D=D+M

@SP
A=M
A=M

`);
  });
  it.todo("return correct add asm");
  it.todo("return correct and asm");
});
