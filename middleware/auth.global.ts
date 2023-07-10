import { useAuthStore } from '~/store/auth.pinia'

export default defineNuxtRouteMiddleware(async (to) => {

  const { isAuthenticated, useAuthUser } = useAuth()
  const user = toRaw(useAuthUser().value)
  const auth = useAuthStore()

  console.log('to', to);
  console.log('user', user);

  console.log(isAuthenticated);
  if (!!user && !!isAuthenticated) {
    auth.setUserInfo(user)
   }


})
