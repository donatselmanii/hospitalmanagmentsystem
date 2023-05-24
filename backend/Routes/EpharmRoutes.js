import express from "express";
import { SaveProduct } from "../Controllers/EpharmController.js";

const router = express.Router();

router.post('/', SaveProduct);

export default router;