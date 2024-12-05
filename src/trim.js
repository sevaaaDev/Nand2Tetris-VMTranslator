class Trim {
  comment(line) {
    let commentIndex = line.indexOf("//");
    return line.slice(0, commentIndex).trim();
  }
  label(line) {
    let isLabel = line.includes("(");
    if (isLabel) return "";
    return lineWithoutComment;
  }
  whitespace(line) {
    return line.trim();
  }
}
const trim = new Trim();
export default trim;
