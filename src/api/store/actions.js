import { Actions as FlowAction } from './module/flows'
import { Actions as SocketAction } from './module/socket'
export default {
  'Flows': {
    ...FlowAction
  },
  'Socket': {
    ...SocketAction
  }
}
