import express from "express";
import "express-async-errors";
import { query, param } from "express-validator";
import * as populationController from "../controller/population.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();
export default router;

const AGE_ERROR =
  "0 ~ 100세 사이의 나이를 숫자로 입력하여 주세요. ( 예 : 50세 → 50 )";

const YEAR_ERROR =
  "1993년 ~ 2021년 사이의 연도를 숫자로 입력하여 주세요. ( 예 : 1993년 → 1993 )";

// Query String 유효성 검사
const validateQuery = [
  param("year") //
    .trim()
    .isInt({ min: 1993, max: 2021 })
    .withMessage(YEAR_ERROR),
  query("key") //
    .trim()
    .isLength(1)
    .withMessage("인증키를 입력하여 주세요."),
  query("startAge")
    .optional()
    .trim()
    .isInt({ min: 0, max: 100 })
    .withMessage(AGE_ERROR),
  query("endAge")
    .optional()
    .trim()
    .isInt({ min: 0, max: 100 })
    .withMessage(AGE_ERROR),
  validate,
];

// 잘못된 경로
router.get("/", (req, res, next) => {
  return res.status(404).json({ message: "경로를 확인하세요." });
})

// GET /population/:year?key=:key&startAge=:age&endAge=:age
router.get("/:year", validateQuery, isAuth, populationController.getPopulation);


