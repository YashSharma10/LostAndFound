import express from "express";
import cors from "cors";
import sessionMiddleware from "./middlewares/session.js";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(sessionMiddleware);
app.use("/api", routes);

export { app };
