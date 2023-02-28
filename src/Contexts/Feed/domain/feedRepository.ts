import {
  FailedWriteError,
  NotFoundError,
  UnexpectedError,
} from "Shared/domain/error";
import { FailureOrSuccess } from "Shared/domain/failureOrSuccess";
import { FeedItem, ItemSource } from "./feedItem";

type Response = FailureOrSuccess<
  NotFoundError | UnexpectedError | FailedWriteError,
  FeedItem
>;
type ArrayResponse = FailureOrSuccess<
  NotFoundError | UnexpectedError,
  FeedItem[]
>;

export interface FeedItemsRepository {
  findbyId(id: string): Promise<Response>;
  create(item: FeedItem): Promise<Response>;
  update(id: string, updates: Partial<FeedItem>): Promise<Response>;
  getFeed(
    startDate: Date,
    endDate: Date,
    sources?: ItemSource[]
  ): Promise<ArrayResponse>;
}
