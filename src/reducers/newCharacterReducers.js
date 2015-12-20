import Service from '../services/service';

const handlers = {};

export function newCharacter(state = {
	str: {},
	int: {},
	agi: {},
	end: {},
	cha: {},
	per: {},
	luc: {},
	phy: '-',
	men: '-',
	fir: '-',
	ice: '-',
	win: '-',
	thu: '-',
	dar: '-',
	lig: '-',
	hp: 0,
	name: '',
	passive: {},
	active: {}
}, action) {
	const { type, payload } = action;

	if (!handlers[type]) {
		return state;
	}

	return handlers[type](state, payload);
}
const SET_STAT = 'SET_STAT';
const SET_RES = 'SET_RES';
const SET_HP = 'SET_HP';
const SAVE = 'SAVE';
const NAME = 'NAME';

handlers[SET_STAT] = (state, payload) => {
	const { stat, value, part } = payload;
	const newState = { ...state };
	newState[stat][part] = value;
	return newState;
};

handlers[SET_RES] = (state, payload) => {
	const { element, value } = payload;
	const newState = { ...state };
	newState[element] = value;
	return newState;
};

handlers[SET_HP] = (state, payload) => {
	const { hp } = payload;
	const newState = { ...state };
	newState.hp = hp;
	return newState;
};

handlers[SAVE] = (state) => {
	const newState = { ...state };
	Service.save(newState, name);
	return newState;
};

handlers[NAME] = (state, payload) => {
	const { name } = payload;
	const newState = { ...state };
	newState.name = name;
	return newState;
};
