import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

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
    const saveResult = await mongoRepository.create(feedItem);
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
    let saveResult = await mongoRepository.create(feedItem);
    expect(saveResult.isSuccess()).toBe(true);

    feedItem.description = faker.lorem.paragraph();
    saveResult = await mongoRepository.create(feedItem);
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
    let saveResult = await mongoRepository.create(feedItem);
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

  it("returns feed Items between requested dates", async () => {
    const feedItem1 = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elMundo",
      [faker.internet.url()],
      DateTime.now().startOf("day").plus({ hours: 4 }).toJSDate(),
      faker.lorem.paragraph()
    );
    let saveResult = await mongoRepository.create(feedItem1);
    expect(saveResult.isSuccess()).toBe(true);

    const feedItem2 = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elPais",
      [faker.internet.url()],
      DateTime.now().startOf("day").plus({ hours: 6 }).toJSDate(),
      faker.lorem.paragraph()
    );
    saveResult = await mongoRepository.create(feedItem2);
    expect(saveResult.isSuccess()).toBe(true);

    const feedItem3 = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elPais",
      [faker.internet.url()],
      DateTime.now().startOf("day").minus({ days: 1 }).toJSDate(),
      faker.lorem.paragraph()
    );
    saveResult = await mongoRepository.create(feedItem3);
    expect(saveResult.isSuccess()).toBe(true);

    const getFeedResult = await mongoRepository.getFeed(
      DateTime.now().startOf("day").toJSDate(),
      DateTime.now().startOf("day").plus({ days: 1 }).toJSDate()
    );
    expect(getFeedResult.isSuccess()).toBe(true);
    expect(getFeedResult.value).toEqual([feedItem1, feedItem2]);
  });

  it("only returns feed Items from selected sources", async () => {
    const feedItem1 = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elMundo",
      [faker.internet.url()],
      DateTime.now().startOf("day").plus({ hours: 4 }).toJSDate(),
      faker.lorem.paragraph()
    );
    let saveResult = await mongoRepository.create(feedItem1);
    expect(saveResult.isSuccess()).toBe(true);

    const feedItem2 = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elPais",
      [faker.internet.url()],
      DateTime.now().startOf("day").plus({ hours: 6 }).toJSDate(),
      faker.lorem.paragraph()
    );
    saveResult = await mongoRepository.create(feedItem2);
    expect(saveResult.isSuccess()).toBe(true);

    const getFeedResult = await mongoRepository.getFeed(
      DateTime.now().startOf("day").toJSDate(),
      DateTime.now().startOf("day").plus({ days: 1 }).toJSDate(),
      ["elMundo"]
    );
    expect(getFeedResult.isSuccess()).toBe(true);
    expect(getFeedResult.value).toEqual([feedItem1]);
  });
});
