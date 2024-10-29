
import http from "http";
const PORT = process.env.PORT;
import url from "url";
import path from "path";
import fs from "fs/promises";

//Get Current path

const __fileName = url.fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

console.log(__fileName, __dirName);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirName, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirName, "public", "about.html");
      } else {
        throw new Error("Not Found");
      }

      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
