import { describe, it, expect } from "vitest";

describe("Parser", () => {
  it.todo("Parse");
});

// Parser gets the file
// It advance thru line/command
// when called parser.commandType, it return the current command type
// it wont advance before we call advance
//
// Parser
// - currentCommand
// - advance()
//    go to next line, change currentCommand to next command
// - commandType()
//    return the command type of current command
// - arg1()
//    return the first argument of currentCommand
//    if arithmetic , return the command itself
//    if type return, dont call
//    else, the segment
// - arg2()
//    return the second argument of currentCommand
//    if not function push pop call, dont call
//    else the index for push pop
//
//based on this, the code writer has to be called with parser method, until file is end
//how to know if file is end? how to advance thru line with function call (not with event)
//
