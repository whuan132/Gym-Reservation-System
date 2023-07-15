export interface IReview {
  _id: string;
  rating: number;
  comment: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
}
