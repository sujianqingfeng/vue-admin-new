import { onMounted, onUnmounted, Ref, unref } from 'vue'

export function useEventListener(
  target: EventTarget | Ref,
  event: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  if (!target) {
    console.error(`useEventListener:target is null`)
    return
  }

  onMounted(() => {
    unref(target).addEventListener(event, listener, options)
  })

  onUnmounted(() => {
    unref(target).removeEventListener(event, listener)
  })
}
