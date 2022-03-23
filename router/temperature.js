import express from "express";
import "express-async-errors";
import * as temperatureController from "../controller/temperature.js";

const router = express.Router();
export default router;

// GET /weathers
router.get("/", temperatureController.getAllWeathers);

router.get("/:local", temperatureController.getLocalWeathers);