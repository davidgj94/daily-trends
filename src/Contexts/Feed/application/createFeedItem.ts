import { FeedItem } from "Feed/domain/feedItem";
import { FeedItemsRepository } from "Feed/domain/feedRepository";
import {
  BadRequestError,
  FailedWriteError,
  NotFoundError,
  UnexpectedError,
} from "Shared/domain/error";
import { FailureOrSuccess, success } from "Shared/domain/failureOrSuccess";
import { AsyncUseCase } from "Shared/domain/useCase";
import { idGenerator } from "Shared/infra/idGenerator";

export type CreateItemRequest = Omit<FeedItem, "id">;
type CreateItemResponse = FailureOrSuccess<
  FailedWriteError | NotFoundError | UnexpectedError,
  string
>;

export class CreateFeedItemUseCase
  implements AsyncUseCase<CreateItemRequest, CreateItemResponse>
{
  constructor(private feedItemRepository: FeedItemsRepository) {}
  async execute(request: CreateItemRequest): Promise<CreateItemResponse> {
    const feedItem = new FeedItem(
      idGenerator(),
      request.url,
      request.source,
      request.images,
      request.date,
      request.description
    );
    const createResponse = await this.feedItemRepository.create(feedItem);
    if (createResponse.isFailure()) return createResponse;
    return success(createResponse.value.id);
  }
}
