import * as Battle from '../models/battle';
import _ from 'lodash';

const CHARACTERS = 'CHARACTERS';
const CHANGE_ATTACKER = 'CHANGE_ATTACKER';
const CHANGE_DEFENDER = 'CHANGE_DEFENDER';
const BATTLE = 'BATTLE';
const ATT_ABIL = 'ATT_ABIL';
const DEF_ABIL = 'DEF_ABIL';
const SET_STATUS = 'SET_STATUS';
const CHANGE_HP = 'CHANGE_HP';
const NEXT_TURN = 'NEXT_TURN';

const handlers = {};

export function rolePlay(state = {
	characters: [],
	attacker: {},
	defender: {},
	aIndex: -1,
	dIndex: -1,
	aReceive: {},
	dReceive: {},
	aRoll: {},
	dRoll: {},
	aAbil: 'attack',
	dAbil: 'attack',
	battleSeq: [],
	currTurn: -1
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
	newState.characters.forEach((elem) => {
		elem.currHp = elem.hp;
	});
	// set battle sequence
	const sortedChars = _.sortBy(characters, (elem) => {
		return elem.agi.score * -1;
	});
	newState.currTurn = 0;
	newState.battleSeq = sortedChars;
	newState.aIndex = _.findIndex(characters, (elem) => {
		return newState.battleSeq[newState.currTurn].name === elem.name;
	});
	newState.attacker = newState.characters[newState.aIndex];
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
	newState.aRoll = result.aRoll;
	newState.dRoll = result.dRoll;
	if (newState.aReceive.status) {
		newState.attacker.status[newState.aReceive.status] = true;
	}
	if (newState.dReceive.status) {
		newState.defender.status[newState.dReceive.status] = true;
	}
	// newState.characters[newState.aIndex].currHp = newState.characters[newState.aIndex].currHp
	// 	- (newState.aReceive.dam ? newState.aReceive.dam : 0)
	// 	+ (newState.aReceive.healDam ? newState.aReceive.healDam : 0);
	// newState.characters[newState.dIndex].currHp = newState.characters[newState.dIndex].currHp
	// 	- (newState.dReceive.dam ? newState.dReceive.dam : 0)
	// 	+ (newState.dReceive.healDam ? newState.dReceive.healDam : 0);
	// console.log(result);
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
	char.currHp = payload.hp;
	return newState;
};

handlers[NEXT_TURN] = (state) => {
	const newState = { ...state };
	newState.currTurn = (newState.currTurn + 1) % newState.battleSeq.length;
	newState.aIndex = _.findIndex(newState.	characters, (elem) => {
		return newState.battleSeq[newState.currTurn].name === elem.name;
	});
	newState.aReceive = {};
	newState.dReceive = {};
	newState.aRoll = {};
	newState.dRoll = {};
	newState.attacker = newState.characters[newState.aIndex];
	if (newState.attacker.status.poison) {
		newState.aReceive.dam = Math.floor(newState.attacker.hp * 0.20);
		newState.aReceive.res = 'Poison';
	}
	if (newState.attacker.status.regen) {
		newState.aReceive.heal = 'Regen';
		newState.aReceive.healDam = Math.ceil(newState.attacker.hp * 0.10);
	}
	return newState;
};
