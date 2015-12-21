import * as Battle from '../models/battle';

const CHARACTERS = 'CHARACTERS';
const CHANGE_ATTACKER = 'CHANGE_ATTACKER';
const CHANGE_DEFENDER = 'CHANGE_DEFENDER';
const BATTLE = 'BATTLE';
const ATT_ABIL = 'ATT_ABIL';
const DEF_ABIL = 'DEF_ABIL';
const SET_STATUS = 'SET_STATUS';
const CHANGE_HP = 'CHANGE_HP';

const handlers = {};

export function rolePlay(state = {
	characters: [],
	attacker: {},
	defender: {},
	aIndex: -1,
	dIndex: -1,
	aReceive: {},
	dReceive: {},
	aAbil: 'attack',
	dAbil: 'attack'
}, action) {
	const { type, payload } = action;

	if (!handlers[type]) {
		return state;
	}

	return handlers[type](state, payload);
}

function tempStat(char, v) {
	char.str.temp = v;
	char.int.temp = v;
	char.agi.temp = v;
	char.per.temp = v;
	char.luc.temp = v;
	char.cha.temp = v;
	char.end.temp = v;
}

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
	newState.aIndex = index;
	return newState;
};

handlers[CHANGE_DEFENDER] = (state, payload) => {
	const { index } = payload;
	const newState = { ...state };
	newState.defender = newState.characters[index];
	newState.dIndex = index;
	return newState;
};

handlers[BATTLE] = (state, payload) => {
	const { attacker, defender } = payload;
	const newState = { ...state };
	const result = Battle.battle(attacker, state.aAbil, defender, state.dAbil);
	newState.aReceive = result.aReceive;
	newState.dReceive = result.dReceive;
	console.log(result);
	return newState;
};

handlers[ATT_ABIL] = (state, payload) => {
	const newState = { ...state };
	newState.aAbil = payload.abil;
	return newState;
};

handlers[DEF_ABIL] = (state, payload) => {
	const newState = { ...state };
	newState.dAbil = payload.abil;
	return newState;
};

handlers[SET_STATUS] = (state, payload) => {
	const newState = { ...state };
	const char = newState.characters[payload.charIndex];
	char.status[payload.status] = payload.b;
	if (char.status.buff && char.status.debuff) {
		tempStat(char, 0);
	} else if (char.status.buff) {
		tempStat(char, 1);
	} else if (char.status.debuff) {
		tempStat(char, -1);
	} else {
		tempStat(char, 0);
	}
	return newState;
};

handlers[CHANGE_HP] = (state, payload) => {
	const newState = { ...state };
	const char = newState.characters[payload.index];
	char.hp = payload.hp;
	return newState;
};
