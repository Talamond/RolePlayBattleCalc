export function setStat(stat, part, value) {
	return {
		type: 'SET_STAT',
		payload: {
			stat,
			part,
			value
		}
	};
}

export function setRes(element, value) {
	return {
		type: 'SET_RES',
		payload: {
			element,
			value
		}
	};
}

export function setHp(hp) {
	return {
		type: 'SET_HP',
		payload: {
			hp
		}
	};
}

export function save() {
	return {
		type: 'SAVE',
		payload: {}
	};
}

export function setName(name) {
	return {
		type: 'NAME',
		payload: {
			name
		}
	};
}
