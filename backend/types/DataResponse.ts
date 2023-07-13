export interface DataResponse<T = undefined> {
  success: boolean;
  data?: T;
}
