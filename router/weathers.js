import express from "express";
import "express-async-errors";
import * as weatherController from "../controller/weathers.js";

const router = express.Router();
export default router;

// GET /weathers
router.get("/", weatherController.getAllWeathers);

router.get("/:local", weatherController.getLocalWeathers);
