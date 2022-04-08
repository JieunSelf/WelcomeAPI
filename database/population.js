import * as fs from "fs";
import * as os from "os";
import * as iconv from "iconv";
import * as jschardet from "jschardet";
import encoder from "../middleware/encoder.js";

function makeAgeOrder(age) {
  if (age < 80) {
    return age + 2;
  } else if (age > 79 && age < 85) {
    return age + 3;
  } else if (age > 84 && age < 100) {
    return age + 4;
  } else if (age > 99) {
    return 105;
  }
}

function converter(data, startAge, endAge, year) {
  const [columns, ...rows] = data.trim(/\s/g).split(os.EOL);
  const keys = columns.split(",");
  const valuesArray = rows.map((row) => row.split(","));
  const startOrder = makeAgeOrder(parseInt(startAge));
  const endOrder = makeAgeOrder(parseInt(endAge));

  const new_keys = keys.slice(startOrder, endOrder + 1);
  const newValuesArray = [
    valuesArray[year - 1993].slice(startOrder, endOrder + 1),
  ];
  const jsonText = newValuesArray.map((values) =>
    values.reduce((acc, v, i) => {
      acc[new_keys[i]] = parseInt(v);
      return acc;
    }, {})
  );

  return jsonText;
}

//
export async function getPopulation(startAge, endAge, year) {
  const data = fs.promises
    .readFile("./csv_data/population_total.csv")
    // .then((data) => jschardet.detect(data))
    // .then(data => console.log(data))
    // .then((data) => data.toString())
    .then((data) => encoder(data))
    .then((data) => converter(data, startAge, endAge, year))
    .catch(console.error);
  return data;
}
