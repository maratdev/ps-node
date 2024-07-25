import express from "express";
import {saveData, getForCast} from "../weather/weather.js";
export const router = express.Router();

router.post('/add', saveData)
router.get('/all', getForCast)

export default router;

