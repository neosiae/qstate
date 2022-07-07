# qstate

Save state in query string

## Why?

Did you ever almost complete a form and you refreshed it by accident and all your data were lost forever?

That should not be the case anymore!

With the help of this library you can save state that you consider important in query string and improve UX of your app.

Let's say you have a modal with some kind of form, you can track that form automatically and save all state
in query string. If user refreshes the app, you can restore the previous state from query string so your user
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

### save

Save state manually

> **Parameters**

**object**

Key and value pair

- **key** - key
- **value** - value

### trackForm

Track and save form state automatically

> **Parameters**

**HTMLElement**

Reference to the HTML Form
