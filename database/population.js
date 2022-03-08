import * as fs from "fs";
import * as os from "os";
import * as iconv from "iconv";
import * as jschardet from "jschardet";

function encoder(data) {
  const encoder = new iconv.Iconv("euc-kr", "utf-8//translit//ignore");
  return encoder.convert(data).toString("utf-8");
}

function converter(csvText) {
  const [columns, ...rows] = csvText.trim(/\s/g).split(os.EOL);
  const keys = columns.split(",");
  const valuesArray = rows.map((row) => row.split(","));
  const jsonText = valuesArray.map((values) =>
    values.reduce((acc, v, i) => {
      acc[keys[i]] = parseInt(v);
      return acc;
    }, {})
  );
  return jsonText;
}

// 지역별 기온
export async function getAllPop() {
  const data = fs.promises
    .readFile("./csv_data/population.csv")
    // .then((data) => jschardet.detect(data))
    // .then(data => console.log(data))
    // .then((data) => data.toString())
    .then((data) => encoder(data))
    .then((data) => converter(data))
    .catch(console.error);
  return data;
}
