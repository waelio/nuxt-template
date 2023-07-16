// @ts-ignore
import { useAbility } from '@casl/vue';


export function useCasl() {
  const { can, cannot } = useAbility();
  return {
    can,
    cannot
  }
}