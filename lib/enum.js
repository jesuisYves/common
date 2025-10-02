'use strict';

const NaE = Symbol('NotAnEnum');

// Static properties:
//   NaE <Symbol> Not an Enum
class Enum {
  static from(...args) {
    const values = typeof args[0] === 'object' ? args[0] : args;
    const isValued = !Array.isArray(values);
    const members = new Map();
    const EnumClass = class extends Enum {
      constructor(index, name, value) {
        super();
        this.index = index;
        this.name = name;
        this.value = value;
      }
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
    let i = 0;
    for (const key in values) {
      const name = isValued ? key : values[key];
      const value = isValued ? values[key] : undefined;
      const member = new EnumClass(i++, name, value);
      members.set(name, member);
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
