import express from "express";
import "express-async-errors";
import { query } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();
export default router;

const validateQuery = [
  query("admin")
    .trim()
    .isLength({ min: 1 })
    .withMessage("관리자 키를 입력하세요."),
  query("expires")
    .optional()
    .trim()
    .isInt()
    .withMessage(
      "인증키 유효 기간을 일 단위의 숫자로 입력하세요. (예 : 1일 -> 1 )"
    ),
  query("newKey") //
    .trim()
    .isLength({ min: 1 })
    .withMessage("학생들에게 발급할 인증키를 입력하세요."),

  validate,
];

const validateAdmin = [
  query("admin")
    .trim()
    .isLength({ min: 1 })
    .withMessage("관리자 키를 입력하세요."),
  validate
];

// 인증키 생성하기
// GET /key?admin=:adminKey&newKey=:newKey&expires=:expires
router.get("/", validateQuery, isAdmin, authController.createJWT);

// 인증키 정보 확인하기
// GET /key/all?admin:adminKey
router.get("/all", validateAdmin, isAdmin, authController.getKEYs);
