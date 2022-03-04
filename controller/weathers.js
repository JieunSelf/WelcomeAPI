import * as weatherRepository from "../database/weathers.js";

export async function getAllWeathers(req, res) {
  const data = await weatherRepository.getWeathers('all');
  res.status(200).json(data);
}

export async function getLocalWeathers(req, res) {
  const local = req.params.local;
  const data = await weatherRepository.getWeathers(local);
  // ❗ 에러처리 필요함.
  res.status(200).json(data);
}
