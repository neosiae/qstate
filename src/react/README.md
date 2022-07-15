# useQState

qState hook for React.js

## Usage

```ts
import React, { FunctionComponent } from 'react';

import useQState from 'qstate/react';

const Form: FunctionComponent = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [qState] = useQState(formRef);

  const [email, setEmail] = React.useState(() => qState?.email ?? '');
  const [age, setAge] = React.useState(() => qState?.age ?? '');

  return (
    <form ref={formRef}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="number"
        name="age"
        value={age}
        onChange={(event) => {
          setAge(event.target.value);
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

- **exclude**

Array of names

Add names of elements that need to be excluded

> **Return value**

**Tuple**

`[qState, save]`

#### qState

Read the state from query string.

Access state with dot or bracket notation.

```ts
const someState = qState.someState;
```

> **Return value**

**null | object**

#### save

Save state manually in query string

> **Parameters**

**object**

Key and value pair

- **key** - key
- **value** - value
