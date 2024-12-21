
import { createStorage } from "unstorage";

export class UCORE {
  public _STORE: typeof createStorage;
  constructor() {
    this._STORE = () => createStorage(/* opts */);
  }

  get(key: string) {
    return this._STORE().getItem(key)


  }
  getItem(key: string) {

    return this._STORE().get(key)
  }
  setItem(k: string, val: string | number | object | any[] | boolean) {

    return this._STORE().setItem(k, val)
  }
  removeItem(k: string) {
    if (!k) throw new Error("Key is needed");

    var self = this;
    let ls = self._STORE;
    if (k.match(/:/)) {
      const keys = k.split(":");
      if (keys.length > 2) throw new Error("cannot nest more that one layer");

      if ((keys.length = 2)) {
        try {
          delete ls[keys[0]];
          self._STORE = { ...ls };
          return ls[keys[0]];
        } catch (error) {
          return "undefined";
        }
      }
    }
    // @ts-ignore
    ls = { [k]: null };
    delete ls[k];
    self._STORE = { ...ls };

    return !!(this.getItem(k) === "null");
  }
  public set value(v: string) {
    this._STORE = JSON.stringify(v[0] === "{") ? JSON.stringify(v) : v;
  }

  public get value(): string {
    return this._STORE
  }
  has(key: string) {
    return Boolean(this.getItem(key));
  }

  _buildNestedKey(nestedKey: string) {
    const keys = nestedKey.split(":");
    let storeKey = this._STORE;

    keys.forEach(function (k: string) {
      try {
        storeKey = storeKey[k];
      } catch (e) {
        return undefined;
      }
    });

    return storeKey;
  }
}
const core = new UCORE()
export { core };