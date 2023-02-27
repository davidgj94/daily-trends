import { Feed } from "Feed/domain/feed";
import { ItemSource, ItemSourceValues } from "Feed/domain/feedItem";
import { FeedItemsRepository } from "Feed/domain/feedRepository";
import { DateTime } from "luxon";
import { NotFoundError, UnexpectedError } from "Shared/domain/error";
import { FailureOrSuccess, success } from "Shared/domain/failureOrSuccess";
import { AsyncUseCase } from "Shared/domain/useCase";

type GetFeedRequest = { date: Date; selectedSources?: ItemSource[] };
type GetFeedResponse = FailureOrSuccess<NotFoundError | UnexpectedError, Feed>;

export class GetFeedUseCase
  implements AsyncUseCase<GetFeedRequest, GetFeedResponse>
{
  constructor(private feedItemsRepository: FeedItemsRepository) {}
  async execute({
    date,
    selectedSources,
  }: GetFeedRequest): Promise<GetFeedResponse> {
    const startDate = DateTime.fromJSDate(date).startOf("day").toJSDate();
    const endDate = DateTime.fromJSDate(startDate).plus({ days: 1 }).toJSDate();
    const getFeedResponse = await this.feedItemsRepository.getFeed(
      startDate,
      endDate,
      selectedSources
    );
    if (getFeedResponse.isFailure()) return getFeedResponse;
    const { value: feedItems } = getFeedResponse;
    return success(
      feedItems.reduce((acc, val) => {
        if (!acc[val.source]) {
          acc[val.source] = [];
        }
        acc[val.source]?.push(val);
        return acc;
      }, {} as Feed)
    );
  }
}
