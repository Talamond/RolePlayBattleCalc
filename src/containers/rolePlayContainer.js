import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/main';
import _ from 'lodash';
import { store } from '../store';
import { Character } from '../components';
import { Button, Input } from 'react-bootstrap';

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

	onHpChange(e, index) {
		const val = parseInt(e.target.value, 10);
		store.actions.rolePlayActions.changeHp(index, val);
	}

	renderResults(r) {
		return (
			<div>
				<br/>
				<div>{r.dam}</div>
				<div>{r.result}</div>
				<div>{r.res}</div>
				<div>{r.crit}</div>
				<div>{r.heal}</div>
				<div>{r.healDam}</div>
				<div>{r.status}</div>
			</div>
		);
	}

	renderRoll(r) {
		return (
			<div>
				<div className="agiroll">{r.agiRoll}</div>
				<div className="mainroll">{r.mainRoll}</div>
				<div className="critRoll">{r.critRoll}</div>
			</div>
		);
	}

	render() {
		const { rolePlay: { attacker, defender, aReceive, dReceive, aIndex, dIndex, aRoll, dRoll } } = this.props;
		return (
			<div className="battle">
				<div className="aChar">
					<select value={aIndex} onChange={this.onChangeAttacker.bind(this)}>
						{this.renderCharacters()}
					</select>
					<select onChange={this.onAttAbil.bind(this)}>
						{this.renderAbilities(attacker)}
					</select>
					<If condition={!_.isEmpty(attacker)}>
						<div>
							<div>Curr HP</div>
							<Input className="stat-text" id="hp" type="text" value={attacker.currHp} onChange={(e) => this.onHpChange(e, aIndex)} />
							<Character character={attacker}
								onStatusChange={(e, status) => this.onStatusChange(e, status, aIndex)}/>
						</div>
					</If>
				</div>
				<div className="aRes">
					{this.renderRoll(aRoll)}
					{this.renderResults(aReceive)}
				</div>
				<div className="button">
					<Button onClick={() => this.onBattle(attacker, defender)}>Battle</Button>
					<Button onClick={() => store.actions.rolePlayActions.next()}>Next</Button>
				</div>
				<div className="dRes">
					{this.renderRoll(dRoll)}
					{this.renderResults(dReceive)}
				</div>
				<div className="dChar">
					<select value={dIndex} onChange={this.onChangeDefender.bind(this)}>
						{this.renderCharacters()}
					</select>
					<select onChange={this.onDefAbil.bind(this)}>
						{this.renderAbilities(defender)}
					</select>
					<If condition={!_.isEmpty(defender)}>
						<div>
							<div>Curr HP</div>
							<Input className="stat-text" id="hp" type="text" value={defender.currHp} onChange={(e) => this.onHpChange(e, aIndex)} />
							<Character character={defender}
								onStatusChange={(e, status) => this.onStatusChange(e, status, dIndex)}/>
						</div>
					</If>
				</div>
			</div>
		);
	}
}
