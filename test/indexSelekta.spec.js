const IndexSelekta = require('../src/IndexSelekta/IndexSelekta');

describe('IndexSelekta', () => {

  describe('Initialize', () => {
    it('initialises with the default current index set to 0', () => {
      const selekta = new IndexSelekta(5);

      expect(selekta.currentIndex).toBe(0)
    })

    it('initialises with the initial index set to 3', () => {
      const selekta = new IndexSelekta(5, { initialIndex: 3 });

      expect(selekta.currentIndex).toBe(3)
    })

    it('prevents assigned values from being modified', () => {
      const selekta = new IndexSelekta(5);

      selekta.value = 100

      expect(selekta.currentIndex).toBe(0);
    })
  })

  describe('toggle()', () => {
    it('toggles between two values and returns the new value', () => {
      const selekta = new IndexSelekta(5);

      const newValue = selekta.toggle() // 1

      const expected = 1
      expect(newValue).toBe(expected)
      expect(selekta.currentIndex).toBe(expected)
    })

    it('cycles forward through three or more values', () => {
      const selekta = new IndexSelekta(5);

      selekta.toggle() // 1
      selekta.toggle() // 2
      selekta.toggle() // 3

      const expected = 3
      expect(selekta.currentIndex).toBe(expected)
    })

    it('cycles back to the first item if canCycle is omitted', () => {
      const selekta = new IndexSelekta(3);

      selekta.toggle() // 1
      selekta.toggle() // 2
      selekta.toggle() // 0

      const expected = 0
      expect(selekta.currentIndex).toBe(expected)
    })

    it('cycles back to the first item if canCycle option is true', () => {
      const selekta = new IndexSelekta(3, { canCycle: true });

      selekta.toggle() // 1
      selekta.toggle() // 2
      selekta.toggle() // 0

      const expected = 0
      expect(selekta.currentIndex).toBe(expected)
    })

    it('remains on the last item if canCycle option is false', () => {
      const selekta = new IndexSelekta(3, { canCycle: false });

      selekta.toggle() // 1
      selekta.toggle() // 2
      selekta.toggle() // 2

      const expected = 2
      expect(selekta.currentIndex).toBe(expected)
    })

  })

  describe('next()', () => {
    it('is an alias for `toggle`', () => {
      const selekta = new IndexSelekta(5)

      selekta.toggle() // 1
      selekta.toggle() // 2

      expect(selekta.currentIndex).toBe(2)
    })
  })

  describe('prev()', () => {
    it('cycles backward through three or more values', () => {
      const selekta = new IndexSelekta(5);

      selekta.toggle() // 1
      selekta.toggle() // 2
      selekta.toggle() // 3
      selekta.prev() // 2

      const expected = 2
      expect(selekta.currentIndex).toBe(expected)
    })

    it('cycles back to the last item if canCycle is omitted', () => {
      const selekta = new IndexSelekta(5);

      selekta.prev() // 4

      const expected = 4
      expect(selekta.currentIndex).toBe(expected)
    })

    it('cycles back to the last item if canCycle option is true', () => {
      const selekta = new IndexSelekta(5, { canCycle: true });

      selekta.prev() // 4

      const expected = 4
      expect(selekta.currentIndex).toBe(expected)
    })

    it('remains on the first item if canCycle option is false', () => {
      const selekta = new IndexSelekta(5, { canCycle: false });

      selekta.prev() // 0
      selekta.prev() // 0

      const expected = 0
      expect(selekta.currentIndex).toBe(expected)
    })
  })

  describe('setIndex()', () => {
    it('sets the current index to the specified value', () => {
      const selekta = new IndexSelekta(5)

      selekta.setIndex(3)

      expect(selekta.currentIndex).toBe(3)
    })

    it('throws a RangeError if the specified index is out of range', () => {
      const selekta = new IndexSelekta(5)

      const setIndexWithError = () => selekta.setIndex(5)

      expect(setIndexWithError).toThrow(RangeError)
    })
  })

  describe('toString()', () => {
    it('returns the currently selected value', () => {
      const selekta = new IndexSelekta(5)

      expect(selekta.toString()).toBe(0);
    })

    it('renders the instance as the current value in a HTML element', () => {
      const selekta = new IndexSelekta(5);
      const div = document.createElement('div')

      div.innerHTML = selekta;

      expect(div.innerHTML).toBe('0')
    })

    it('renders the instance as the current value in a HTML element\'s attribute', () => {
      const selekta = new IndexSelekta(5);

      const a = document.createElement('a')
      a.dataset.value = selekta;

      expect(a.dataset.value).toBe('0')
    })

    it('renders the current value when concatenating the instance with another string', () => {
      const selekta = new IndexSelekta(5);

      const expected = 'The current index is: 0';
      const rendered = 'The current index is: ' + selekta;

      expect(rendered).toBe(expected)
    })
  })

  describe('equals()', () => {
    it('returns true when a given value to the current value', () => {
      const selekta = new IndexSelekta(5);
      const isEqualToZero = selekta.equals(0);
      expect(isEqualToZero).toBe(true)

    })

    it('returns false when a given value is not equal to the current value', () => {
      const selekta = new IndexSelekta(5);
      const isEqualToOne = selekta.equals(1);
      expect(isEqualToOne).toBe(false)
    })
  })

  describe('subscribe()', () => {
    it('fires a callback when the selected value changes', () => {
      const selekta = new IndexSelekta(5);
      const callback = jest.fn()

      selekta.subscribe(callback);
      selekta.next();

      expect(callback).toHaveBeenCalled()
    });

    it('the updated value is passed to the callback', () => {
      const selekta = new IndexSelekta(5);
      const callback = jest.fn();

      selekta.subscribe(callback);
      selekta.next();

      expect(callback).toHaveBeenCalledWith(1)
    });
  })

  describe('unsubscribe()', () => {
    it('removes the callback subscription and no longer fires it on update', () => {
      const selekta = new IndexSelekta(5);
      const callback = jest.fn();

      selekta.subscribe(callback);
      selekta.unsubscribe(callback);
      selekta.next()

      expect(callback).not.toHaveBeenCalled()
    });
  })

})
