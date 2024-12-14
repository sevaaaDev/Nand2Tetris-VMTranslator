import CodeWriter from "./src/CodeWriter.js";
import Parser from "./src/Parser.js";
import { argv } from "process";

function main() {
  let input = argv[2];
  let output = argv[3];
  if (!output.includes(".asm")) {
    output = output + ".asm";
  }
  if (!input.includes(".vm")) {
    throw "Input file doesnt have .vm extension";
  }

  const parser = new Parser(input);
  const codeWriter = new CodeWriter(output);
  codeWriter.writeInit();
  while (true) {
    let type = parser.commandType();
    console.log(parser.currentCommand);
    if (type === "C_PUSH" || type === "C_POP") {
      codeWriter.writePushPop(type, parser.arg1(), parser.arg2());
    }
    if (type === "C_ARITHMETIC") {
      codeWriter.writeArithmetic(parser.arg1());
    }
    if (type === "C_FUNCTION") {
      codeWriter.writeFunction(parser.arg1(), parser.arg2());
    }
    if (type === "C_CALL") {
      codeWriter.writeCall(parser.arg1(), parser.arg2());
    }
    if (type === "C_RETURN") {
      codeWriter.writeReturn();
    }
    if (type === "C_LABEL") {
      codeWriter.writeLabel(parser.arg1());
    }
    if (type === "C_GOTO") {
      codeWriter.writeGoto(parser.arg1());
    }
    if (type === "C_IF") {
      codeWriter.writeIf(parser.arg1());
    }
    if (!parser.hasMoreCommand()) {
      break;
    }
    parser.advance();
  }
}

main();
