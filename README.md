# stackt

> smaller more concise stack traces

## Disclaimer

- Currently only tested with Node.js and not supported in web browsers

## Overview

The [snapshot](test/snapshots/index.test.js.md) file should have most use cases documented,
but here is a brief how-to:

```javascript
console.log(error.message, error.stack)
```

```
stackt!!! Error Error: stackt!!!
    at Object.<anonymous> (/Users/phadviger/code/datfinesoul/stackt/sample_generator.js:4:15)
    at Module._compile (internal/modules/cjs/loader.js:688:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)
    at Module.load (internal/modules/cjs/loader.js:598:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)
    at Function.Module._load (internal/modules/cjs/loader.js:529:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:741:12)
    at startup (internal/bootstrap/node.js:285:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)
```

```javascript
console.log(error.message, stackt(error.stack))
```

```
stackt!!! Error     at Object.<anonymous> (/sample_generator.js:4:15)
```

## Roadmap

- The duplicative `error.message` part of the stack is currently stripped out,
  but that also removes the exception name from the stack trace.
  - `option.preserveMessage` as a new default:true?
  - Allow passing an error object, and use error.name?
  - Or continue as is...
- Browser support

