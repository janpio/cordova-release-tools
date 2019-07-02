'use strict'
const execa = require('execa')

/*
 * mostly copy pasted from https://github.com/sindresorhus/np/blob/master/source/git-util.js
 * then adapted to make the local eslint rules happy
 */

exports.currentBranch = () => execa.stdout('git', ['symbolic-ref', '--short', 'HEAD'])

exports.latestTag = async () => {
  const latestCommit = await execa.stdout('git', ['rev-list', '--tags', '--max-count=1'])
  return execa.stdout('git', ['describe', '--abbrev=0', '--tags', latestCommit])
  // execa.stdout('git', ['describe', '--abbrev=0', '--tags'])
}

exports.latestReleaseBranch = async () => {
  const branches = await execa.stdout('git', ['branch', '-r', '--list', '*.x', '--sort=-refname'])
  return branches.split('\n')[0].trim()
}

// adapted from isRemoteHistoryClean
exports.remoteCommitsToPull = async (until = 'HEAD') => {
  let history
  try { // Gracefully handle no remote set up.
    history = await execa.stdout('git', ['rev-list', '--count', '--left-only', '@{u}...' + until])
  } catch (_) {}

  if (history && history !== '0') {
    return history
  }

  return history
}

exports.localCommitsNotPushed = async () => {
  let commits
  try { // Gracefully handle no remote set up.
    commits = await execa.stdout('git', ['cherry', '-v'])
  } catch (_) {}

  if (commits) {
    return commits.split('\n').length
  }

  return 0
}

exports.commitcountSinceLatestTag = async () => {
  const latestTag = await exports.latestTag()
  return exports.remoteCommitsToPull(latestTag)
}

exports.commitcountSinceLatestTag = async () => {
  const latestTag = await exports.latestTag()
  return exports.remoteCommitsToPull(latestTag)
}

exports.commitLogFromRevision = revision => execa.stdout('git', ['log', '--format=%s (%h)', `${revision}..HEAD`])

exports.isWorkingTreeClean = async () => {
  try {
    const {stdout: status} = await execa('git', ['status', '--porcelain'])
    if (status !== '') {
      return false
    }

    return true
  } catch (_) {
    return false
  }
}

exports.isCheckoutFetched = async () => {
  let result
  try { // Gracefully handle no remote set up.
    result = await execa.stderr('git', ['fetch', 'origin', '--dry-run'])
  } catch (_) {}

  if (result && result !== '') {
    return false
  }

  return true
}

exports.addAndCommit = (commitMessage, files = ['.']) => {
  execa.stdout('git', ['add'].concat(files))
  execa.stdout('git', ['commit', '-m', commitMessage])
}

exports.tag = version => execa.stdout('git', ['tag', version])

exports.push = (what = null) => {
  let command = ['push', '--follow-tags']
  if (what) {
    command = command.concat(['origin', what])
  }
  execa.stdout('git', command)
}

exports.checkout = version => execa.stdout('git', ['checkout', version])

exports.rebase = () => execa.stdout('git', ['pull', '--rebase', 'origin', 'master'])
