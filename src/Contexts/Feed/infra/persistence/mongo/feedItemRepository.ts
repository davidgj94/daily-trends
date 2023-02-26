import mongoFeedItemModel from "./feedItem";
import { FeedItemsRepository } from "src/Contexts/Feed/domain/feedRepository";
import { FeedItem } from "src/Contexts/Feed/domain/feedItem";
import {
  NotFoundError,
  UnexpectedError,
} from "src/Contexts/Shared/domain/error";
import {
  failure,
  Failure,
  success,
  Success,
} from "src/Contexts/Shared/domain/failureOrSuccess";
import { mongoFeedItemMapper } from "./feedItemMapper";

export class MongoFeedItemsRepository implements FeedItemsRepository {
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

  async save(
    item: FeedItem
  ): Promise<
    Failure<NotFoundError | UnexpectedError, never> | Success<never, FeedItem>
  > {
    try {
      let feedItemDb = await mongoFeedItemModel.findOne({ itemId: item.id });
      if (!feedItemDb) {
        feedItemDb = await mongoFeedItemModel.create({
          date: item.date,
          description: item.description,
          images: item.images,
          itemId: item.id,
          source: item.source,
          url: item.url,
        });
      } else {
        feedItemDb.set({
          date: item.date,
          description: item.description,
          images: item.images,
          itemId: item.id,
          source: item.source,
          url: item.url,
        });
      }
      return success(mongoFeedItemMapper(feedItemDb));
    } catch (error) {
      return failure(new UnexpectedError(error as any));
    }
  }

  async getFeed(
    startDate: Date,
    endDate: Date
  ): Promise<
    Failure<NotFoundError | UnexpectedError, never> | Success<never, FeedItem[]>
  > {
    try {
      const feedItemsDb = await mongoFeedItemModel.find({
        date: { $gte: startDate, $lt: endDate },
      });
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
