import * as fs from "fs";
import * as os from "os";
import * as iconv from "iconv";
// import * as jschardet from "jschardet";

function encoder(data) {
  const encoder = new iconv.Iconv("euc-kr", "utf-8//translit//ignore");
  return encoder.convert(data).toString("utf-8");
}

function converter(csvText, local, start, end) {
  const [columns, ...rows] = csvText.trim(/\s/g).split(os.EOL);
  const keys = columns.split(",");
  const valuesArray = rows.map((row) => row.split(","));
  const localKey =
    local == "seoul"
      ? 1
      : local == "busan"
      ? 2
      : local == "daegu"
      ? 3
      : local == "incheon"
      ? 4
      : local == "gwangju"
      ? 5
      : local == "daejeon"
      ? 6
      : local == "ulsan"
      ? 7
      : local == "gangneung"
      ? 8
      : local == "jeju"
      ? 9
      : local == "all"
      ? undefined
      : 10;
  // local == '!@#WETGDV'인 경우, 에러처리하기
  if (localKey === 10) {
    return false;
  }

  const new_keys = localKey ? [keys[0], keys[localKey]] : keys;
  const newValuesArray = localKey
    ? valuesArray
        .map((values) => [values[0], values[localKey]])
        .slice(start, end)
    : valuesArray.slice(start, end);

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
    .readFile("./csv_data/local_temperature.csv")
    // .then(data=> jschardet.detect(data))
    // .then(console.log)
    .then((data) => encoder(data))
    .then((data) => converter(data, local))
    .catch(console.error);
  // let result = {};
  // result["title"] = "월별 평균기온";
  // result["start"] = "2000년 1월";
  // result["end"] = "2022년 2월";
  // result["data"] = await data;
  return data;
}

// 연도별 기온??
export async function getWeathersByMonth(local, startOrder, endOrder) {
  const data = fs.promises
    .readFile("./csv_data/local_temperature.csv")
    .then((data) => encoder(data))
    .then((data) => converter(data, local, startOrder, endOrder))
    .catch(console.error);
  return data;
}
