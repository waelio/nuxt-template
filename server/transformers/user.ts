import { UserT } from "../../types"

export const userTransformer = (user: UserT): Partial<UserT> => {
  return !!user
    ? {
      id: user.id,
      email: user.email,
      username: user.username,
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