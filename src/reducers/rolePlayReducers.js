import * as Battle from '../models/battle';

const handlers = {};

export function rolePlay(state = {
	characters: [],
	attacker: {},
	defender: {},
	aReceive: undefined,
	dReceive: undefined
}, action) {
	const { type, payload } = action;

	if (!handlers[type]) {
		return state;
	}

	return handlers[type](state, payload);
}
const CHARACTERS = 'CHARACTERS';
const CHANGE_ATTACKER = 'CHANGE_ATTACKER';
const CHANGE_DEFENDER = 'CHANGE_DEFENDER';
const BATTLE = 'BATTLE';

handlers[CHARACTERS] = (state, payload) => {
	const { characters } = payload;
	const newState = { ...state };
	newState.characters = characters;
	return newState;
};

handlers[CHANGE_ATTACKER] = (state, payload) => {
	const { index } = payload;
	const newState = { ...state };
	newState.attacker = newState.characters[index];
	return newState;
};

handlers[CHANGE_DEFENDER] = (state, payload) => {
	const { index } = payload;
	const newState = { ...state };
	newState.defender = newState.characters[index];
	return newState;
};

handlers[BATTLE] = (state, payload) => {
	const { attacker, defender } = payload;
	const newState = { ...state };
	const result = Battle.battle(attacker, defender);
	newState.aReceive = result.aReceive;
	newState.dReceive = result.dReceive;
	console.log(result);
	return newState;
};
