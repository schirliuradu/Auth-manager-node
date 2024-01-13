import { Dispatchable } from '../../events/interfaces/dispatchable'

export interface Listenable {
  handle(event: Dispatchable): void
}
