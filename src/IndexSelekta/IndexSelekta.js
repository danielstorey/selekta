class IndexSelekta {
  constructor(indexCount, userOptions = {}) {
    const defaultOptions = {
      canCycle: true,
      initialIndex: 0
    }
    const options = Object.assign({}, defaultOptions, userOptions)

    const lastIndex = indexCount - 1

    let currentIndex = options.initialIndex

    this._listeners = [];

    // Define a getter for the current value
    Object.defineProperties(this, {
      currentIndex: {
        get() {
          return currentIndex
        },
        set(index) {
          if (index === currentIndex) return;
          if (index < 0 || index > lastIndex) {
            throw new RangeError('Index is out of range');
          }
          currentIndex = index;
          this._listeners.forEach(cb => cb(this.callbackValue));
        }
      },
      nextIndex: {
        get() {
          if (!options.canCycle && currentIndex === lastIndex) return currentIndex

          return currentIndex === lastIndex ? 0 : currentIndex + 1
        }
      },
      prevIndex: {
        get() {
          if (!options.canCycle && currentIndex === 0) return currentIndex

          return currentIndex === 0 ? lastIndex : currentIndex - 1
        }
      }
    })
  }

  get callbackValue() {
    return this.currentIndex;
  }

  toggle() {
    return this.next()
  }

  next() {
    this.currentIndex = this.nextIndex;
    return this.callbackValue
  }

  prev() {
    const { prevIndex } = this
    this.currentIndex = prevIndex;
    return this.callbackValue
  }

  setIndex(index) {
    this.currentIndex = index;
  }

  subscribe(callback) {
    this._listeners.push(callback)
  }

  unsubscribe(callback) {
    this._listeners = this._listeners.filter(cb => cb !== callback);
  }

  equals(value) {
    return this.currentIndex === value;
  }

  toString() {
    return this.callbackValue
  }
}

export default IndexSelekta
