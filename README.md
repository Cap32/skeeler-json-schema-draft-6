# skeeler-json-schema-draft-6

[![Build Status](https://travis-ci.org/Cap32/skeeler-json-schema-draft-6.svg?branch=master)](https://travis-ci.org/Cap32/skeeler-json-schema-draft-6)

[WIP] JSON Schema Draft 6 plugin for [Skeeler](https://github.com/Cap32/skeeler)

## Simple Example

```js
import Skeeler from 'skeeler';
import SkeelerJSONSchemaDraftV6 from 'skeeler-json-schema-draft-6';

const types = Skeeler.use('json', new SkeelerJSONSchemaDraftV6()).getTypes();

const mySkeeler = new Skeeler({
  foo: types.string.required.unique,
  bar: types.number.index.exclusiveMinimum(0),
  baz: types.objectId.required,
  qux: types.array(types.string),
});

export default mySkeeler.export('json');
```

### Equals to JSON Schema v6

```js
export default {
  properties: {
    foo: {
      type: 'string',
    },
    bar: {
      type: 'number',
      exclusiveMinimum: 0,
    },
    baz: {},
    qux: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['foo', 'baz'],
};
```

## Related projects

* [Skeeler](https://github.com/Cap32/skeeler)

## License

MIT
