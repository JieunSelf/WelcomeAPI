// express-rate-limit으로 구현
import { rateLimit } from "express-rate-limit";
import { config } from "../config.js";

export default rateLimit({
  windowMs: config.rateLimit.windowMs, // 1분
  max: config.rateLimit.maxRequest, // IP별로 1분 동안 요청 가능한 횟수
});
