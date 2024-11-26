import nReadLines from "n-readlines";

const C_ARITHMETIC = "C_ARITHMETIC";
const C_PUSH = "C_PUSH";
const C_POP = "C_POP";
const C_FUNCTION = "C_FUNCTION";
const C_LABEL = "C_LABEL";
const C_GOTO = "C_GOTO";
const C_RETURN = "C_RETURN";
const C_CALL = "C_CALL";
const C_IF = "C_IF";

const command = {
  push() {
    return C_PUSH;
  },
  pop() {
    return C_POP;
  },

  // return, function, label, goto, call, if
};
export default class Parser {
  constructor(file) {
    this.fileLine = new nReadLines(file);
    this.currentCommand = this.fileLine.next().split(" ");
  }
  commandType() {
    let type = command[this.currentCommand[0]];
    if (type) {
      return type();
    }
    return C_ARITHMETIC;
  }
  #nextLine;
  hasMoreCommand() {
    let nextLine = this.fileLine.next();
    while (nextLine === "") {
      nextLine = this.fileLine.next();
    }
    if (nextLine) {
      this.#nextLine = nextLine.split(" ");
      return true;
    }
    return false;
  }
  advance() {
    this.currentCommand = this.#nextLine;
  }
  arg1() {
    if (this.commandType() === C_ARITHMETIC) {
      return this.currentCommand[0];
    }
    return this.currentCommand[1];
  }
  arg2() {
    if (this.commandType() === C_ARITHMETIC) {
      return;
    }
    if (this.commandType() === C_PUSH) {
      return +this.currentCommand[2];
    }
    if (this.commandType() === C_POP) {
      return +this.currentCommand[2];
    }
  }
}
// Parser
// - currentCommand
// - hasMoreCommand()
//    return bool if file not end
// - advance()
//    go to next line, change currentCommand to next command
// - commandType()
//    return the command type of current command
//    C_ARITHMETIC
//    C_PUSH
//    C_POP
//    C_FUNCTION
//    C_LABEL
//    C_GOTO
//    C_RETURN
//    C_CALL
//    C_IF
// - arg1()
//    return the first argument of currentCommand
//    if arithmetic , return the command itself
//    if type return, dont call
//    else, the segment
// - arg2()
//    return the second argument of currentCommand
//    if not function push pop call, dont call
//    else the index for push pop
