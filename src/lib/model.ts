type RecursiveProxy<T> = {
  [P in keyof T]: T[P] extends object ? RecursiveProxy<T[P]> : T[P];
};

function createRecursiveProxy<T extends object>(
  obj: T,
  onChange: (prop: string | symbol, value: any, previousValue: any) => void
): RecursiveProxy<T> {
  const handler: ProxyHandler<T> = {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      if (
        (typeof value === 'object' && value !== null) ||
        Array.isArray(value)
      ) {
        return createRecursiveProxy(value, onChange);
      }

      return value;
    },
    set(target, prop, value, receiver) {
      const previousValue = Reflect.get(target, prop, receiver);

      const result = Reflect.set(target, prop, value, receiver);

      if (result && previousValue !== value) {
        onChange(prop, value, previousValue);
      }

      return result;
    },
  };

  return new Proxy(obj, handler) as RecursiveProxy<T>;
}

export class Model<T = {}> {
  subscribers: any[] = [];

  constructor() {
    const proxy = createRecursiveProxy(this, this.notify.bind(this)) as Exclude<
      Model<T>,
      'subscribers|notify'
    >;

    for (const func of Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    ).map((name) => this[name])) {
      if (typeof func === 'function') {
        proxy[func.name] = func.bind(proxy);
      }
    }

    return proxy;
  }

  subscribe(subscriber: (model: T) => void) {
    this.subscribers.push(subscriber);
  }

  notify() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this);
    });
  }
}
