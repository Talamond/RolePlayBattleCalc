import React, { Component, PropTypes } from 'react';
import '../styles/main';
import { StatComp, ResDropDown } from '../components';
import { Input } from 'react-bootstrap';

export default class Character extends Component {

	static propTypes = {
		character: PropTypes.object,
		onNameChange: PropTypes.func,
		onHpChange: PropTypes.func,
		onStatChange: PropTypes.func,
		onResChange: PropTypes.func
	};

	render() {
		const {character, onStatChange, onResChange, onNameChange, onHpChange} = this.props;
		return (
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
					<ResDropDown name="phy" onChange={onResChange}/>
					<ResDropDown name="men" onChange={onResChange}/>
				</div>
				<div>
					<ResDropDown name="fir" onChange={onResChange}/>
					<ResDropDown name="ice"/>
				</div>
				<div>
					<ResDropDown name="win" onChange={onResChange}/>
					<ResDropDown name="thu" onChange={onResChange}/>
				</div>
				<div>
					<ResDropDown name="dar" onChange={onResChange}/>
					<ResDropDown name="lig" onChange={onResChange}/>
				</div>
			</div>
		);
	}
}
