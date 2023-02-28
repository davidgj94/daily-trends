import { shake } from "radash";

import mongoFeedItemModel from "./feedItem";
import { FeedItemsRepository } from "Feed/domain/feedRepository";
import { FeedItem, ItemSource } from "Feed/domain/feedItem";
import {
  FailedWriteError,
  NotFoundError,
  UnexpectedError,
} from "Shared/domain/error";
import {
  failure,
  Failure,
  success,
  Success,
} from "Shared/domain/failureOrSuccess";
import { mongoFeedItemMapper } from "./feedItemMapper";
import { tryCatch } from "Shared/utils/tryCatchAsync";

export class MongoFeedItemsRepository implements FeedItemsRepository {
  async create(
    item: FeedItem
  ): Promise<
    | Failure<NotFoundError | UnexpectedError | FailedWriteError, never>
    | Success<never, FeedItem>
  > {
    try {
      const createResponse = await tryCatch(
        FailedWriteError,
        async () =>
          await mongoFeedItemModel.create({
            date: item.date,
            description: item.description,
            images: item.images,
            itemId: item.id,
            source: item.source,
            url: item.url,
          })
      );
      if (createResponse.isFailure()) return createResponse;
      return success(mongoFeedItemMapper(createResponse.value));
    } catch (error) {
      return failure(new UnexpectedError(error as any));
    }
  }

  async update(
    id: string,
    updates: Partial<FeedItem>
  ): Promise<
    | Failure<NotFoundError | UnexpectedError | FailedWriteError, never>
    | Success<never, FeedItem>
  > {
    try {
      const feedItemDb = await mongoFeedItemModel.findOne({ itemId: id });
      if (!feedItemDb) {
        return failure(new NotFoundError(new Error("feed item not found")));
      }
      feedItemDb.set(shake(updates));
      const updateResponse = await tryCatch(
        FailedWriteError,
        async () => await feedItemDb.save()
      );
      if (updateResponse.isFailure()) return updateResponse;
      return success(mongoFeedItemMapper(updateResponse.value));
    } catch (error) {
      return failure(new UnexpectedError(error as any));
    }
  }

  async findbyId(
    id: string
  ): Promise<
    Failure<NotFoundError | UnexpectedError, never> | Success<never, FeedItem>
  > {
    try {
      const feedItemDb = await mongoFeedItemModel.findOne({ itemId: id });
      if (!feedItemDb) {
        return failure(new NotFoundError(new Error("feed item not found")));
      }
      return success(mongoFeedItemMapper(feedItemDb));
    } catch (error) {
      return failure(new UnexpectedError(error as any));
    }
  }

  async getFeed(
    startDate: Date,
    endDate: Date,
    sources?: ItemSource[]
  ): Promise<
    Failure<NotFoundError | UnexpectedError, never> | Success<never, FeedItem[]>
  > {
    try {
      const dateFilter = { date: { $gte: startDate, $lt: endDate } };
      const sourceFilter = { source: sources };

      const feedItemsDb = await mongoFeedItemModel
        .find(
          sources?.length
            ? {
                $and: [dateFilter, sourceFilter],
              }
            : dateFilter
        )
        .sort({ date: "asc" });
      if (feedItemsDb.length === 0) {
        return failure(
          new NotFoundError(
            new Error(
              `feed items not found between ${startDate} and ${endDate}`
            )
          )
        );
      }
      return success(feedItemsDb.map(mongoFeedItemMapper));
    } catch (error) {
      return failure(new UnexpectedError(error as any));
    }
  }
}
