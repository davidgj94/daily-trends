import { IError } from "Shared/domain/error";
import {
  failure,
  FailureOrSuccess,
  success,
} from "Shared/domain/failureOrSuccess";

export const tryCatch = async <E extends IError, T>(
  type: { new (...args: any[]): E },
  f: () => Promise<T>
): Promise<FailureOrSuccess<E, T>> => {
  try {
    return success(await f());
  } catch (e) {
    return failure(new type(e));
  }
};
