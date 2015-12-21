import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/main';
import _ from 'lodash';
import { store } from '../store';
import { Character } from '../components';
import { Button } from 'react-bootstrap';

@connect(state => ({
	rolePlay: state.rolePlay
}))
export default class RolePlayContainer extends Component {

	static propTypes = {
		rolePlay: PropTypes.object
	};

	componentWillMount() {
		store.actions.rolePlayActions.getCharacters();
	}

	onChangeAttacker(e) {
		store.actions.rolePlayActions.changeAttacker(e.target.value);
	}

	onChangeDefender(e) {
		store.actions.rolePlayActions.changeDefender(e.target.value);
	}

	renderCharacters() {
		const { rolePlay: { characters } } = this.props;
		const dd = [];
		_.forEach(characters, (c, index) => {
			dd.push(<option value={index}>{c.name}</option>);
		});
		return dd;
	}

	renderAbilities(char) {
		const ret = [];
		ret.push(<option value="attack">Attack</option>);
		ret.push(<option value="guard">Guard</option>);
		_.forEach(char.active, (c) => {
			ret.push(<option value={c}>{c}</option>);
		});
		return ret;
	}

	onBattle(a, d) {
		store.actions.rolePlayActions.battle(a, d);
	}

	onAttAbil(e) {
		const val = e.target.value;
		store.actions.rolePlayActions.setAbilAtt(val);
	}

	onDefAbil(e) {
		const val = e.target.value;
		store.actions.rolePlayActions.setAbilDef(val);
	}

	onStatusChange(e, status, index) {
		const val = e.target.checked;
		store.actions.rolePlayActions.setStatus(val, status, index);
	}

	render() {
		const { rolePlay: { attacker, defender, aReceive, dReceive, aIndex, dIndex } } = this.props;
		return (
			<div>
				<div className="attacker">
					<select onChange={this.onChangeAttacker.bind(this)}>
						{this.renderCharacters()}
					</select>
					<If condition={!_.isEmpty(attacker)}>
						<Character character={attacker} onStatusChange={(e, status) => this.onStatusChange(e, status, aIndex)}/>
					</If>
					<select onChange={this.onAttAbil.bind(this)}>
						{this.renderAbilities(attacker)}
					</select>
					<div>{aReceive.dam}</div>
					<div>{aReceive.result}</div>
					<div>{aReceive.res}</div>
					<div>{aReceive.crit}</div>
					<Button onClick={() => this.onBattle(attacker, defender)}>Battle</Button>
				</div>
				<div className="defender">
					<select onChange={this.onChangeDefender.bind(this)}>
						{this.renderCharacters()}
					</select>
					<If condition={!_.isEmpty(defender)}>
						<Character character={defender} onStatusChange={(e, status) => this.onStatusChange(e, status, dIndex)}/>
					</If>
					<select onChange={this.onDefAbil.bind(this)}>
						{this.renderAbilities(defender)}
					</select>
					<div>{dReceive.dam}</div>
					<div>{dReceive.result}</div>
					<div>{dReceive.res}</div>
					<div>{dReceive.crit}</div>
				</div>
			</div>
		);
	}
}
