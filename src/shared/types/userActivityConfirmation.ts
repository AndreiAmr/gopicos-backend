import { ActivityEnum } from '@prisma/client';

export type FindByEmailAndTypeDTO = {
  email: string;
  type: ActivityEnum;
};

export type CreateActivityConfirmationDTO = {
  email: string;
  token: string;
  type: ActivityEnum;
};

export type DeleteActivityConfirmationDTO = {
  id: string;
};
