'use strict';
const execa = require('execa');

exports.pack = async () => execa.stdout('npm', ['pack']);
