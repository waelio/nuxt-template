import mitt from 'mitt'

type ApplicationEvents = {
  'user:registered': "User"
};

const emitter = mitt<ApplicationEvents>()

export const useEvent = emitter.emit
export const useListen = emitter.on

export default {
  useEvent, useListen
}