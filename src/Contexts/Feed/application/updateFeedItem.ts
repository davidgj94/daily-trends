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

type UpdateItemRequest = {
  id: string;
  updates: Pick<FeedItem, "description" | "url" | "images">;
};
type UpdateItemResponse = FailureOrSuccess<
  FailedWriteError | NotFoundError | UnexpectedError,
  FeedItem
>;

export class UpdateFeedItemUseCase
  implements AsyncUseCase<UpdateItemRequest, UpdateItemResponse>
{
  constructor(private feedItemRepository: FeedItemsRepository) {}
  async execute(request: UpdateItemRequest): Promise<UpdateItemResponse> {
    const updateResponse = await this.feedItemRepository.update(
      request.id,
      request.updates
    );
    if (updateResponse.isFailure()) return updateResponse;
    return success(updateResponse.value);
  }
}
