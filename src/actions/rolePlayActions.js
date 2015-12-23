import Service from '../services/service';

export function characterRequestFinished(data) {
	return {
		type: 'CHARACTERS',
		payload: {
			characters: data
		}
	};
}

export function getCharacters() {
	Service.characters();
	return {};
}

export function changeAttacker(index) {
	return {
		type: 'CHANGE_ATTACKER',
		payload: {
			index
		}
	};
}

export function changeDefender(index) {
	return {
		type: 'CHANGE_DEFENDER',
		payload: {
			index
		}
	};
}

export function setAbilAtt(abil) {
	return {
		type: 'ATT_ABIL',
		payload: {
			abil
		}
	};
}

export function setAbilDef(abil) {
	return {
		type: 'DEF_ABIL',
		payload: {
			abil
		}
	};
}

export function setStatus(b, status, charIndex) {
	return {
		type: 'SET_STATUS',
		payload: {
			b,
			status,
			charIndex
		}
	};
}

export function battle(attacker, defender) {
	return {
		type: 'BATTLE',
		payload: {
			attacker,
			defender
		}
	};
}

export function changeHp(charIndex, hp) {
	return {
		type: 'CHANGE_HP',
		payload: {
			index: charIndex,
			hp
		}
	};
}

export function next() {
	return {
		type: 'NEXT_TURN'
	};
}
