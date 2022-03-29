const path = require("path");
console.log(__dirname);
console.log(__filename);

console.log(path.basename(__filename));
console.log(path.parse(__filename));
console.log(path.dirname(__filename));
console.log(path.extname(__filename));
console.log(path.join(__dirname, "example", "test.html"));
// returns a string opposite of path.parse
console.log(
  path.format({
    root: "D:\\",
    dir: "D:\\My Learnings\\Backend\\Path",
    base: "index.js",
    ext: ".js",
    name: "index",
  })
);
