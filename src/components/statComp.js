import React, { Component, PropTypes } from 'react';
import '../styles/main';
import { Input } from 'react-bootstrap';

export default class StatComp extends Component {
	static propTypes = {
		name: PropTypes.isRequired,
		score: PropTypes.integer,
		modifer: PropTypes.integer,
		temp: PropTypes.integer,
		die: PropTypes.integer,
		onChange: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {onChange, score, modifer, temp, die, name} = this.props;

		return (
			<div className="stat-block">
				<div>{name}</div>
				<Input className="stat-text" id={`${name} + '_score'`} type="text" value={score} onChange={(e) => onChange(e, name, 'score')} />
				<Input className="stat-text" id={`${name} + '_modifer'`} type="text" value={modifer} onChange={(e) => onChange(e, name, 'modifer')} />
				<Input className="stat-text" id={`${name} + '_temp'`} type="text" value={temp} onChange={(e) => onChange(e, name, 'temp')} />
				<Input className="stat-text" id={`${name} + '_die'`} type="text" value={die} onChange={(e) => onChange(e, name, 'die')} />
			</div>
		);
	}
}
