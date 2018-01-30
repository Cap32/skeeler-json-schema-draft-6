import traverse from 'traverse';

export default function compile(data, options = {}) {
	const { strict = true, other } = options;

	if (!strict) {
		const trav = traverse({ properties: data });
		data = trav.map(function (val) {
			if (
				!Array.isArray(val) &&
				this.key === 'required' &&
				this.parent &&
				this.parent.parent &&
				this.parent.parent.parent &&
				this.parent.parent.key === 'properties'
			) {
				this.remove();
				const required = trav.get('required') || [];
				const { key } = this.parent;

				/* istanbul ignore else */
				if (!~required.indexOf(key)) {
					required.push(key);
				}

				trav.set('required', required);
				this.parent.parent.parent.node.required = required;
			}
		});
	}

	return { ...data, ...other };
}
