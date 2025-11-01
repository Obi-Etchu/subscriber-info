import express from "express";
import { getSubscriber } from "../controllers/subscriberController.js";

const router = express.Router();

router.get("/:query", getSubscriber);

export default router;