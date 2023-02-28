import { Router } from "express";
import { body, query } from "express-validator";
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
router.post(
  "/item",
  body("url").isURL(),
  body("source").isIn(ItemSourceValues),
  body("date").isDate(),
  body("description").isString().optional(),
  body("images.*").isURL(),
  createItemController
);
router.put(
  "/item/:id",
  body("url").isURL(),
  body("description").isString().optional(),
  body("images.*").isURL(),
  updateItemController
);

export default router;
