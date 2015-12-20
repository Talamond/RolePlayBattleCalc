import http from './httpService';
const host = '192.168.1.68';
export default class Service {
	static save(data) {
		return http.post('http://' + host + ':3001/save', data );
	}

	static characters() {
		return http.get('http://' + host + ':3001/characters').then((data) => {
			store.actions.rolePlayActions.characterRequestFinished(data);
		}, (err) => {
			console.error(err);
		});
	}
}
