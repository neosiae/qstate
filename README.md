# qstate

Save state in query string

## Why?

Did you ever almost complete a form and refreshed it by accident and all your data were lost forever?

That should not be the case anymore!

With the help of this library, you can save state that you consider important in query string and improve the UX of your app.

Let's say you have a modal with some kind of form, you can track that form automatically and save all states
in query string. If the user refreshes the app, you can restore the previous state from query string so your user
doesn't need to fill it again.

## Usage

```javascript
import { save, trackForm } from 'qstate';

// Save manually
save({ key: 'qstate', value: 'awesome' });

// Track and save form state automatically
trackForm(document.querySelector('form'));
```

## API

### save({ key: 'foo', value: 'bar' })

Save state manually

> **Parameters**

- **object**

Key and value pair

- **key** - key
- **value** - value

### trackForm(HTMLElement, options)

Track and save form state automatically

> **Parameters**

- **HTMLElement**

Reference to the HTML Form

- **Options**

Options object

- **exclude** - Array of names. Add names of elements that need to be excluded

> **Return value**

**Array**

`[cleanup, clear]`

Array of two functions

#### cleanup

Function that cleans up event handlers.

#### clear

Function that clears state in query string.

### getQState

Get query parameters

> **Return value**

**object**

Key and value pair

## React

[useQState hook](src/react/README.md)
