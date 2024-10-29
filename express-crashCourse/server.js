import express from "express";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/error.js";
import notFound from "./middlewares/notFound.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import posts from "./routes/posts.js";
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/posts", posts);
//error handlers
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
