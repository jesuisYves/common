'use strict';

const NaE = Symbol('NotAnEnum');

// Static properties:
//   NaE <Symbol> Not an Enum
class Enum {
  static from(...args) {
    let values = args[0];
    if (typeof values !== 'object') {
      values = args;
    }
    const members = new Map();
    const EnumClass = class extends Enum {
      static from(name) {
        return members.get(name) || Enum.NaE;
      }
      static values() {
        return [...members.values()];
      }
      static has(value) {
        return members.has(value);
      }
      static key(name) {
        const m = members.get(name);
        return m ? m.index : undefined;
      }
      [Symbol.toPrimitive]() {
        return this.index;
      }
    };
    const isValued = !Array.isArray(values);
    let i = 0;
    for (const key in values) {
      const m = new EnumClass();
      m.index = i++;
      if (isValued) {
        m.name = key;
        m.value = values[key];
      } else {
        m.name = values[key];
      }
      members.set(m.name, m);
    }
    return EnumClass;
  }
}

Object.defineProperty(Enum, 'NaE', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: NaE,
});

module.exports = { Enum };
