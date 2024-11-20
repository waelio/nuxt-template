import { useState, useRequestFetch } from 'nuxt/app'
import { computed } from 'vue'
import type { AuthPayload } from '../../shared/types'


let useUserSessionState = () => useState<AuthPayload>('nuxt-mongoose-auth', () => ({}))

export function useAuth() {
  var sessionState = useUserSessionState()

  return {
    loggedIn: computed(() => Boolean(sessionState.value?.email)),
    user: computed(() => sessionState.value || null),
    clear,
    me,
  }
}

async function me() {
    const sessionState = useUserSessionState()

  useUserSessionState().value = await useRequestFetch()('/api/auth/me', {
    headers: {
      Accept: 'text/json'
    }
  }).catch(() => ({}))
}

async function clear() {
  await $fetch('/api/auth/logout', { method: 'DELETE' })
  useUserSessionState().value = {}
}
