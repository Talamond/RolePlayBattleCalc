import request from 'superagent';

export const authAPI = 'http';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'del';

export default class HttpService {

	static _promise(req) {
		// split up into two cases to avoid SQLException in the back-end, when database name is not provided
		return new Promise((resolve, reject) => {
			req.type('json').end((err, res) => {
				if (!err && res.ok) {
					resolve(res);
				} else {
					reject({
						error: err,
						response: res
					});
				}
			});
		});
	}

	static _request(verb, url, data, query) {
		let req = request[verb](url);
		req = (data) ? req.send(data) : req;
		req = (query) ? req.query(query) : req;
		return HttpService._promise(req);
	}

	// when you need headers, etc from response
	static rawGet(url, query) {
		return HttpService._request(GET, url, null, query);
	}

	// when you just need the body data as json
	static get(url, query) {
		return HttpService.rawGet(url, query).then(({body}) => body);
	}

	static rawGetWithFilters(url, filterMap) {
		let query = 'filter=';
		if (filterMap) {
			let firstParam = true;
			for (const key of filterMap.keys()) {
				const val = filterMap.get(key);
				if (val) {
					query = firstParam ? query + `${key}=${val}` : query + `;${key}=${val}`;
					firstParam = false;
				}
			}
		}

		// no filter was added
		if (query === 'filter=') {
			return this.rawGet(url);
		}

		// there are filters
		return HttpService._promise(request.get(url).query(query));
	}

	static getWithFilters(url, filterMap) {
		return HttpService.rawGetWithFilters(url, filterMap).then(({body}) => body);
	}

	static rawPost(url, data, query) {
		return HttpService._request(POST, url, data, query);
	}

	static post(url, data, query) {
		return HttpService.rawPost(url, data, query).then(({body}) => body);
	}

	static rawPut(url, data, query) {
		return HttpService._request(PUT, url, data, query);
	}

	static put(url, data, query) {
		return HttpService.rawPut(url, data, query).then(({body}) => body);
	}

	static rawDelete(url, query, data) {
		return HttpService._request(DELETE, url, data, query);
	}

	static delete(url, query, data) {
		return HttpService.rawDelete(url, query, data).then(({body}) => body);
	}
}
