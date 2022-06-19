import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { IncomingMessage } from "http";

export async function writeUsersToFile(data: any) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pathToFile = path.join(__dirname, "users.json");
    await writeFile(pathToFile, JSON.stringify(data));
  } catch (error) {
    throw new Error(error);
  }
}

export function getData(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
