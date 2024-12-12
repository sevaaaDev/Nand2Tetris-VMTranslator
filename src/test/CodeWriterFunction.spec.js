import { describe, expect, it, vi } from "vitest";
import CodeWriter from "../CodeWriter";

vi.mock("fs", () => {
  return { appendFileSync: vi.fn() };
});

describe("function", () => {
  it("return correct function declaration in asm", () => {
    let codeWriter = new CodeWriter();
    let result = codeWriter.writeFunction("Main.main", 2);
    expect(result).toBe(`// function Main.main 2
(Main.main)
@SP
M=M+1
A=M-1
M=0
@SP
M=M+1
A=M-1
M=0
`);
  });
  it("return correct function call in asm", () => {
    let codeWriter = new CodeWriter();
    codeWriter.writeFunction("Main.main", 2);
    let result = codeWriter.writeCall("Bar.mult", 2);
    expect(result).toBe(`// call Bar.mult 2
@Main.main$ret.1
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=A
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=A
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=A
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@7
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Bar.mult
0;JMP
(Main.main$ret.1)
`);
  });
  it("return correct function return in asm", () => {
    let codeWriter = new CodeWriter();
    codeWriter.writeFunction("Bar.mult", 2);
    let result = codeWriter.writeReturn();
    expect(result).toBe(`// return
@LCL
D=M
@R13
M=D
@5
D=D-A
A=D
D=M
@R14
M=D
@SP
A=M-1
D=M
@ARG
M=D
@ARG
D=A
@SP
M=D+1
@R13
MD=M-1
@THAT
M=D
@R13
MD=M-1
@THIS
M=D
@R13
MD=M-1
@ARG
M=D
@R13
MD=M-1
@LCL
M=D
@R14
A=M
0;JMP
`);
  });
});
