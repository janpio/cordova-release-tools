'use strict';
const readPkg = require('read-pkg');
const { linkify } = require('linkify-markdown')

// https://github.com/sindresorhus/np/blob/0842b078126c2c3ebe5329e2feee487fb9f515be/source/util.js#L9-L17
exports.readPkg = () => {
	const pkg = readPkg.sync();

	if (!pkg) {
		throw new Error('No package.json found. Make sure you\'re in the correct project.');
	}

	return pkg;
};

exports.createReleaseNotes = (log) => {
	const options = {
		strong: true,
		repository: 'apache/' + exports.readPkg().name,
		listItemIndent: '1'
	}
	
	// add list item marker
	log = log.split('\n').map(commit => { return `- ${commit}`}).join('\n')
	
	const history = linkify(log, options)

	return history
}
