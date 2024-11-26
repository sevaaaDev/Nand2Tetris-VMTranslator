const getSegment = {
  local() {
    return "LCL";
  },
  argument() {
    return "ARG";
  },
};
export default class CodeWriter {
  constructor() {}
  writePushPop(command, segment, index) {
    if (command === "push") {
      return `# push
@${index}
D=A
@${getSegment[segment]()}
A=D+M
D=M

@SP
A=M
M=D

@SP
A=A+1
`;
    }
    if (command === "pop") {
      return `# pop
@${index}
D=A
@${getSegment[segment]()}
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
`;
    }
  }
  writeArithmetic(command) {
    if (command === "add") {
      return `# add
@SP
M=M-1
A=M
D=M
@SP
A=M-1
M=D+M
`;
    }
  }
}
