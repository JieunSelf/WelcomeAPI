import * as fs from "fs";
import * as os from "os";
import * as iconv from "iconv";
// import * as jschardet from "jschardet";
import encoder from "../middleware/encoder.js";

function getLocalKey(local) {
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
  if (localKey === 10) {
    return false;
  }
  return localKey;
}

function converter(csvText, local, start, end) {
  const [columns, ...rows] = csvText.trim(/\s/g).split(os.EOL);
  const keys = columns.split(",");
  const valuesArray = rows.map((row) => row.split(","));
  const localKey = getLocalKey(local);
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

export async function getWeathersByMonth(local, startOrder, endOrder) {
  const data = fs.promises
    .readFile("./csv_data/local_temperature.csv")
    .then((data) => encoder(data))
    .then((data) => converter(data, local, startOrder, endOrder))
    .catch(console.error);
  return data;
}
