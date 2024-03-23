export type CreateSpotControllerDTO = {
  authorId: string;
  name: string;
  description: string;
  hasRoof: string;
  isPaid: string;
  entryAmount?: string;
  address: string;
  longitude: string;
  latitude: string;
};

export type CreateSpotDTO = {
  authorId: string;
  name: string;
  description: string;
  hasRoof: boolean;
  isPaid: boolean;
  entryAmount?: number;
  address: string;
  longitude: number;
  latitude: number;
  images: string[];
};

export type FindSpotByNameDTO = {
  name: string;
  authorId: string;
};
