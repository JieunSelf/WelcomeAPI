import * as populationRepository from "../database/population.js";

export async function getAllPop(req, res) {
  const data = await populationRepository.getAllPop();
  res.status(200).json(data);
}
