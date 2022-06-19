import { createServer } from "http";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "./controllers/userController.js";

export const server = createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url?.match(/\/users\/([0-9a-z]+)/) && req.method === "GET") {
    const id = req.url.split("/")[2];
    getUser(req, res, id);
  } else if (req.url === "/users" && req.method === "POST") {
    createUser(req, res);
  } else if (req.url?.match(/\/users\/([0-9a-z]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[2];
    updateUser(req, res, id);
  }
  else if (req.url?.match(/\/users\/([0-9a-z]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    deleteUser(req, res, id);
  }
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});
