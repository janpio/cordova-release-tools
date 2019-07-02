'use strict'
const execa = require('execa')

exports.checkout = async (repo, path, options) => {
  console.log("svn checkout", repo, path, options)
  try {
    await execa.stdout('svn', ['checkout', repo, path, '--trust-server-cert', '--non-interactive'], options)
  } catch (error) {
    console.log(error)
  }
}

exports.up = async options => execa.stdout('svn', ['up'], options)

exports.add = async (folder, options) => execa.stdout('svn', ['add', folder], options)

exports.commit = async (message, options) => execa.stdout('svn', ['commit', '-m', message], options)

exports.rm = async (path, options) => execa.stdout('svn', ['rm', path], options)
