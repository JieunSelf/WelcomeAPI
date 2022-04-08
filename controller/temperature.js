import * as temperatureRepository from "../database/temperature.js";

function makeStartOrder(start) {
  const startYear = start.substr(0, 4);
  const startMonth = parseInt(start.substr(4, 5));
  const startOrder = (startYear - 2000) * 12 + startMonth - 1;
  return startOrder;
}

function makeEndOrder(end) {
  const endYear = end.substr(0, 4);
  const endMonth = parseInt(end.substr(4, 5));
  const endOrder = (endYear - 2000) * 12 + endMonth;
  return endOrder;
}

// 모든 지역 날씨
export async function getAllWeathers(req, res) {
  const start = req.query.start;
  const end = req.query.end;
  const startOrder = start ? makeStartOrder(start) : 0;
  const endOrder = end ? makeEndOrder(end) : 2000;

  const data = await temperatureRepository.getWeathersByMonth(
    "all",
    startOrder,
    endOrder
  );
  // ❗ 에러처리
  if (Array.isArray(data) && data.length === 0) {
    return res.status(404).json({ message: "연도와 월을 확인하세요." });
  }
  return res.status(200).json(data);
}

// 지역별 날씨
export async function getLocalWeathers(req, res) {
  const local = req.params.local;
  const start = req.query.start;
  const end = req.query.end;
  const startOrder = start ? makeStartOrder(start) : 0;
  const endOrder = end ? makeEndOrder(end) : 2000;

  const data = await temperatureRepository.getWeathersByMonth(
    local,
    startOrder,
    endOrder
  );
  // ❗ 에러처리
  if (!data) {
    return res.status(404).json({ message: "지역 코드를 확인하세요." });
  }
  if (Array.isArray(data) && data.length === 0) {
    return res.status(404).json({ message: "연도와 월을 확인하세요." });
  }
  res.status(200).json(data);
}
