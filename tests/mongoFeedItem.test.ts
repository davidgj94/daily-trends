import { faker } from "@faker-js/faker";

import { MongoFeedItemsRepository } from "Feed/infra/persistence/mongo/feedItemRepository";
import { FeedItem } from "Feed/domain/feedItem";
import { idGenerator } from "Shared/infra/idGenerator";

const mongoRepository = new MongoFeedItemsRepository();

describe("Feed mongo repository integration tests", () => {
  it("saves domain new Feed items in mongodb", async () => {
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

  it("updates existing Feed items in mongodb", async () => {
    const feedItem = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elMundo",
      [faker.internet.url()],
      new Date(),
      faker.lorem.paragraph()
    );
    let saveResult = await mongoRepository.save(feedItem);
    expect(saveResult.isSuccess()).toBe(true);

    feedItem.description = faker.lorem.paragraph();
    saveResult = await mongoRepository.save(feedItem);
    expect(saveResult.isSuccess()).toBe(true);
    expect(saveResult.value).toEqual(feedItem);
  });

  it("finds by domain id", async () => {
    const feedItem = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elMundo",
      [faker.internet.url()],
      new Date(),
      faker.lorem.paragraph()
    );
    let saveResult = await mongoRepository.save(feedItem);
    expect(saveResult.isSuccess()).toBe(true);
    const findResult = await mongoRepository.findbyId(feedItem.id);
    expect(findResult.isSuccess()).toBe(true);
    expect(findResult.value).toEqual(feedItem);
  });

  it("returns NotFound error if feedItem doesn't exist", async () => {
    const findResult = await mongoRepository.findbyId(idGenerator());
    expect(findResult.isFailure()).toBe(true);
    expect(findResult.error.type === "NotFound").toBe(true);
  });
});