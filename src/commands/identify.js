const {Command, flags} = require('@oclif/command')
const fs = require('fs')
const path = require('path')
const parseJson = require('parse-json');
const git = require('../utils/git');
const linkify = require('../utils/linkify');
const chalk = require('chalk');
const githubUrlFromGit = require('github-url-from-git');
const util = require('../utils/utils');

class IdentifyCommand extends Command {
  async run() {
    const filePath = path.resolve(process.cwd(), 'package.json');
    parseJson(fs.readFileSync(filePath, 'utf8'));
    const pkg = util.readPkg();

    console.log("Identify " + process.cwd() + ":")
    console.log()

    console.log("package name is: \t\t" + pkg.name)
    console.log("⮡ package type is: \t\t" + extractPackageTypeFromPackageName(pkg.name))
    console.log()

    console.log("package version is: \t\t" + pkg.version)
    console.log("⮡ next version is: \t\t" + pkg.version.replace('-dev', ''))
    console.log()

    console.log("current branch is: \t\t" + await git.currentBranch())
    const remoteCommitsToPull = await git.remoteCommitsToPull()
    console.log("local checkout is: \t\t" + ((remoteCommitsToPull == 0) ? chalk.bgGreen('current') : chalk.bgRed('outdated') + ', ' + remoteCommitsToPull + ' commits to pull'))
    console.log("working tree is is: \t\t" + (await git.isWorkingTreeClean() ? chalk.bgGreen('clean') : chalk.bgRed('unclean') + ' - You should commit or stash changes first'))
    console.log()

    console.log("latest tag is: \t\t\t" + await git.latestTag())
    console.log("latest release branch is: \t" + await git.latestReleaseBranch())
    console.log()

    console.log("commits since latest tag: \t" + await git.commitcountSinceLatestTag())
    const repoUrl = pkg.repository && githubUrlFromGit(pkg.repository.url);
    console.log("commit messages since latest tag: \n\n" + await printCommitLog(repoUrl))
  }
}

IdentifyCommand.description = `Identify the project and output relevant information
...
Extra documentation goes here
`

IdentifyCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = IdentifyCommand

const extractPackageTypeFromPackageName = (name) => {
  if (name.substring(0, 'cordova-plugin'.length) == 'cordova-plugin')
    return 'plugin'
  else if (['cordova-ios', 'cordova-android', 'cordova-android', 'cordova-browser', 'cordova-windows'].includes(name))
    return 'platform'
  else
    return undefined
}

// via https://github.com/sindresorhus/np/blob/0842b078126c2c3ebe5329e2feee487fb9f515be/source/ui.js#L12-L50
const printCommitLog = async repoUrl => {
	const latest = await git.latestTag();
	const log = await git.commitLogFromRevision(latest);

	const commits = log.split('\n')
		.map(commit => {
			const splitIndex = commit.lastIndexOf(' ');
			return {
				message: commit.slice(0, splitIndex),
				id: commit.slice(splitIndex + 1)
			};
		});

	const history = commits.map(commit => {
		const commitMessage = linkify.issues(repoUrl, commit.message);
		const commitId = linkify.commit(repoUrl, commit.id);
		return `- ${commitMessage}  ${commitId}`;
	}).join('\n');

	const commitRange = linkify.commitRange(repoUrl, `${latest}...master`);

	return `${chalk.bold('Commits:')}\n${history}\n\n${chalk.bold('Commit Range:')}\n${commitRange}\n`;
};