//* serve an html page
//* By dynamically inserting values into a template html

const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    handleHomePage(req, res);
  }
  if (req.url.startsWith("/user/") && req.method === "GET") {
    const id = req.url.split("/")[2];

    handleUserPage(req, res, id);
  }
});

const handleHomePage = (req, res) => {
  fs.readFile(
    path.join(__dirname, "template", "index.html"),
    "utf8",
    (err, data) => {
      if (err) throw err;
      let template = data;

      let options = {
        title: "Demo",
        name: "Loki",
        welcomeMessage: "Hello Loki! Welcome to the page...",
      };

      for (let k in options) {
        template = template.replace(`{${k}}`, options[k]);
      }

      res.writeHead(200);
      res.end(template);
    }
  );
};

const handleUserPage = (req, res, id) => {
  fs.readFile(
    path.join(__dirname, "template", "user.html"),
    "utf8",
    (err, data) => {
      if (err) throw err;
      let template = data;

      https.get(`https://reqres.in/api/users/${id}`, (httpsres) => {
        let data = "";
        httpsres.on("data", (i) => {
          data += i;
        });
        httpsres.on("end", () => {
          let response = JSON.parse(data);
          console.log(response);
          let options = {
            title: "User",
            fullName: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            avatar: response.data.avatar,
          };

          for (let k in options) {
            template = template.replace(`{${k}}`, options[k]);
          }

          res.writeHead(200);
          res.end(template);
        });
      });
    }
  );
};

server.listen(8000, (err) => {
  console.log("Listening port 8000...");
});
