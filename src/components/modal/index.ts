import Modal from './modal.vue'

type IModalInstance = {
  show: () => void
  hide: () => void
  showLoading: () => void
}

export { Modal, IModalInstance }
