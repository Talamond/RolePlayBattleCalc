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
