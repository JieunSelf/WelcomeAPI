import * as temperatureRepository from "../database/temperature.js";

export async function getAllWeathers(req, res) {
  const local = req.query.local;
  if (local) {
    const data = await temperatureRepository.getWeathers(local);
    return res.status(200).json(data);
  } else {
    const data = await temperatureRepository.getWeathers("all");
    return res.status(200).json(data);
  }
}

export async function getLocalWeathers(req, res) {
  const local = req.params.local;
  const data = await temperatureRepository.getWeathers(local);
  // ❗ 에러처리 필요함.
  res.status(200).json(data);
}
