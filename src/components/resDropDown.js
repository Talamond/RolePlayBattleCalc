import React, { Component, PropTypes } from 'react';
import '../styles/main';

export default class ResDropDown extends Component {
	static propTypes = {
		name: PropTypes.isRequired,
		onChange: PropTypes.func,
		val: PropTypes.string
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { name, onChange, val } = this.props;
		return (
			<div className="res">
				<div>{name}</div>
				<select value={val} onChange={(e) => onChange(e, name)}>
					<option value="-">-</option>
					<option value="we">We</option>
					<option value="st">St</option>
					<option value="nu">Nu</option>
					<option value="rf">Rf</option>
					<option value="dr">Dr</option>
				</select>
			</div>
		);
	}
}
