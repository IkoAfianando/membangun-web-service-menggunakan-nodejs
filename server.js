const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("content-type", "text/html");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.end(`<p>Ini adalah Homepage</p>`);
    } else {
      response.end(
        `<p>Halam tidak dapat diakses dengan menggunakan ${method} request</p>`
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.end(`<p>Halo! Ini adalah halaman about!</p>`);
    } else if (method === "POST") {
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<p>Hi! ${name} ini adalah halaman about!</p>`);
      });
    } else {
      response.end(
        `<p>Halam tidak dapat diakses dengan menggunakan ${method} request</p>`
      );
    }
  } else {
    response.end(`<p>Halaman tidak ditemukan!</p>`);
  }

  // if (method === "GET") {
  //   response.end("<h1>Hello!</h1>");
  // }
  // if (method === "POST") {
  //   let body = [];
  //   request.on("data", (chunk) => {
  //     body.push(chunk);
  //   });

  //   request.on("end", () => {
  //     body = Buffer.concat(body).toString();
  //     const { name } = JSON.parse(body);
  //     response.end(`<p>Hi! ${name}</p>`);
  //   });
  // }

  // if (method === "PUT") {
  //   response.end("<h1>Bonjour</h1>");
  // }
  // if (method === "DELETE") {
  //   response.end("<h1>Salam</h1>");
  // }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
