import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  port: parseInt(required("PORT", 8080)),
  cors: { allowedOrigin: required("CORS_ALLOW_ORIGIN") },

  // rateLimit 관련
  rateLimit: {
    windowMs: 60000,
    maxRequest: 300,
  },

  // 인증키 관련
  adminKey: required("ADMIN_KEY"),
  jwt: {
    secretKey: required("JWT_SECRET"),
  },
};
