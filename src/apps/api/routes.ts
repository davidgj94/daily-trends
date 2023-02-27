import { Router } from "express";
import { query } from "express-validator";
import { ItemSourceValues } from "Feed/domain/feedItem";
import { createItemController } from "./controllers/createItemController";
import { getFeedController } from "./controllers/getFeedController";
import { updateItemController } from "./controllers/updateItemController";

const router = Router();
router.get(
  "/feed",
  query("date").isDate(),
  query("sources.*").isIn(ItemSourceValues),
  getFeedController
);
router.post("/item", createItemController);
router.put("/item/:id", updateItemController);

export default router;
