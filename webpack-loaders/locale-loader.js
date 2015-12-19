/* eslint-disable */
// ES5 Syntax
// Convert messages.properties file to javascript object,
// escaping single quotes (').
module.exports = function(content) {
	this.cacheable && this.cacheable();
	content = content.split('\n').filter(function (line) {
		return !(/^#/).test(line) && (/=/).test(line);
	}).map(function (line) {
		var parts = line.split('=');
		var key = parts.shift().trim();
		var value = parts.join('=').trim().replace(RegExp("'", 'g'), "\\'");
		return key + ':' + "'" + value + "'";
	}).join(',');
	return 'module.exports = {' + content + '};';
}
/* eslint-enable */
