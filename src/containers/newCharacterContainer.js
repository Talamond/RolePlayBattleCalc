import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/main';
import { Character } from '../components';
import { store } from '../store.js';
import { Button } from 'react-bootstrap';

@connect(state => ({
	newCharacter: state.newCharacter
}))
export default class NewCharacterContainer extends Component {

	static propTypes = {
		newCharacter: PropTypes.object
	};

	onHp(e) {
		const hp = parseInt(e.target.value, 10);
		store.actions.newCharacterActions.setHp(hp);
	}

	onName(e) {
		const name = e.target.value;
		store.actions.newCharacterActions.setName(name);
	}

	onResChange(e, elem) {
		const val = e.target.value;
		store.actions.newCharacterActions.setRes(elem, val);
	}

	onSave() {
		store.actions.newCharacterActions.save();
	}

	onStatChange(e, stat, type) {
		const val = parseInt(e.target.value, 10);
		store.actions.newCharacterActions.setStat(stat, type, val);
	}

	render() {
		const { newCharacter } = this.props;
		return (
			<div>
				<div>New Character</div>
				<Character character={newCharacter}
					onNameChange={(e) => {this.onName(e);}}
					onHpChange={(e) => {this.onHp(e);}}
					onStatChange={(e, stat, type) => {this.onStatChange(e, stat, type);}}
					onResChange={(e, elem) => {this.onResChange(e, elem);}}/>
				<Button onClick={() => this.onSave()}>Save</Button>
			</div>
		);
	}
}
