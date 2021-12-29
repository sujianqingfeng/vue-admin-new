import { isRef, onMounted, onUnmounted, Ref, unref } from 'vue'

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

  const targetIsRef = isRef(target)

  if (!targetIsRef) {
    target.addEventListener(event, listener, options)
  }

  onMounted(() => {
    if (targetIsRef) {
      unref(target).addEventListener(event, listener, options)
    }
  })

  onUnmounted(() => {
    unref(target).removeEventListener(event, listener)
  })
}
