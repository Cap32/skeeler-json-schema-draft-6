import traverse from 'traverse';

export default function compile(data, options = {}) {
	const { strict = false, rootProps } = options;

	if (!strict) {
		const trav = traverse({ properties: data });

		data = trav.map(function (val) {
			const hoist = (prop, defaults, handler) => {
				if (
					this.key === prop &&
					this.parent &&
					this.parent.parent &&
					this.parent.parent.parent &&
					this.parent.parent.key === 'properties'
				) {
					this.remove();
					let target = trav.get(prop) || defaults;
					const { key } = this.parent;
					target = handler(target, key);
					trav.set(prop, target);
					this.parent.parent.parent.node[prop] = target;
				}
			};

			hoist('required', [], (required, key) => {
				/* istanbul ignore else */
				if (!~required.indexOf(key)) {
					required.push(key);
				}
				return required;
			});

			hoist('dependencies', {}, (dependencies, key) => {
				dependencies[key] = val;
				return dependencies;
			});
		});
		data.type = 'object';
	}

	return { ...data, ...rootProps };
}
