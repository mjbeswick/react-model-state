export class Model<T = {}> {
  private subscribers = [];

  constructor() {
    return new Proxy(this, {
      get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
      },
      deleteProperty(target, prop) {
        throw new Error(`Not allowed to delete property ${prop.toString()}`);
      },
      // defineProperty(target, prop) {
      //   throw new Error(`Not allowed to define property ${prop.toString()}`);
      // },
    });
  }
}
