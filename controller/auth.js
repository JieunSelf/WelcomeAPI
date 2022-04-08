import * as authRepository from "../database/auth.js";

// 인증키 생성
export async function createJWT(req, res) {
  const classKey = req.query.newKey;
  const expires = req.query.expires ? req.query.expires : 1;

  const found = await authRepository.findKEY(classKey);
  if (found) {
    return res.status(409).json({
      message: `${classKey}는 이미 존재하는 인증키입니다. 중복되지 않는 인증키를 만들어 주세요.`,
    });
  }

  // (1) JWT token 사용시 아래의 코드
  // const data = await authRepository.createJWT(classKey, expires);
  // (2) JWT token 사용 안하면 아래의 코드
  const data = await authRepository.createKEY(classKey, expires);
  return res.status(200).json(data);
}

// 인증키 목록
export async function getKEYs(req, res) {
  const data = await authRepository.getKEYs();
  return res.status(200).json(data);
}
