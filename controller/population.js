import * as populationRepository from "../database/population.js";

export async function getPopulation(req, res) {
  const startAge = req.query.startAge ? req.query.startAge : 0;
  const endAge = req.query.endAge ? req.query.endAge : 100;
  const year = req.params.year;

  const data = await populationRepository.getPopulation(startAge, endAge, year);
  if (Object.keys(data[0]).length === 0) {
    return res.status(404).json({ message: "데이터가 존재하지 않습니다." });
  }
  return res.status(200).json(data);
}
