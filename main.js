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
  while (true) {
    let type = parser.commandType();
    if (type === "C_PUSH" || type === "C_POP") {
      codeWriter.writePushPop(type, parser.arg1(), parser.arg2());
    }
    if (type === "C_ARITHMETIC") {
      codeWriter.writeArithmetic(parser.arg1());
    }
    if (!parser.hasMoreCommand()) {
      break;
    }
    parser.advance();
  }
}

main();
