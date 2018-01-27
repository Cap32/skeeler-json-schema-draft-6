# skeeler-json-schema-draft-6

[![Build Status](https://travis-ci.org/Cap32/skeeler-json-schema-draft-6.svg?branch=master)](https://travis-ci.org/Cap32/skeeler-json-schema-draft-6)
[![Coverage Status](https://coveralls.io/repos/github/Cap32/skeeler-json-schema-draft-6/badge.svg?branch=master)](https://coveralls.io/github/Cap32/skeeler-json-schema-draft-6?branch=master)

[WIP] JSON Schema Draft 6 plugin for [Skeeler](https://github.com/Cap32/skeeler)

## Simple Example

```js
import Skeeler from 'skeeler';
import SkeelerJSONSchemaDraftV6 from 'skeeler-json-schema-draft-6';

const types = Skeeler.use('json', new SkeelerJSONSchemaDraftV6()).getTypes();

const mySkeeler = new Skeeler({
  foo: types.string.required,
  bar: types.number.exclusiveMinimum(0),
  baz: types.anyOf([
    types.object({
      qux: types.number,
      quux: types.boolean,
    }),
    types.enum(['corge', 'grault']),
    types.array(types.string),
  ]).required,
});

export default mySkeeler.export('json');
```

### Equals to JSON Schema Draft 6

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
    baz: {
      anyOf: [
        {
          type: 'object',
          properties: {
            qux: {
              type: 'number',
            },
            quux: {
              type: 'boolean',
            },
          },
        },
        {
          enum: ['corge', 'grault'],
        },
        {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      ],
    },
  },
  required: ['foo', 'baz'],
};
```

## Related projects

* [Skeeler](https://github.com/Cap32/skeeler)

## License

MIT
