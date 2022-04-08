import express from "express";
import "express-async-errors";
import { query } from "express-validator";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
import * as temperatureController from "../controller/temperature.js";

const router = express.Router();
export default router;

const TIME_ERROR =
  "연도와 월을 숫자로 입력하여 주세요. ( 예 : 2000년 1월 → 200001 )";

// Query String 유효성 검사
const validateQuery = [
  query("key") //
    .trim()
    .isLength(1)
    .withMessage("인증키를 입력하여 주세요."),
  query("start")
    .optional()
    .trim()
    .isNumeric()
    .withMessage(TIME_ERROR)
    .isLength({ min: 6, max: 6 })
    .withMessage(TIME_ERROR),
  query("end")
    .optional()
    .trim()
    .isNumeric()
    .withMessage(TIME_ERROR)
    .isLength({ min: 6, max: 6 })
    .withMessage(TIME_ERROR),
  validate,
];

// GET /temperature?key=:key
// GET /temperature?key=:key&start=:start&end=:end
router.get("/", validateQuery, isAuth, temperatureController.getAllWeathers);

// GET /temperature/:local?key=:key&start=:start&end=:end
router.get(
  "/:local",
  validateQuery,
  isAuth,
  temperatureController.getLocalWeathers
);
