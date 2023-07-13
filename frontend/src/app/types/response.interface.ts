export interface IResponse<T = undefined> {
  success: boolean;
  data: T;
}
