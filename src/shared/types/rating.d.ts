export type CreateRatingDTO = {
  userId: string;
  spotId: string;
  comment: string;
  title: string;
  rate: number;
};

export type FindRateExistingDTO = {
  userId: string;
  spotId: string;
  title: string;
  comment: string;
};
