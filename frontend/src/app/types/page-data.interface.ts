export interface IPageData<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
  data: T[];
}
