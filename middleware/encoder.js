import * as iconv from "iconv";

export default function encoder(data) {
  const encoder = new iconv.Iconv("euc-kr", "utf-8//translit//ignore");

  return encoder.convert(data).toString("utf-8");
}
