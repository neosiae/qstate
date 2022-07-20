# useQState

qState hook for React.js

## Usage

```ts
import React, { FunctionComponent } from 'react';

import useQState from 'qstate/react';

const Form: FunctionComponent = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [{ email, age }, _, clearState] = useQState(formRef);

  const [activeEmail, setActiveEmail] = React.useState(() => email ?? '');
  const [activeAge, setActiveAge] = React.useState(() => age ?? '');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        clearState();
      }}
      ref={formRef}
    >
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
      <button type="submit">Submit</button>
    </form>
  );
};
```

## API

### useQState(HTMLFormElement, options)

Initialize qState

> **Parameters**

- **HTMLFormElement**

- **Options** - Options object

  - **exclude** Array of names. Add names of elements that need to be excluded

> **Return value**

**Array**

`[qState, save, clear]`

#### qState

Read the state from query string.

Access state with dot or bracket notation.

```ts
const someState = qState.someState;
```

> **Return value**

**object**

#### save({ key: 'foo', value: 'bar' })

Save state manually in query string

> **Parameters**

**object**

Key and value pair

- **key** - key
- **value** - value

#### clear

Function that clears state in query string.
