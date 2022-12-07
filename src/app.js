import express from "express";
import InRoutesTask from "./routes/routestasks";
import config from "./config";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Settings
app.set("port", config.port);

// Middlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my aplication" });
});

app.use("/api/task", InRoutesTask);

export default app;
