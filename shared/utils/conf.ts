import client from '~/config/client'
import dev from '~/config/dev'
import prod from '~/config/prod'
import server from '~/config/server'

class Conf {
  [x: string]: {};
  constructor() {
    const self = this;

    self.setEnvironment()
    self._server = self.getServerVars()
    self._client = self.getClientVars()
    self._dev = self.getUrgentOverrides()

    self._store = Object.assign(
      {},
      { ...self._client },
      { ...(self._server ? self._server : self._server) },
      { ...self._dev },
      { client: self._client },
      { server: self._server ? self._server : self._server },
      { dev: self._dev },
    )
    // console.log("this._store", this._store);
  }

  set(key: string, value: string | number | object) {
    if (key.match(/:/)) {
      const keys = key.split(':')
      let storeKey = this._store

      keys.forEach(function (k: string | number, i: number) {
        if (keys.length === i + 1) {
          storeKey[k] = value
        }

        if (storeKey[k] === undefined) {
          storeKey[k] = {}
        }

        storeKey = storeKey[k]
      })
    } else {
      this._store[key] = value
    }
  }

  getAll() {
    return this._store
  }

  getItem(key: string) {
    return this._store[key]
  }

  get(key: string) {
    // Is the key a nested object
    if (key.match(/:/)) {
      // Transform getter string into object
      const storeKey = this.buildNestedKey(key)
      return storeKey
    }

    // Return regular key
    return this._store[key]
  }

  client() {
    return this.getItem('client')
  }

  dev() {
    return this.getItem('dev')
  }


  server() {
    return this.getItem('server')
  }

  store() {
    return this._store
  }

  has(key: any) {
    return Boolean(this.get(key))
  }

  setEnvironment() {
    if (process.browser) {
      this._env = 'client'
    } else {
      this._env = 'server'
    }
  }

  getServerVars() {
    let serverVars = {}

    if (this._env === 'server') {
      try {
        serverVars = server
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn("Didn't find a server config in `./config`.")
        }
      }
    }

    return serverVars
  }

  getClientVars() {
    let clientVars

    try {
      clientVars = client
    } catch (e) {
      clientVars = {}

      if (process.env.NODE_ENV === 'development') {
        console.warn("Didn't find a client config in `./config`.")
      }
    }

    return clientVars
  }

  getUrgentOverrides() {
    let overrides
    const filename = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
    try {
      overrides =
        process.env.NODE_ENV === 'production'
          ? prod
          : dev

      console.warn(
        `FYI: data in \`./config/${filename}.js\` file will override Server & Client equal data/values.`,
      )
    } catch (e) {
      overrides = {}
    }

    return overrides
  }

  // Builds out a nested key to get nested values
  buildNestedKey(nestedKey: string) {
    // Transform getter string into object
    const keys = nestedKey.split(':')
    let storeKey = this._store

    keys.forEach(function (k: string | number) {
      try {
        storeKey = storeKey[k]
      } catch (e) {
        return undefined
      }
    })

    return storeKey
  }
}

const conf = new Conf()

export { conf }