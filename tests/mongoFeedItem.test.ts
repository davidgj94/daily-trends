import { faker } from "@faker-js/faker";

import { MongoFeedItemsRepository } from "Feed/infra/persistence/mongo/feedItemRepository";
import { FeedItem } from "Feed/domain/feedItem";
import { idGenerator } from "Shared/infra/idGenerator";

const mongoRepository = new MongoFeedItemsRepository();

describe("Feed mongo repository integration tests", () => {
  it("saves domain Feed items in mongodb", async () => {
    const feedItem = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elMundo",
      [faker.internet.url()],
      new Date(),
      faker.lorem.paragraph()
    );
    const saveResult = await mongoRepository.save(feedItem);
    expect(saveResult.isSuccess()).toBe(true);
    const savedFeedItem = saveResult.value;
    expect(savedFeedItem).toEqual(feedItem);
  });
});
