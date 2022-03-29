const fs = require("fs");
const path = require("path");

console.log("Async Reading...");
//* async and gives a callback function
//* in sync file read it blocks the entire code execution below until the file reading is completed
fs.readFile(path.join(__dirname, "hello.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log("Async Reading Ends...");

console.log("Sync Reading...");
const data = fs.readFileSync(path.join(__dirname, "hello.txt"), "utf8");
console.log(data);
console.log("Sync Reading Ends...");

console.log("Async Writing...");
fs.writeFile(path.join(__dirname, "name.txt"), "Aiswarya", (err, data) => {
  if (err) throw err;
  console.log("File Created...");
});
console.log("Async Writing Ends...");

console.log("Sync Writing...");
fs.writeFileSync(path.join(__dirname, "name_sync.txt"), "Aiswarya");
console.log("File Created...");
console.log("Sync Writing Ends...");

fs.mkdir(path.join(__dirname, "meta"), (err) => {
  if (err) throw err;
  fs.rename(
    path.join(__dirname, "name.txt"),
    path.join(__dirname, "meta", "my_name.txt"),
    (err) => {
      if (err) throw err;
      console.log("Renamed and moved successfully...");
    }
  );
});

fs.mkdirSync(path.join(__dirname, "meta_sync"));
fs.renameSync(
  path.join(__dirname, "name_sync.txt"),
  path.join(__dirname, "meta_sync", "my_name_sync.txt")
);
