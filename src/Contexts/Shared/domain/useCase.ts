export interface AsyncUseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}
