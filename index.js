const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((request, response) => {
  /*   if (request.url === "/") {
    fs.readFile(
      path.join(__dirname, "public", "index.html"),
      (error, content) => {
        if (error) throw error;
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(content);
      }
    );
  }
  if (request.url === "/api/users") {
    const users = [
      { name: "Bob Smith", age: 40 },
      { name: "John Doe", age: 30 }
    ];
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  } */

  //Build File Path
  let filePath = path.join(
    __dirname,
    "public",
    request.url === "/" ? "index.html" : request.url
  );

  //Extension of File
  let extensionName = path.extname(filePath);

  //Initial Content Type
  let contentType = "text/html";

  //Check Extenstion and Set Content Type
  switch (extensionName) {
    case ".js":
      contentType: "text/javascript";
      break;
    case ".css":
      contentType: "text/css";
      break;
    case ".json":
      contentType: "application/json";
      break;
    case ".png":
      contentType: "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  //Read File
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == "ENOENT") {
        //Page Not Found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (error, content) => {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(content, "utf-8");
          }
        );
      } else {
        //Server Error
        response.writeHead(500);
        response.end(`Server Error: ${error.code}`);
      }
    } else {
      //Success
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
});
const PORT = process.env.Port || 5000;

server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
