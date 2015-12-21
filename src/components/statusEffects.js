import React, { Component, PropTypes } from 'react';
import '../styles/main';
import { Input } from 'react-bootstrap';

export default class StatusEffects extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		status: PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { onChange, status } = this.props;
		return (
			<div className="status">
				<div className="debuff">
					<Input type="checkbox" label="Poison" checked={status.poison} onChange={(e) => onChange(e, 'poison')}/>
					<Input type="checkbox" label="Bind" checked={status.bind} onChange={(e) => onChange(e, 'bind')}/>
					<Input type="checkbox" label="Blind" checked={status.blind} onChange={(e) => onChange(e, 'blind')}/>
					<Input type="checkbox" label="Silence" checked={status.silence} onChange={(e) => onChange(e, 'silence')}/>
					<Input type="checkbox" label="Paralyze" checked={status.paralyze} onChange={(e) => onChange(e, 'paralyze')}/>
					<Input type="checkbox" label="Confuse" checked={status.confuse} onChange={(e) => onChange(e, 'confuse')}/>
					<Input type="checkbox" label="Charm" checked={status.charm} onChange={(e) => onChange(e, 'charm')}/>
					<Input type="checkbox" label="Debuff" checked={status.debuff} onChange={(e) => onChange(e, 'debuff')}/>
				</div>
				<div className="buff">
					<Input type="checkbox" label="Buff" checked={status.buff} onChange={(e) => onChange(e, 'buff')}/>
					<Input type="checkbox" label="Regen" checked={status.regen} onChange={(e) => onChange(e, 'regen')}/>
					<Input type="checkbox" label="Shield" checked={status.shield} onChange={(e) => onChange(e, 'shield')}/>
				</div>
			</div>
		);
	}
}
