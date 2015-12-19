import http from './httpService';

export default class Service {
	static save(data) {
		return http.post('http://localhost:3001/save', data );
	}

	static characters() {
		return http.get('http://localhost:3001/characters').then((data) => {
			store.actions.rolePlayActions.characterRequestFinished(data);
		}, (err) => {
			console.error(err);
		});
	}
}
