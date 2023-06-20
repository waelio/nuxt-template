import { TUSER } from "../../types"

export const userTransformer = (user: TUSER): Partial<TUSER> => {
  return !!user
    ? {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.first_name,
      first_name: user.first_name,
      last_name: user.last_name,
      profileImage: user.profileImage,
      role: user.role,
      tweet: [],
      mediaFiles: [],
      handle: `@${user.username}`
    }
    : user
}