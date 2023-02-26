import { v4 as uuid } from "uuid";

import mongoFeedItemModel from "src/Contexts/Feed/infra/persistence/mongo/feedItem";
import { MongoFeedItemsRepository } from "src/Contexts/Feed/infra/persistence/mongo/feedItemRepository";

test("findById", async () => {
  const itemId = uuid();
  await mongoFeedItemModel.create({ itemId, url: "bb" });
  const result = await new MongoFeedItemsRepository().findbyId(itemId);
  console.log(result);
});
