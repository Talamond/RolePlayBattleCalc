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


export function battle(attacker, defender) {
	return {
		type: 'BATTLE',
		payload: {
			attacker,
			defender
		}
	};
}
