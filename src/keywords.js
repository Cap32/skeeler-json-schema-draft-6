import { type, array, object, required, setter, func } from './helpers';

export default {
	string: type,
	number: type,
	integer: type,
	boolean: type,
	null: type,
	any: type,
	array,
	object,

	required,

	$schema: setter,
	$id: setter,
	$ref: setter,
	$data: setter,
	$comment: setter,

	type: setter,
	enum: setter,
	const: setter,

	multipleOf: setter,
	maximum: setter,
	exclusiveMaximum: setter,
	minimum: setter,
	exclusiveMinimum: setter,
	maxLength: setter,
	minLength: setter,
	pattern: setter,

	additionalItems: setter,
	maxItems: setter,
	minItems: setter,
	uniqueItems: setter,

	contains: setter,
	maxProperties: setter,
	minProperties: setter,
	properties: setter,
	patternProperties: setter,
	additionalProperties: setter,
	dependencies: setter,
	propertyNames: setter,

	if: setter,
	then: setter,
	else: setter,

	anyOf: setter,
	oneOf: setter,
	allOf: setter,
	not: setter,

	format: setter,

	contentEncoding: setter,
	contentMediaType: setter,

	definitions: setter,

	title: setter,
	description: setter,
	default: setter,
	readOnly: setter,
	writeOnly: setter,
	examples: setter,

	instanceof: setter,
	typeof: setter,

	func,
};
