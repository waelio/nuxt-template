
// @ts-ignore
import { useState } from 'nuxt/app'
import { useQuasar } from 'quasar'
import type { Ref } from 'vue'
import type { LightModesE } from '../../shared/types'
const $q = useQuasar()


export interface useLightMode {
  [key: string]: Ref<Partial<LightModesE>>
}
export default () => {
  const isDark = $q.dark.isActive
  const lightMode = $q.dark.mode
  const toggleDark = $q.dark.toggle()

  const useLightMode = () => {
    () => useState('light_mode', () => lightMode);
    () => useState('is_dark', () => isDark)
    return {
      lightMode,
      toggleDark,
      isDark
    }
  }



  return {
    lightMode,
    toggleDark,
    isDark,
    useLightMode
  }

}