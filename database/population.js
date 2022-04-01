import * as fs from "fs";
import * as os from "os";
import * as iconv from "iconv";
import * as jschardet from "jschardet";

function encoder(data) {
  const encoder = new iconv.Iconv("euc-kr", "utf-8//translit//ignore");

  return encoder.convert(data).toString("utf-8");
}

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
  console.log('startAge :', startAge)
  console.log('endAge : ', endAge)
  const [columns, ...rows] = data.trim(/\s/g).split(os.EOL);
  const keys = columns.split(",");
  const valuesArray = rows.map((row) => row.split(","));
  const startOrder = makeAgeOrder(parseInt(startAge));
  const endOrder = makeAgeOrder(parseInt(endAge));
  console.log('startOrder', startOrder)
  console.log('endOrder', endOrder)

  const new_keys = keys.slice(startOrder, endOrder + 1);
  console.log('new_keys', new_keys);

  const newValuesArray = [valuesArray[year - 1993].slice(startOrder, endOrder+1)];
  console.log('newValuesArray', newValuesArray)

  const jsonText = newValuesArray.map((values) =>
    values.reduce((acc, v, i) => {
      acc[new_keys[i]] = parseInt(v);
      console.log(acc);
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
