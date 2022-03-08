import express from "express";
import "express-async-errors";
import * as populationController from "../controller/population.js";

const router = express.Router();
export default router;

// GET /pop
router.get("/", populationController.getAllPop);