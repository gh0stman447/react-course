const fs = require("fs");
const jsonServer = require("json-server");
// const jwt = require("jsonwebtoken");
const path = require("path");

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

// Для искусственной задержки
server.use(async (req, response, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });

  next();
});

// Проверяем авторизацию пользователя
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "AUTH ERROR" });
  }

  next();
});

server.use(jsonServer.defaults());
server.use(router);

// Эндпоинт для логина
server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "db.json")), "utf-8");
  const { users } = db;

  const userFromDb = users.find((user) => user.username === username && user.password === password);

  if (userFromDb) {
    return res.json(userFromDb);
  }

  return status(403).json({
    message: "AUTH ERROR",
  });
});

server.listen(8000, () => {
  console.log("server is running on 8000 port");
});
