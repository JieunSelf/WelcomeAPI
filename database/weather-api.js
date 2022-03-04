// 기상청 데이터

import fetch from "node-fetch";
// import axios from "axios";

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + month + day;
}

export async function getAllWeathers() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  // 초단기 실황조회
  const URL1 =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";

  const APIKEY =
    "lii%2Fo07j1Jwmd4OunbQjb%2Bu%2FLhriZVh1Q3SBdmEZJY9s6m%2BjxFWzmwxn3rkCxfHUT8mygTFSxVgLZWptmMj4ZQ%3D%3D";

  const TODAY = getToday();

  const data = fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${APIKEY}&numOfRows=10&pageNo=1
    &base_date=${TODAY}&base_time=0630&nx=55&ny=127&dataType=JSON
    `,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return data;
}
