import EventEmitter from 'events'
import { events } from '../../../config/events/list'

const emitter = new EventEmitter()

export const bootEvents = () => {
  events.map((event) => {
    emitter.on(event.name, event.listener.handle.bind(event.listener))
  })
}

export default emitter
