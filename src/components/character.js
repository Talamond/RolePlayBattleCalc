import React, { Component, PropTypes } from 'react';
import '../styles/main';
import { StatComp, ResDropDown, StatusEffects } from '../components';
import { Input } from 'react-bootstrap';

export default class Character extends Component {

	static propTypes = {
		character: PropTypes.object,
		onNameChange: PropTypes.func,
		onHpChange: PropTypes.func,
		onStatChange: PropTypes.func,
		onResChange: PropTypes.func,
		onStatusChange: PropTypes.func
	};

	render() {
		const {character, onStatChange, onResChange, onNameChange, onHpChange, onStatusChange} = this.props;
		return (
			<div>
				<div>
					<div>Name</div>
					<Input id="name" type="text" value={character.name} onChange={onNameChange} />
					<div>HP</div>
					<Input className="stat-text" id="hp" type="text" value={character.hp} onChange={onHpChange} />
					<StatComp name="str" stat={character.str} onChange={onStatChange}/>
					<StatComp name="int" stat={character.int} onChange={onStatChange}/>
					<StatComp name="agi" stat={character.agi} onChange={onStatChange}/>
					<StatComp name="end" stat={character.end} onChange={onStatChange}/>
					<StatComp name="cha" stat={character.cha} onChange={onStatChange}/>
					<StatComp name="per" stat={character.per} onChange={onStatChange}/>
					<StatComp name="luc" stat={character.luc} onChange={onStatChange}/>
					<div>
						<ResDropDown name="phy" onChange={onResChange} val={character.phy}/>
						<ResDropDown name="men" onChange={onResChange} val={character.men}/>
					</div>
					<div>
						<ResDropDown name="fir" onChange={onResChange} val={character.fir}/>
						<ResDropDown name="ice" onChange={onResChange} val={character.ice}/>
					</div>
					<div>
						<ResDropDown name="win" onChange={onResChange} val={character.win}/>
						<ResDropDown name="thu" onChange={onResChange} val={character.thu}/>
					</div>
					<div>
						<ResDropDown name="dar" onChange={onResChange} val={character.dar}/>
						<ResDropDown name="lig" onChange={onResChange} val={character.lig}/>
					</div>
				</div>
				<div>
					<StatusEffects status={character.status} onChange={onStatusChange}/>
				</div>
			</div>
		);
	}
}
