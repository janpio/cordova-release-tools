'use strict';
const issueRegex = require('issue-regex');
const terminalLink = require('terminal-link');

/*
 * via https://github.com/sindresorhus/np/blob/0842b078126c2c3ebe5329e2feee487fb9f515be/source/util.js
 */

exports.issues = (url, message) => {
	return message.replace(issueRegex(), issue => {
		const issuePart = issue.replace('#', '/issues/');

		if (issue.startsWith('#')) {
			return terminalLink(issue, `${url}${issuePart}`);
		}

		return terminalLink(issue, `https://github.com/${issuePart}`);
	});
};

exports.commit = (url, commit) => {
	return terminalLink(commit, `${url}/commit/${commit}`);
};

exports.commitRange = (url, commitRange) => {
	return terminalLink(commitRange, `${url}/compare/${commitRange}`);
};