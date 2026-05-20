import { reactive, readonly } from 'vue'

interface Toast {
  id: number
  type: 'success' | 'error' | 'info'
  message: string
}

const _toasts = reactive<Toast[]>([])
let _nextId = 0

export function useToast() {
  function add(type: Toast['type'], message: string, duration = 4000) {
    const id = ++_nextId
    _toasts.push({ id, type, message })
    setTimeout(() => remove(id), duration)
  }

  function remove(id: number) {
    const idx = _toasts.findIndex(t => t.id === id)
    if (idx !== -1) _toasts.splice(idx, 1)
  }

  return {
    toasts: readonly(_toasts),
    success: (msg: string, duration?: number) => add('success', msg, duration),
    error: (msg: string, duration?: number) => add('error', msg, duration),
    info: (msg: string, duration?: number) => add('info', msg, duration),
    remove,
  }
}
