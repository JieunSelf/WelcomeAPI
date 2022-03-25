import express from "express";
import "express-async-errors";
import { query } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as temperatureController from "../controller/temperature.js";

const router = express.Router();
export default router;

const TIME_ERROR =
  "연도와 월을 숫자로 입력하여 주세요. ( 예 : 2000년 1월 → 200001 )";

// Query String 유효성 검사
const validateQuery = [
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

// GET /temperature
// GET /temperature?start=:start&end=:end
router.get("/", validateQuery, temperatureController.getAllWeathers);

router.get("/:local", validateQuery, temperatureController.getLocalWeathers);
