import * as fs from "fs";
import * as os from "os";
import * as iconv from "iconv";
// import * as jschardet from "jschardet";

function encoder(data) {
  const encoder = new iconv.Iconv("euc-kr", "utf-8//translit//ignore");
  return encoder.convert(data).toString("utf-8");
}

function converter(csvText, local) {
  const [columns, ...rows] = csvText.trim(/\s/g).split(os.EOL);
  const keys = columns.split(",");
  const valuesArray = rows.map((row) => row.split(","));
  const localKey =
    local == "seoul"
      ? 1
      : local == "busan"
      ? 2
      : local == "jeju"
      ? 3
      : local == "daejeon"
      ? 4
      : undefined;
  // local == '!@#WETGDV'인 경우, 에러처리하기

  const new_keys = localKey ? [keys[0], keys[localKey]] : keys;
  const newValuesArray = localKey
    ? valuesArray.map((values) => [values[0], values[localKey]])
    : valuesArray;

  const jsonText = newValuesArray.map((values) =>
    values.reduce((acc, v, i) => {
      acc[new_keys[i]] = v;
      return acc;
    }, {})
  );
  return jsonText;
}

// 지역별 기온
export async function getWeathers(local) {
  const data = fs.promises
    .readFile("./csv_data/temperature.csv")
    // .then(data=> jschardet.detect(data))
    // .then(console.log)
    .then((data) => encoder(data))
    .then((data) => converter(data, local))
    .catch(console.error);
  return data;
}

// 연도별 기온??
export async function getWeathersByYear(year) {}

// 지역별 연도별 기온
