import Skeeler from 'skeeler';
import SkeelerJSONSchemaDraftV6 from './src';

describe('skeeler json schema draft 6', function () {
	const name = 'json';
	const types = Skeeler.use(name, new SkeelerJSONSchemaDraftV6()).getTypes();

	describe('not strict mode', function () {
		const options = {};

		test('data and option are optional', function () {
			const skeeler = new Skeeler();
			expect(skeeler.export(name)).toEqual({
				properties: {},
				type: 'object',
			});
		});

		test('string', function () {
			const skeeler = new Skeeler({
				foo: types.string,
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'string' } },
				type: 'object',
			});
		});

		test('number', function () {
			const skeeler = new Skeeler({
				foo: types.number,
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'number' } },
				type: 'object',
			});
		});

		test('boolean', function () {
			const skeeler = new Skeeler({
				foo: types.boolean,
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'boolean' } },
				type: 'object',
			});
		});

		test('null', function () {
			const skeeler = new Skeeler({
				foo: types.null,
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'null' } },
				type: 'object',
			});
		});

		test('any', function () {
			const skeeler = new Skeeler({
				foo: types.any,
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'any' } },
				type: 'object',
			});
		});

		test('array', function () {
			const skeeler = new Skeeler({
				foo: types.array,
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'array' } },
				type: 'object',
			});
		});

		test('array and items', function () {
			const skeeler = new Skeeler({
				foo: types.array.items(types.string),
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'array', items: { type: 'string' } } },
				type: 'object',
			});
		});

		test('array(items)', function () {
			const skeeler = new Skeeler({
				foo: types.array(types.string),
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'array', items: { type: 'string' } } },
				type: 'object',
			});
		});

		test('object', function () {
			const skeeler = new Skeeler({
				foo: types.object,
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'object' } },
				type: 'object',
			});
		});

		test('object and properties', function () {
			const skeeler = new Skeeler({
				foo: types.object.properties({
					bar: types.string,
				}),
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: {
					foo: { type: 'object', properties: { bar: { type: 'string' } } },
				},
				type: 'object',
			});
		});

		test('object(properties)', function () {
			const skeeler = new Skeeler({
				foo: types.object({
					bar: types.string,
				}),
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: {
					foo: { type: 'object', properties: { bar: { type: 'string' } } },
				},
				type: 'object',
			});
		});

		test('required', function () {
			const skeeler = new Skeeler({
				foo: types.required,
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: {
					foo: {},
				},
				required: ['foo'],
				type: 'object',
			});
		});

		test('dependencies', function () {
			const skeeler = new Skeeler({
				foo: types.dependencies(['bar']),
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: {
					foo: {},
				},
				dependencies: {
					foo: ['bar'],
				},
				type: 'object',
			});
		});

		test('multipleOf', function () {
			const skeeler = new Skeeler({
				foo: types.multipleOf(2),
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: {
					foo: {
						multipleOf: 2,
					},
				},
				type: 'object',
			});
		});

		test('func', function () {
			const skeeler = new Skeeler({
				foo: types.func,
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: {
					foo: {
						instanceof: 'Function',
					},
				},
				type: 'object',
			});
		});

		test('`rootProps` option', function () {
			const skeeler = new Skeeler({});
			expect(
				skeeler.export(name, {
					...options,
					rootProps: { title: 'rootProps option' },
				}),
			).toEqual({
				title: 'rootProps option',
				properties: {},
				type: 'object',
			});
		});
	});

	describe('strict mode', function () {
		const options = { strict: true };

		test('properties', function () {
			const skeeler = new Skeeler(
				types.object.properties({
					foo: types.string,
				}),
			);
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'string' } },
				type: 'object',
			});
		});

		test('native properties', function () {
			const skeeler = new Skeeler({
				properties: {
					foo: types.string,
				},
			});
			expect(skeeler.export(name, options)).toEqual({
				properties: { foo: { type: 'string' } },
			});
		});

		test('required()', function () {
			const skeeler = new Skeeler(
				types
					.properties({
						foo: types.string,
						bar: types.number,
					})
					.required(['foo', 'bar']),
			);
			expect(skeeler.export(name, options)).toEqual({
				properties: {
					foo: { type: 'string' },
					bar: { type: 'number' },
				},
				required: ['foo', 'bar'],
			});
		});

		test('dependencies()', function () {
			const skeeler = new Skeeler(
				types
					.properties({
						foo: types.string,
						bar: types.number,
					})
					.dependencies({
						foo: ['bar'],
					}),
			);
			expect(skeeler.export(name, options)).toEqual({
				properties: {
					foo: { type: 'string' },
					bar: { type: 'number' },
				},
				dependencies: {
					foo: ['bar'],
				},
			});
		});

		test('`rootProps` option', function () {
			const skeeler = new Skeeler({});
			expect(
				skeeler.export(name, {
					...options,
					rootProps: { title: 'rootProps option' },
				}),
			).toEqual({
				title: 'rootProps option',
			});
		});
	});
});
