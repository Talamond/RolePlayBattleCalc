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

	onBattle(a, d) {
		store.actions.rolePlayActions.battle(a, d);
	}

	render() {
		const { rolePlay: { attacker, defender, aReceive, dReceive } } = this.props;
		return (
			<div>
				<div className="attacker">
					<select onChange={this.onChangeAttacker.bind(this)}>
						{this.renderCharacters()}
					</select>
					<Character character={attacker}/>
					<div>{aReceive.dam}</div>
					<div>{aReceive.res}</div>
					<div>{aReceive.crit}</div>
					<Button onClick={() => this.onBattle(attacker, defender)}>Battle</Button>
				</div>
				<div className="defender">
					<select onChange={this.onChangeDefender.bind(this)}>
						{this.renderCharacters()}
					</select>
					<Character character={defender}/>
					<div>{dReceive.dam}</div>
					<div>{dReceive.res}</div>
					<div>{dReceive.crit}</div>
				</div>
			</div>
		);
	}
}
