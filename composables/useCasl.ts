// @ts-ignore
import { useAbility } from '@casl/vue';


export const useCasl = () => {


  const { can, cannot } = useAbility();

  return {
    can,
    cannot
  }
}