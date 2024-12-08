import { appendFileSync } from "fs";
export default class CodeWriter {
  constructor(OutFile) {
    this.fileName = OutFile;
  }
  writePushPop(command, segment, index) {
    let line = getAssembly[command](segment, index, this.fileName);
    try {
      appendFileSync(this.fileName, line, "utf-8");
    } catch (err) {
      throw err;
    }
    return line;
  }
  writeArithmetic(command) {
    let line = getAssemblyArithmetic[command](this);
    try {
      appendFileSync(this.fileName, line, "utf-8");
    } catch (err) {
      throw err;
    }
    return line;
  }
  eqCount = 0;
  ltCount = 0;
  gtCount = 0;
}

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
  C_PUSH(segment, index, fileName) {
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
      return `// push ${segment} ${index}
@${fileName.replace(".asm", "")}.${index}
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
  C_POP(segment, index, fileName) {
    if (segment === "static") {
      return `// pop ${segment} ${index}
@${fileName.replace(".asm", "")}.${index}
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
AM=M-1
D=M
@SP
A=M-1
M=D-M
M=-M
`;
  },
  and() {
    return `// and
@SP
AM=M-1
D=M
@SP
A=M-1
M=D&M
`;
  },
  or() {
    return `// or
@SP
AM=M-1
D=M
@SP
A=M-1
M=D|M
`;
  },
  not() {
    return `// not
@SP
A=M-1
M=!M
`;
  },
  neg() {
    return `// neg
@SP
A=M-1
M=-M
`;
  },
  eq(obj) {
    return `// eq
@SP
M=M-1
A=M-1
D=M
@SP
A=M
D=D-M
@EQ${obj.eqCount}
D;JEQ
@SP
A=M-1
M=0
@END_EQ${obj.eqCount}
0;JMP

(EQ${obj.eqCount})
@SP
A=M-1
M=-1
(END_EQ${obj.eqCount++})
`;
  },
  lt(obj) {
    return `// lt
@SP
M=M-1
A=M-1
D=M
@SP
A=M
D=D-M
@LT${obj.ltCount}
D;JLT
@SP
A=M-1
M=0
@END_LT${obj.ltCount}
0;JMP

(LT${obj.ltCount})
@SP
A=M-1
M=-1
(END_LT${obj.ltCount++})
`;
  },
  gt(obj) {
    return `// gt
@SP
M=M-1
A=M-1
D=M
@SP
A=M
D=D-M
@GT${obj.gtCount}
D;JGT
@SP
A=M-1
M=0
@END_GT${obj.gtCount}
0;JMP

(GT${obj.gtCount})
@SP
A=M-1
M=-1
(END_GT${obj.gtCount++})
`;
  },
};
