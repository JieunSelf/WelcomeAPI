import * as fs from "fs";
import * as os from "os";
import * as iconv from "iconv";
import jwt from "jsonwebtoken";
// import { parse } from "json2csv";
import { config } from "../config.js";
import encoder from "../middleware/encoder.js";

function search(classKey, data) {
  const [columns, ...rows] = data.trim(/\s/g).split(os.EOL);
  const valuesArray = rows.map((row) => row.split(","));
  const found = valuesArray.find((values) => values[0] === classKey);
  return found;
}

// 중복키 확인
export async function findKEY(classKey) {
  const data = fs.promises
    .readFile("./csv_data/API_KEY.csv")
    .then((data) => encoder(data))
    .then((data) => search(classKey, data))
    .catch(console.error);
  return data;
}

function converter(data) {
  const [columns, ...rows] = data.trim(/\s/g).split(os.EOL);
  const keys = ["classKey", "isValid"];
  const valuesArray = rows.map((row) => row.split(","));

  const jsonText = valuesArray.map((values) =>
    values.reduce((acc, v, i) => {
      if (i === 0) {
        acc[keys[i]] = v;
      } else {
        if (v > Number(new Date())) {
          acc[keys[i]] = true;
        } else {
          acc[keys[i]] = false;
        }
      }
      return acc;
    }, {})
  );

  return jsonText;
}

// 모든 인증키 확인
export async function getKEYs() {
  const data = fs.promises
    .readFile("./csv_data/API_KEY.csv")
    .then((data) => encoder(data))
    .then((data) => converter(data))
    .catch(console.error);
  return data;
}

// 인증키 생성
// (1) JWT 사용 안할 경우 아래의 코드
export async function createKEY(classKey, expires) {
  // 인증키 만료 시간
  const expiresIn = Number(new Date()) + expires * 1000 * 60 * 60 * 24;

  fs.promises
    .appendFile("./csv_data/API_KEY.csv", classKey + "," + expiresIn + os.EOL)
    .catch(console.error);
  return {
    message: `인증키 ${classKey}가 저장되었습니다. 유효 기간은 지금부터 ${expires}일 입니다.`,
  };
}

// (2) JWT 생성할 경우 아래의 코드
export async function createJWT(classKey, expires) {
  // JWT 생성
  const token = jwt.sign(
    { classKey }, //
    config.jwt.secretKey,
    {
      expiresIn: expires,
    }
  );

  // 시간
  const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0];
  const time = new Date().toTimeString().split(" ")[0];

  const data = fs.promises
    .appendFile(
      "./csv_data/API_KEY.csv",
      classKey + "," + token + "," + date + " " + time + os.EOL
    )
    .catch(console.error);
  //   let data = {};
  //   for (let i = 0; i < students; i++) {
  //     const token = jwt.sign(
  //       {
  //         id: i,
  //       },
  //       config.jwt.secretKey,
  //       { expiresIn: expires }
  //     );
  //     data["key" + i] = token;
  //   }
  //   console.log(data);
  return data;
}
