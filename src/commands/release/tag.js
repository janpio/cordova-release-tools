const {Command} = require('@oclif/command')

const git = require('../../utils/git')

class TagCommand extends Command {
  async run() {
    // make sure we are on `master` to not switch to something else afterwards
    const currentBranch = await git.currentBranch()
    if (currentBranch !== 'master') {
      this.error(`Current branch is '${currentBranch}' instead of required 'master'. Please switch manually and try again.`)
    }

    // make sure there are not unpulled commits
    const isFetched = await git.isCheckoutFetched()
    const remoteCommitsToPull = await git.remoteCommitsToPull()
    const localCommitsNotPushed = await git.localCommitsNotPushed()
    const isWorkingTreeClean = await git.isWorkingTreeClean()
    if (!isFetched || remoteCommitsToPull !== 0 || localCommitsNotPushed !== 0 || !isWorkingTreeClean) {
      this.error(`Your checkout is not fully fetched, not all remote commits pulled, not all local commits pushed, or working tree dirty (${isFetched}, ${remoteCommitsToPull}, ${localCommitsNotPushed}, ${isWorkingTreeClean}). Please use 'cort identify' to clarify and fix.`)
    }

    const latestTag = await git.latestTag()
    // TODO Check that tag is expected one
    /*
    const pkg = utils.readPkg()
    const currentVersion = pkg.version
    */
    // TODO CHeck that tag follow expected format

    await git.checkout(latestTag)

    const releaseTag = 'rel/' + latestTag
    await git.tag(releaseTag)

    await git.push('refs/tags/' + releaseTag)

    await git.checkout('master')

      /*
      cd $l;
      tag=$(git describe --tags --abbrev=0);
      git checkout $tag;
      git tag 'rel/'$tag;
      git push origin refs/tags/'rel/'$tag;
      git checkout master
      */

  }
}

TagCommand.description = 'Checkout last tag, and tag with release tag'

module.exports = TagCommand
