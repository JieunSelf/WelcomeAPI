import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import weatherRouter from "./router/weathers.js";
import populationRouter from "./router/population.js";
import temperatureRouter from "./router/temperature.js";
import { config } from "./config.js";
import rateLimiter from "./middleware/rate-limiter.js";

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption)); // 배포할 때 수정 필요 (12.7.)
app.use(morgan("tiny"));
app.use(rateLimiter); // rateLimiter 추가

// Router
app.get("/", function (req, res) {
  res.send({ message: "This is welcome API", ver: "1.0" });
});
app.get("/docs", function (req, res) {
  res.sendFile(__dirname + "/docs.html");
});
app.use("/population", populationRouter);
app.use("/temperature", temperatureRouter);
app.use("/weathers", weatherRouter);

// 404, 500 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(config.port);
