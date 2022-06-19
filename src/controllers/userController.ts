import { IncomingMessage, ServerResponse } from "http";
import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "../models/userModel.js";
import { getData } from "../utils/utils.js";
import { validate } from "uuid";
import { HTTP_STATUS } from "../utils/constants.js";

export async function getUsers(_: IncomingMessage, res: ServerResponse) {
  try {
    const users = await findAll();
    res.writeHead(HTTP_STATUS.OK, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Server Error" }));
  }
}

export async function getUser(
  _: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    if (!validate(id)) {
      res.writeHead(HTTP_STATUS.BAD_REQUEST, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "ID must be in uuid format" }));
    }
    const user = await findById(id);

    if (!user) {
      res.writeHead(HTTP_STATUS.NOT_FOUND, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(HTTP_STATUS.OK, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    res.writeHead(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      "Content-Type": "application/json",
    });
    res.end({ message: "Server Error" });
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getData(req);
    
    const { username, age, hobbies } = JSON.parse(body);
    const user = {
      username,
      age,
      hobbies,
    };

   /*  console.log('1', Object.keys(JSON.parse(body)))
    console.log(Object.keys(JSON.parse(body)).filter(key => !Object.keys(user).includes(key))) */
  /*   if (Object.keys(JSON.parse(body)).filter(key => !Object.keys(user).includes(key)).length === 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "All fields must be filled" }));
    }
 */
    const newUser = await create(user);
    res.writeHead(HTTP_STATUS.OK, { "Content-Type": "text/plain" });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    res.writeHead(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Server Error" }));
  }
}

export async function updateUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    if (!validate(id)) {
      res.writeHead(HTTP_STATUS.BAD_REQUEST, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "ID must be in uuid format" }));
    }
    const userById = await findById(id);
    if (!userById) {
      res.writeHead(HTTP_STATUS.NOT_FOUND, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      const body = await getData(req);
      const { username, age, hobbies } = JSON.parse(body);
      const userData = {
        username: username || userById.username,
        age: age || userById.age,
        hobbies: hobbies || userById.hobbies,
      };

      const updatedUser = await update(id, userData);
      res.writeHead(HTTP_STATUS.OK, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedUser));
    }
  } catch (error) {
    res.writeHead(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      "Content-Type": "application/json",
    });
    res.end({ message: "Server Error" });
  }
}

export async function deleteUser(
  _: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    if (!validate(id)) {
      res.writeHead(HTTP_STATUS.BAD_REQUEST, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "ID must be in uuid format" }));
    }
    const user = await findById(id);
    if (!user) {
      res.writeHead(HTTP_STATUS.NOT_FOUND, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      await remove(id);
      res.writeHead(HTTP_STATUS.OK, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    res.writeHead(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      "Content-Type": "application/json",
    });
    res.end({ message: "Server Error" });
  }
}
