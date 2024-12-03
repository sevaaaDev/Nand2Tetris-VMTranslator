const getSegment = {
  local() {
    return "LCL";
  },
  argument() {
    return "ARG";
  },
  pointer(index) {
    if (index) return "THAT";
    return "THIS";
  },
  this() {
    return "THIS";
  },
  that() {
    return "THAT";
  },
  temp() {
    return "5";
  },
};

const getAssembly = {
  push(segment, index) {
    if (segment === "constant") {
      return `// push ${segment} ${index}
@${index}
D=A

@SP
A=M
M=D

@SP
M=M+1
`;
    }
    if (segment === "static") {
      // TODO: change foo
      return `// push ${segment} ${index}
@Foo.${index}
D=M

@SP
A=M
M=D

@SP
M=M+1
`;
    }
    if (segment === "pointer") {
      return `// push ${segment} ${index}
@${getSegment[segment](index)}
D=M

@SP
A=M
M=D

@SP
M=M+1
`;
    }
    if (segment === "temp") {
      return `// push ${segment} ${index}
@${getSegment[segment]()}
D=A
@${index}
A=D+A
D=M

@SP
A=M
M=D

@SP
M=M+1
`;
    }
    return `// push ${segment} ${index}
@${getSegment[segment]()}
D=M
@${index}
A=D+A
D=M

@SP
A=M
M=D

@SP
M=M+1
`;
  },
  pop(segment, index) {
    if (segment === "static") {
      //TODO: change foo
      return `// pop ${segment} ${index}
@Foo.${index}
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
`;
    }
    if (segment === "pointer") {
      return `// pop ${segment} ${index}
@${getSegment[segment](index)}
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
`;
    }
    if (segment === "temp") {
      return `// pop ${segment} ${index}
@${index}
D=A
@${getSegment[segment]()}
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
`;
    }
    return `// pop ${segment} ${index}
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
  },
};
// TODO:   neg eq   gt lt
const getAssemblyArithmetic = {
  add() {
    return `// add
@SP
M=M-1
A=M
D=M
@SP
A=M-1
M=D+M
`;
  },
  sub() {
    return `// sub
@SP
M=M-1
A=M
D=M
@SP
A=M-1
M=D-M
`;
  },
};
export default class CodeWriter {
  constructor() {}
  writePushPop(command, segment, index) {
    return getAssembly[command](segment, index);
  }
  writeArithmetic(command) {
    if (command === "add") {
      return `// add
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
