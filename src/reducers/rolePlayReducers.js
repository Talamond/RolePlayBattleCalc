const handlers = {};

export function rolePlay(state = {
	characters: []
}, action) {
	const { type, payload } = action;

	if (!handlers[type]) {
		return state;
	}

	return handlers[type](state, payload);
}
const CHARACTERS = 'CHARACTERS';

handlers[CHARACTERS] = (state, payload) => {
	const { characters } = payload;
	const newState = { ...state };
	newState.characters = characters;
	return newState;
};
