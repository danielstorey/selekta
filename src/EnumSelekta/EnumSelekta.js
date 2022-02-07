import IndexSelekta from '../IndexSelekta/IndexSelekta'

class EnumSelekta extends IndexSelekta {
  constructor(keys, options = {}) {
    super(keys.length, options)

    Object.defineProperty(this, 'enum', { value: {} });

    const isCaseSensitive = options.isCaseSensitive || false;

    // Define each value as a property
    keys.forEach((key, i) => {
      if (typeof key !== 'string') {
        throw new TypeError('This class can only evaluate strings')
      }

      this.enum[key] = key;

      Object.defineProperty(this, key, {
        get() {
          return this.currentIndex === i;
        }
      });
    })

    // Define a getter for the current value
    Object.defineProperties(this, {
      options: {
        get() {
          return {
            ...options,
            isCaseSensitive
          }
        }
      },
      value: {
        get() {
          return keys[this.currentIndex]
        },
        set(value) {
          if (!this.hasOwnProperty(value)) throw RangeError('This value does not exist')

          keys.forEach((key, i) => {
            if (key === value) this.currentIndex = i;
          })
        }
      },
      nextValue: {
        get() { return keys[this.nextIndex] }
      },
      prevValue: {
        get() { return keys[this.prevIndex] }
      }
    })
  }

  get callbackValue() {
    return this.value;
  }

  equals(value) {
    if (this.options.isCaseSensitive) {
      return value === this.value
    }

    return value.toLowerCase() === this.value.toLowerCase()
  }
}

export default EnumSelekta
