export default class Character {
	
	static propTypes = {
		hp: PropTypes.integer,
		str: PropTypes.object
	};

	constructor(...props) {
		Object.assign(this, ...props);
	}

}
