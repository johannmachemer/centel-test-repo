class SimpleCache {
  constructor(ttlMs = 60000) {
    this.store = new Map();
    this.ttl = ttlMs;
  }

  set(key, value) {
    this.store.set(key, { value, expires: Date.now() + this.ttl });
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  clear() {
    this.store.clear();
  }

  get size() {
    return this.store.size;
  }
}

module.exports = { SimpleCache };
