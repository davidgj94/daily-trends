import { faker } from "@faker-js/faker";

import { GetFeedUseCase } from "Feed/application/getFeed";
import { FeedItem } from "Feed/domain/feedItem";
import { DateTime } from "luxon";
import { success } from "Shared/domain/failureOrSuccess";
import { idGenerator } from "Shared/infra/idGenerator";

describe("Get Feed Use Case unit tests", () => {
  it("returns feed with correct format", async () => {
    const elPaisItem = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elPais",
      [faker.internet.url()],
      DateTime.now().startOf("day").plus({ hours: 1 }).toJSDate(),
      faker.lorem.paragraph()
    );
    const elMundoItem = new FeedItem(
      idGenerator(),
      faker.internet.url(),
      "elMundo",
      [faker.internet.url()],
      DateTime.now().startOf("day").plus({ hours: 1 }).toJSDate(),
      faker.lorem.paragraph()
    );
    const getFeedUseCase = new GetFeedUseCase({
      async getFeed() {
        return success([elMundoItem, elPaisItem]);
      },
    } as any);
    const getFeedResult = await getFeedUseCase.execute({ date: new Date() });
    expect(getFeedResult.isSuccess()).toBe(true);
    expect(getFeedResult.value["elMundo"]).toEqual([elMundoItem]);
    expect(getFeedResult.value["elPais"]).toEqual([elPaisItem]);
  });
});
