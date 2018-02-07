# skeeler-json-schema-draft-6

[![Build Status](https://travis-ci.org/Cap32/skeeler-json-schema-draft-6.svg?branch=master)](https://travis-ci.org/Cap32/skeeler-json-schema-draft-6)
[![Coverage Status](https://coveralls.io/repos/github/Cap32/skeeler-json-schema-draft-6/badge.svg?branch=master)](https://coveralls.io/github/Cap32/skeeler-json-schema-draft-6?branch=master)

JSON Schema Draft 6 plugin for [Skeeler](https://github.com/Cap32/skeeler)

## Table of Contents

<!-- MarkdownTOC -->

- [Simple Example](#simple-example)
- [Options](#options)
  - [`rootProps` option](#rootprops-option)
  - [`strict` option](#strict-option)
- [Keywords](#keywords)
- [Syntactic Sugars](#syntactic-sugars)
  - [array\(\)](#array)
  - [object\(\)](#object)
  - [required](#required)
  - [dependencies](#dependencies)
  - [func](#func)
- [Related projects](#related-projects)
- [License](#license)

<!-- /MarkdownTOC -->

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

##### Equals to JSON Schema Draft 6

```js
export default {
  type: 'object',
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

## Options

By default, all the schema definitions will be compiled to `properties` in JSON schema, and the root type is `object`.

### `rootProps` option

If you want to pass some attributes outside `properties`, you may use `rootProps` option.

###### Example

```js
const skeeler = new Skeeler({});
const options = { rootProps: { title: 'awesome' } };
skeeler.export('json', options);

/**
 * output
 *
 * { type: 'object', properties: {}, title: 'awesome' }
 */
```

### `strict` option

If you want to writing in native JSON Schema way, you may use `strict` option.

###### Example

```js
const skeeler = new Skeeler({
  properties: {
    foo: types.string,
    bar: types.number,
  },
  required: ['foo', 'bar'],
});
const options = { strict: true };
skeeler.export('json', options);

/**
 * output
 *
 * {
 *  properties: {
 *    foo: { type: 'string' },
 *    bar: { type: 'number' },
 *  },
 *  required: ['foo', 'bar'],
 * }
 */
```

###### Or

```js
const skeeler = new Skeeler(
  types
    .properties({
      foo: types.string,
      bar: types.number,
    })
    .required(['foo', 'bar']),
);
const options = { strict: true };
skeeler.export('json', options);
```

## Keywords

Please checkout [keywords.js](/src/keywords.js)

This plugin is friendly to [ajv](https://github.com/epoberezkin/ajv) and supports all [ajv keywords](https://github.com/epoberezkin/ajv-keywords)

## Syntactic Sugars

### array()

`types.array(types.string)`

equals to

`types.array.items(types.string)`

### object()

`types.object({ foo: types.string })`

equals to

`types.object.properties({ foo: types.string })`

### required

`{ foo: types.required, bar: types.required }`

will be compiled to

`{ properties: { foo: {}, bar: {} }, required: ['foo', 'bar'] }`

_NOTE: Only work when `strict` option is NOT `true`_

### dependencies

`{ foo: types.dependencies(['bar']) }`

will be compiled to

`{ properties: { foo: {} }, dependencies: { foo: ['bar'] } }`

_NOTE: Only work when `strict` option is NOT `true`_

### func

`types.func`

equals to

`types.instanceof('Function')`

_NOTE: `instanceof` is a custom keyword for [ajv](https://github.com/epoberezkin/ajv)_

## Related projects

* [Skeeler](https://github.com/Cap32/skeeler)

## License

MIT
