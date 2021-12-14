import { useAccountStore } from '@/store/modules/account'
import { computed } from 'vue'

export function useAccount() {
  const accountStore = useAccountStore()

  const menus = computed(() => accountStore.menus)

  return { menus }
}
