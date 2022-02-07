const EnumSelekta = require('../src/EnumSelekta/EnumSelekta')

const onOff = ['OFF', 'ON']
const statuses = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETE']
const themes = ['light', 'dark']
const fooBarBaz = ['foo', 'bar', 'baz']
const oneToFive = ['one', 'two', 'three', 'four', 'five']

describe('EnumSelekta', () => {

  describe('Initialize', () => {
    it('maps arguments as keys', () => {
      const switcher = new EnumSelekta(onOff);

      expect(switcher).toHaveProperty('OFF')
    })

    it('maps keys to the enum property', () => {
      const selekta = new EnumSelekta(onOff);

      expect(selekta.enum.OFF).toBe('OFF')
      expect(selekta.enum.ON).toBe('ON')
    })

    it('throws an error if any of the given keys is not a string', () => {
      const initializer = () => new EnumSelekta(['one', 'two', 3]);

      expect(initializer).toThrow(TypeError);
    })

    it('initialises with the first argument as the default value', () => {
      const switcher = new EnumSelekta(['OFF', 'ON']);

      expect(switcher.value).toBe('OFF')
      expect(switcher.OFF).toBe(true)
      expect(switcher.ON).toBe(false)
    })

    it('prevents assigned values from being modified', () => {
      const selekta = new EnumSelekta(onOff);

      selekta.someValue = 1234
      selekta.OFF = 'modifiedOff'

      expect(selekta.value).toBe(selekta.enum.OFF);
      expect(selekta.OFF).toBe(true);
    })
  })

  describe('set value()', () => {
    it ('sets the value according to the given string', () => {
      const selekta = new EnumSelekta(onOff);

      selekta.value = 'ON'

      expect(selekta.value).toBe('ON')
      expect(selekta.ON).toBe(true)
    })

    it ('throws an error if the value does not exist', () => {
      const selekta = new EnumSelekta(oneToFive);

      const modifier = () => selekta.value = 'six';

      expect(modifier).toThrow(RangeError)

    })
  })

  describe('nextValue and prevValue getters', () => {
    it ('returns the next and prev values in the sequence respectively', () => {
      const selekta = new EnumSelekta(oneToFive, { initialIndex: 2 })

      expect(selekta.nextValue).toBe(selekta.enum.four)
      expect(selekta.prevValue).toBe(selekta.enum.two)
    })
  })

  describe('toggle()', () => {
    it('toggles between two values and returns the new value', () => {
      const switcher = new EnumSelekta(onOff);

      const newValue = switcher.toggle()

      const expected = 'ON'
      expect(newValue).toBe(expected)
      expect(switcher.value).toBe(expected)
      expect(switcher.OFF).toBe(false)
      expect(switcher.ON).toBe(true)
    })

    it('cycles forward through three or more values', () => {
      const counter = new EnumSelekta(oneToFive);

      counter.toggle() // two
      counter.toggle() // three
      counter.toggle() // four

      const expected = 'four'
      expect(counter.value).toBe(expected)
      expect(counter.one).toBe(false)
      expect(counter.four).toBe(true)
    })

    it('cycles back to the first item if canCycle is omitted', () => {
      const status = new EnumSelekta(statuses);

      status.toggle() // IN_PROGRESS
      status.toggle() // COMPLETE
      status.toggle() // NOT_STARTED

      const expected = 'NOT_STARTED'
      expect(status.value).toBe(expected)
      expect(status.COMPLETE).toBe(false)
      expect(status.NOT_STARTED).toBe(true)
    })

    it('cycles back to the first item if canCycle option is true', () => {
      const switcher = new EnumSelekta(statuses, { canCycle: true });

      switcher.toggle() // IN_PROGRESS
      switcher.toggle() // COMPLETE
      switcher.toggle() // NOT_STARTED

      const expected = 'NOT_STARTED'
      expect(switcher.value).toBe(expected)
      expect(switcher.COMPLETE).toBe(false)
      expect(switcher.NOT_STARTED).toBe(true)
    })

    it('remains on the last item if canCycle option is false', () => {
      const switcher = new EnumSelekta(statuses, { canCycle: false });

      switcher.toggle() // IN_PROGRESS
      switcher.toggle() // COMPLETE
      switcher.toggle() // COMPLETE

      const expected = 'COMPLETE'
      expect(switcher.value).toBe(expected)
      expect(switcher.COMPLETE).toBe(true)
      expect(switcher.NOT_STARTED).toBe(false)
    })

  })

  describe('next()', () => {
    it('is an alias for `toggle`', () => {
      const counter = new EnumSelekta(oneToFive)

      counter.next() // two
      counter.next() // three

      expect(counter.value).toBe('three')
    })
  })

  describe('prev()', () => {
    it('cycles backward through three or more values', () => {
      const counter = new EnumSelekta(oneToFive);

      counter.toggle() // two
      counter.toggle() // three
      counter.toggle() // four
      counter.prev() // three

      const expected = 'three'
      expect(counter.value).toBe(expected)
      expect(counter.one).toBe(false)
      expect(counter.three).toBe(true)
    })

    it('cycles back to the last item if canCycle is omitted', () => {
      const counter = new EnumSelekta(oneToFive);

      counter.prev() // five

      const expected = 'five'
      expect(counter.value).toBe(expected)
      expect(counter.one).toBe(false)
      expect(counter.five).toBe(true)
    })

    it('cycles back to the last item if canCycle option is true', () => {
      const status = new EnumSelekta(statuses, { canCycle: true });

      status.prev() // COMPLETE

      const expected = 'COMPLETE'
      expect(status.value).toBe(expected)
      expect(status.COMPLETE).toBe(true)
      expect(status.NOT_STARTED).toBe(false)
    })

    it('remains on the first item if canCycle option is false', () => {
      const status = new EnumSelekta(statuses, { canCycle: false });

      status.prev() // NOT_STARTED
      status.prev() // NOT_STARTED

      const expected = 'NOT_STARTED'
      expect(status.value).toBe(expected)
      expect(status.NOT_STARTED).toBe(true)
      expect(status.IN_PROGRESS).toBe(false)
    })
  })

  describe('toString()', () => {
    it('returns the currently selected value', () => {
      const values = new EnumSelekta(fooBarBaz)

      const expected = 'foo';

      expect(values.toString()).toBe(expected);
    })

    it('renders the instance as the current value in a HTML element', () => {
      const values = new EnumSelekta(themes);
      const div = document.createElement('div')

      div.innerHTML = values;

      expect(div.innerHTML).toBe('light')
    })

    it('renders the instance as the current value in a HTML element\'s attribute', () => {
      const theme = new EnumSelekta(themes);

      const a = document.createElement('a')
      a.title = theme;

      expect(a.title).toBe('light')
    })

    it('renders the current value when concatenating the instance with another string', () => {
      const status = new EnumSelekta(statuses);

      const expected = 'The current status is: NOT_STARTED';
      const rendered = 'The current status is: ' + status;

      expect(rendered).toBe(expected)
    })
  })

  describe('equals()', () => {
    it('returns true when a given value to the current value', () => {
      const values = new EnumSelekta(['one', 'two']);
      const isEqualToOne = values.equals('one');
      expect(isEqualToOne).toBe(true)

    })

    it('returns false when a given value is not equal to the current value', () => {
      const values = new EnumSelekta(['three', 'four']);
      const isEqualToFour = values.equals('four');
      expect(isEqualToFour).toBe(false)
    })

    it('returns true if the isCaseSensitive option is not active', () => {
      const values = new EnumSelekta(['five', 'six']);

      const isEqualToLower = values.equals('five');
      const isEqualToUpper = values.equals('FIVE')

      expect(isEqualToLower).toBe(true)
      expect(isEqualToUpper).toBe(true)
    })

    it('returns false if the isCaseSensitive option not active', () => {
      const values = new EnumSelekta(['seven', 'eight'], { isCaseSensitive: true });

      const isEqualToLower = values.equals('seven');
      const isEqualToUpper = values.equals('SEVEN')

      expect(isEqualToLower).toBe(true)
      expect(isEqualToUpper).toBe(false)
    })
  })

  describe('subscribe()', () => {
    it('fires a callback when the selected value changes', () => {
      const status = new EnumSelekta(statuses);
      const callback = jest.fn()

      status.subscribe(callback);
      status.next();

      expect(callback).toHaveBeenCalled()
    });

    it('the updated value is passed to the callback', () => {
      const status = new EnumSelekta(statuses);
      const callback = jest.fn();

      status.subscribe(callback);
      status.next();

      expect(callback).toHaveBeenCalledWith('IN_PROGRESS')
    });
  })

  describe('unsubscribe()', () => {
    it('removes the callback subscription and no longer fires it on update', () => {
      const status = new EnumSelekta(statuses);
      const callback = jest.fn();

      status.subscribe(callback);
      status.unsubscribe(callback);
      status.next()

      expect(callback).not.toHaveBeenCalled()
    });
  })

});
