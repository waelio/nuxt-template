import { CaslActionE, CaslSubjectE } from "../../types";

export const Category = [
  { action: CaslActionE.CREATE, subject: CaslSubjectE.CATEGORY },
  { action: CaslActionE.READ, subject: CaslSubjectE.CATEGORY },
  { action: CaslActionE.UPDATE, subject: CaslSubjectE.CATEGORY },
  { action: CaslActionE.DELETE, subject: CaslSubjectE.CATEGORY },
];

export const Post = [
  { action: CaslActionE.CREATE, subject: CaslSubjectE.POST },
  { action: CaslActionE.READ, subject: CaslSubjectE.POST },
  { action: CaslActionE.UPDATE, subject: CaslSubjectE.POST },
  { action: CaslActionE.DELETE, subject: CaslSubjectE.POST },
];
export const RestreshToken = [
  { action: CaslActionE.CREATE, subject: CaslSubjectE.REFRESH_TOKEN },
  { action: CaslActionE.READ, subject: CaslSubjectE.REFRESH_TOKEN },
  { action: CaslActionE.UPDATE, subject: CaslSubjectE.REFRESH_TOKEN },
  { action: CaslActionE.DELETE, subject: CaslSubjectE.REFRESH_TOKEN },

];
export const User = [
  { action: CaslActionE.CREATE, subject: CaslSubjectE.USER },
  { action: CaslActionE.READ, subject: CaslSubjectE.USER },
  { action: CaslActionE.UPDATE, subject: CaslSubjectE.USER },
  { action: CaslActionE.DELETE, subject: CaslSubjectE.USER },
];
export const Root = [
  { action: CaslActionE.MANAGE, subject: CaslSubjectE.ADMIN },
  { action: CaslActionE.MANAGE, subject: CaslSubjectE.CATEGORY },
  { action: CaslActionE.MANAGE, subject: CaslSubjectE.POST },
  { action: CaslActionE.MANAGE, subject: CaslSubjectE.REFRESH_TOKEN },
  { action: CaslActionE.MANAGE, subject: CaslSubjectE.USER },
];
export const Subjects = {
  Category,
  Post,
  RestreshToken,
  User,
  Root
};

export default {
  Category,
  Post,
  RestreshToken,
  User,
  Root
};