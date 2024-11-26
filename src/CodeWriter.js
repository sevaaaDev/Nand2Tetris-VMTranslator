const getSegment = {
  local() {
    return "LCL";
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
  }
}
