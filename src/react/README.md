# useQState

qState hook for React.js

## Usage

```ts
import React, { FunctionComponent } from 'react';

import useQState from 'qstate/react';

const Form: FunctionComponent = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [{ email, age }] = useQState(formRef);

  const [activeEmail, setActiveEmail] = React.useState(() => email ?? '');
  const [activeAge, setActiveAge] = React.useState(() => age ?? '');

  return (
    <form ref={formRef}>
      <input
        type="email"
        name="email"
        value={activeEmail}
        onChange={(event) => {
          setActiveEmail(event.target.value);
        }}
      />
      <input
        type="number"
        name="age"
        value={activeAge}
        onChange={(event) => {
          setActiveAge(event.target.value);
        }}
      />
    </form>
  );
};
```

## API

### useQState

Initialize qState

> **Parameters**

**HTMLFormElement**

**Options**

Options object

- **exclude** Array of names. Add names of elements that need to be excluded

> **Return value**

**Tuple**

`[qState, save, clear]`

#### qState

Read the state from query string.

Access state with dot or bracket notation.

```ts
const someState = qState.someState;
```

#### save

Saves state manually.

#### clear

Function that clears state in query string.

> **Return value**

**null | object**

#### save

Save state manually in query string

> **Parameters**

**object**

Key and value pair

- **key** - key
- **value** - value
