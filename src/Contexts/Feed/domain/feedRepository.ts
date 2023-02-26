import {
  NotFoundError,
  UnexpectedError,
} from "src/Contexts/Shared/domain/error";
import { FailureOrSuccess } from "src/Contexts/Shared/domain/failureOrSuccess";
import { FeedItem, ItemSource } from "./feedItem";

type Response = FailureOrSuccess<NotFoundError | UnexpectedError, FeedItem>;
type ArrayResponse = FailureOrSuccess<
  NotFoundError | UnexpectedError,
  FeedItem[]
>;

export interface FeedItemsRepository {
  findbyId(id: string): Promise<Response>;
  save(item: FeedItem): Promise<Response>;
  getFeed(
    startDate: Date,
    endDate: Date,
    sources?: ItemSource[]
  ): Promise<ArrayResponse>;
}
