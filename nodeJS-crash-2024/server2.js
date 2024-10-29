import { createServer } from "http";

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set

const users = [
  { id: 1, name: "Hassam", age: 19 },
  { id: 2, name: "Ahmed", age: 21 },
  { id: 3, name: "Ali", age: 34 },
  { id: 4, name: "John", age: 23 },
  { id: 5, name: "Jack", age: 23 },
];

// Logger middleware

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} `);

  next();
};

//json middleare

const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

const getUsersHandler = (req, res) => {
  res.statusCode = 200;
  res.write(JSON.stringify(users));
  res.end();
};

const getUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404; // Not Found
    res.write(JSON.stringify({ message: "User not found" }));
  }
  res.end();
};

const notFoundHandler = (req, res) => {
  res.statusCode = 404; // Not Found
  res.write(JSON.stringify({ message: "Route not found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserByIdHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
