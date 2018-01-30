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

	items: setter,
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

	$data: setter, // https://github.com/json-schema/json-schema/wiki/$data-(v5-proposal)
	$merge: setter, // https://tools.ietf.org/html/rfc7396
	$patch: setter, // https://tools.ietf.org/html/rfc6902

	// Custom JSON-Schema keywords for Ajv validator https://github.com/epoberezkin/ajv-keywords
	instanceof: setter,
	typeof: setter,
	range: setter,
	exclusiveRange: setter,
	switch: setter,
	continue: setter,
	select: setter,
	selectCases: setter,
	selectDefault: setter,
	patternRequired: setter,
	deepProperties: setter,
	deepRequired: setter,
	uniqueItemProperties: setter,
	regexp: setter,
	formatMaximum: setter,
	formatMinimum: setter,
	formatExclusiveMaximum: setter,
	formatExclusiveMinimum: setter,
	dynamicDefaults: setter,

	func,
};
