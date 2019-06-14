'use strict';
const execa = require('execa');

exports.armor = async (outPath) => execa('gpg', ['--armor', '--detach-sig', '--output', outPath + '.asc', outPath]);

exports.print_md = async (path, algo) => execa.stdout('gpg', ['--print-md', algo, path]);
