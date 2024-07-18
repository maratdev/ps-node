import express from "express";
export const router = express.Router();
import weatherRoutes from "./weather-routes.js";

router.use('/weather', weatherRoutes);