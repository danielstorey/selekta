# selekta

Two lightweight Javascript classes for selecting, toggling and cycling through arrays.

## Overview

How many times have you worked with a component which cycles through an array of items using some sort of `nextItem()` method? You follow the same old pattern of figuring out if you're on the last index - whether to cycle back to 0 or prevent any further action - or to simply increment the current index to the next item.

This class abstracts all that logic for you so you can just get on with the rest of your development. You can subscribe to changes and even look up the next and previous values, which may be particularly useful in the EnumSelekta example below.

- [IndexSelekta](http://github.com/danielstorey/selekta/tree/master/src/IndexSelekta) does this at a most basic level by working with indexes alone.
- [EnumSelekta](http://github.com/danielstorey/selekta/tree/master/src/EnumSelekta) extends `IndexSelekta` by taking an array of strings, and providing some useful enum-based functionality.

The full reference for each class can be found in their [respective folders](http://github.com/danielstorey/selekta/tree/master/src) but just to give you an idea of how they work examples are shown below

## Installation
### Via a package manager:
```
yarn add selekta
npm install --save selekta
```

### As a browser ready library:

Download directly from the [dist](http://github.com/danielstorey/selekta/tree/master/dist) folder

## Examples

### IndexSelekta

Example implementation of IndexSelekta in an image gallery component:
```javascript
import { IndexSelecta } from 'selekta'

class ImageGallery {
  constructor(imageArray) {
    this.images = imageArray;
    this.selekta = new IndexSelekta(imageArray.length)

    this.selekta.subscribe((updatedIndex) => {
      this.displayImage(updatedIndex)
    })
  }
  nextImage() {
    this.selekta.next()
  }
  prevImage() {
    this.selekta.prev()
  }
  displayImage(index) {
    const src = this.images[index];
    // Do something with this...
  }
}
```

### EnumSelekta

Example implementation of EnumSelekta in a theme switcher
```html
<script>
import { EnumSelekta } from 'selekta'

const theme = new EnumSelekta(['light', 'dark'])

theme.subscribe(newTheme => {
  myThemeDiv.className = `${newTheme}-theme`
})
</script>

<div id="myThemeDiv" class="light-theme">
  // Themed content
</div>

<button onclick="theme.toggle">Switch to {{ theme.nextValue }} theme</button>
```

```
