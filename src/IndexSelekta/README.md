# IndexSelekta

## Initialization

### IndexSelekta(arrayLength:number, options:object)
```
// The simplest implementation
const seleta = new IndexSelekta(10);

// With options
const seleta = new IndexSelekta(10, { canCycle: false });

// Most likely you will be referencing another array
const seleta = new IndexSelekta(images.length);
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| initialIndex | 0 | specified the initial index to assign to `currentIndex` |
| canCycle | true | returns to 0 when the last item is selected and `next()` is called, or the last item if at 0 and `prev()` is called. |

## Properties

### value
The currently selected index
```
const seleta = new IndexSelekta(10); // Initialized with default index 0
selekta.next()
selekta.value = 1 // true
```
### nextValue
The next index to be selected
```
const seleta = new IndexSelekta(10);
selekta.value = 0 // true
selekta.nextValue === 1 // true
```
### prevValue
The previous index to be selected. Will be `0` if cycling is disabled
```
const seleta = new IndexSelekta(10);
selekta.prevValue = 9 // true

const seleta = new IndexSelekta(10, { canCycle: false });
selekta.prevValue = 0 // true
```

## Methods

### next():number / toggle():number
Increments the index and returns the new value. `toggle` is an alias for `next`; the two are interchangeable. `toggle` might be more semantically appropriate for a switch between two values. Cycles to `0` if `canCycle: true` or remains at the last index if `canCycle: false`

### prev():number
Decrements the index and returns the new value. Cycles to the last index if `canCycle: true` or remains at `0` if `canCycle: false`

### setIndex(index:number):void
Sets the index if a valid index is passed. Otherwise a `RangeError` is thrown
```
const selekta = new Selekta(10)
selekta.setIndex(10) // Throws RangeError
selekta.setIndex(3)
selekta.currentIndex === 3 // true
```

### equals(value:number):boolean
Returns true if the given value is the currently selected index
```
const selekta = new Selekta(10, { initialIndex: 3 })
selekta.equals(3) // true
```

### toString():string
Possibly useful for rendering directly into HTML. Definitely more useful in the extended version of this class - EnumSelekta
```
Before:
<div id="myDiv"></div>

<script>
const selekta = new Selekta(10);
document.getElementById('myDiv').innerHTML = selekta;
</script>

After:
<div id="myDiv">0</div>
```

### subscribe(callback:function)
Fires the callback when the index is updated. The callback receives the newly selected index.
```
const selekta = new Selekta(10);
selecta.subscribe(newIndex => alert(newIndex));
selekta.next() // Will alert `1`
```

### unsubscribe(callback:function)
We like cleaning up after ourselves! Removes all references to the given callback and will no longer fire when updated
```
const selekta = new Selekta(10);
const cb = (newIndex) => alert(newIndex);
selekta.subscribe(cb);
selekta.unsubscribe(cb);
selekta.next(); // No alert
```
