import { config } from '../config.js';
import * as userRepository from "../database/auth.js";

const KEY_ERROR = { message: "유효하지 않거나 만료된 인증키입니다." };
const ADMIN_KEY = config.adminKey;

export const isAdmin = async (req, res, next) => {
  const adminKey = req.query.admin;
  if (adminKey !== ADMIN_KEY) {
    return res.status(401).json({ message: "관리자 인증키가 올바르지 않습니다. " });
  }
  next();
}

export const isAuth = async (req, res, next) => {
  const key = req.query.key;
  const DB_key = await userRepository.findKEY(key);
  if (!DB_key) {
    // 유효하지 않은 인증키
    return res.status(401).json(KEY_ERROR);
  }
  if (DB_key[1] < Number(new Date())) {
    return res.status(401).json(KEY_ERROR);
  }
  // 인증키 기한 만료시
  next();
};
