import { Router } from "express";
import { query } from "express-validator";
import { ItemSourceValues } from "Feed/domain/feedItem";
import { getFeedController } from "./controllers/getFeedController";

const router = Router();
router.get(
  "/feed",
  query("date").isDate(),
  query("sources.*").isIn(ItemSourceValues),
  getFeedController
);

export default router;
