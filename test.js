import Skeeler from 'skeeler';
import SkeelerJSONSchemaDraftV6 from './src';

describe('skeeler json schema draft 6', function () {
	const name = 'json';
	const types = Skeeler.use(name, new SkeelerJSONSchemaDraftV6()).getTypes();

	test('string', function () {
		const skeeler = new Skeeler({
			foo: types.string,
		});
		expect(skeeler.export(name)).toEqual({
			properties: { foo: { type: 'string' } },
		});
	});

	test('number', function () {
		const skeeler = new Skeeler({
			foo: types.number,
		});
		expect(skeeler.export(name)).toEqual({
			properties: { foo: { type: 'number' } },
		});
	});

	test('boolean', function () {
		const skeeler = new Skeeler({
			foo: types.boolean,
		});
		expect(skeeler.export(name)).toEqual({
			properties: { foo: { type: 'boolean' } },
		});
	});

	test('null', function () {
		const skeeler = new Skeeler({
			foo: types.null,
		});
		expect(skeeler.export(name)).toEqual({
			properties: { foo: { type: 'null' } },
		});
	});

	test('any', function () {
		const skeeler = new Skeeler({
			foo: types.any,
		});
		expect(skeeler.export(name)).toEqual({
			properties: { foo: { type: 'any' } },
		});
	});

	test('array', function () {
		const skeeler = new Skeeler({
			foo: types.array,
		});
		expect(skeeler.export(name)).toEqual({
			properties: { foo: { type: 'array' } },
		});
	});

	test('array()', function () {
		const skeeler = new Skeeler({
			foo: types.array(types.string),
		});
		expect(skeeler.export(name)).toEqual({
			properties: { foo: { type: 'array', items: { type: 'string' } } },
		});
	});

	test('object', function () {
		const skeeler = new Skeeler({
			foo: types.object,
		});
		expect(skeeler.export(name)).toEqual({
			properties: { foo: { type: 'object' } },
		});
	});

	test('object()', function () {
		const skeeler = new Skeeler({
			foo: types.object({
				bar: types.string,
			}),
		});
		expect(skeeler.export(name)).toEqual({
			properties: {
				foo: { type: 'object', properties: { bar: { type: 'string' } } },
			},
		});
	});

	test('required', function () {
		const skeeler = new Skeeler({
			foo: types.required,
		});
		expect(skeeler.export(name)).toEqual({
			properties: {
				foo: {},
			},
			required: ['foo'],
		});
	});

	test('multipleOf', function () {
		const skeeler = new Skeeler({
			foo: types.multipleOf(2),
		});
		expect(skeeler.export(name)).toEqual({
			properties: {
				foo: {
					multipleOf: 2,
				},
			},
		});
	});

	test('func', function () {
		const skeeler = new Skeeler({
			foo: types.func,
		});
		expect(skeeler.export(name)).toEqual({
			properties: {
				foo: {
					instanceof: 'Function',
				},
			},
		});
	});
});
