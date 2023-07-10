import { Prisma } from '@prisma/client';

export const replaceNullWithDbNull = (obj: Record<string, any>) => {
  for (const key in obj) {
    if (obj[key] === null) {
      obj[key] = Prisma.DbNull;
    } else if (typeof obj[key] === `object`) {
      replaceNullWithDbNull(obj[key]);
    }
  }

  return obj;
};