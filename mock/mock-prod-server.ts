import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import userMock from './modules/user'

export function setupProdMockServer() {
  createProdMockServer([...userMock])
}
