export interface Storage<Key> {
  getItem: (key: Key) => string | null | undefined;
  setItem: (key: Key, value: string) => void;
  removeItem: (key: Key) => void;
  clear: () => void;
}

export class PersistentStorage<Key> {
  storage: Readonly<Storage<Key>>;

  constructor(storage: Readonly<Storage<Key>>) {
    this.storage = storage;
  }

  getItem(key: Key): string | null | undefined {
    return this.storage?.getItem(key);
  }

  setItem(key: Key, value: string) {
    this.storage?.setItem(key, value);
  }

  removeItem(key: Key) {
    this.storage?.removeItem(key);
  }

  clear() {
    this.storage?.clear();
  }
}
