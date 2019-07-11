const {Command, flags} = require('@oclif/command')
const fs = require('fs')
const path = require('path')
const parseJson = require('parse-json');
const git = require('../utils/git');
const linkify = require('../utils/linkify');
const chalk = require('chalk');
const githubUrlFromGit = require('github-url-from-git');
const utils = require('../utils/utils');

class IdentifyCommand extends Command {
  async run() {
    const pkg = utils.readPkg()

    console.log("Identify " + process.cwd() + ":")
    console.log()

    console.log("package name is: \t\t" + pkg.name)
    console.log("⮡ package type is: \t\t" + ((typeof utils.extractPackageTypeFromPackageName(pkg.name) !== 'undefined') ? chalk.bgGreen(utils.extractPackageTypeFromPackageName(pkg.name)) : chalk.bgRed('undefined')))
    console.log()

    console.log("package version is: \t\t" + pkg.version)
    console.log("⮡ next version is: \t\t" + pkg.version.replace('-dev', ''))
    console.log()

    const currentBranch = await git.currentBranch()
    console.log("current branch is: \t\t" + ((currentBranch === 'master') ? chalk.bgGreen(currentBranch) : chalk.bgRed(currentBranch)))
    console.log("local checkout is: \t\t" + ((await git.isCheckoutFetched()) ? chalk.bgGreen('fully fetched from remote') : chalk.bgRed('not fetched from remote') + ' - You should `git fetch origin` the remote changes first'))
    const remoteCommitsToPull = await git.remoteCommitsToPull()
    console.log("local checkout is: \t\t" + ((remoteCommitsToPull == 0) ? chalk.bgGreen('fully pulled from remote') : chalk.bgRed('not pulled from remote') + ' - ' + remoteCommitsToPull + ' commits to `git pull` from remote'))
    const localCommitsNotPushed = await git.localCommitsNotPushed()
    console.log("local checkout is: \t\t"  + ((localCommitsNotPushed == 0) ? chalk.bgGreen('fully pushed to remote') : chalk.bgRed('not pushed to remote') + ' - ' + localCommitsNotPushed + ' commits to `git push` to remote'))
    console.log("working tree is: \t\t" + (await git.isWorkingTreeClean() ? chalk.bgGreen('clean') : chalk.bgRed('unclean') + ' - You should commit or stash changes first'))
    console.log()

    console.log("latest tag is: \t\t\t" + await git.latestTag())
    console.log("latest release branch is: \t" + await git.latestReleaseBranch())
    console.log()

    console.log("commits since latest tag: \t" + await git.commitcountSinceLatestTag())
    const repoUrl = pkg.repository && githubUrlFromGit(pkg.repository.url);
    console.log("commit messages since latest tag: \n\n" + await printCommitLog(repoUrl))
  }
}

IdentifyCommand.description = `Identify the project and output relevant information`

IdentifyCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = IdentifyCommand

// via https://github.com/sindresorhus/np/blob/0842b078126c2c3ebe5329e2feee487fb9f515be/source/ui.js#L12-L50
const printCommitLog = async repoUrl => {
	const latest = await git.latestTag();
	const log = await git.commitLogFromRevision(latest);

	const commits = log.split('\n')
		.map(commit => {
			const splitIndex = commit.lastIndexOf('(');
			return {
				message: commit.slice(0, splitIndex),
				id: commit.slice(splitIndex + 1).substr(0, 7)
			};
		});

	const history = commits.map(commit => {
		const commitMessage = linkify.issues(repoUrl, commit.message);
		const commitId = linkify.commit(repoUrl, commit.id);
		return `- ${commitId} ${commitMessage}`;
	}).join('\n');

	const commitRange = linkify.commitRange(repoUrl, `${latest}...master`);

	return `${chalk.bold('Commits:')}\n${history}\n\n${chalk.bold('Commit Range:')}\n${commitRange}\n`;
};
