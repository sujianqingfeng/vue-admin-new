import Modal from './modal.vue'

export type IModalInstance = {
  show: () => void
  hide: () => void
  showLoading: () => void
}

export { Modal }
