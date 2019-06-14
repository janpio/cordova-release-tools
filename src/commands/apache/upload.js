const {Command} = require('@oclif/command')
const utils = require('../../utils/utils')
const path = require('path')
const fs = require('fs')
const svn = require('../../utils/svn')

class UploadCommand extends Command {
  async run() {
    const version = utils.readPkg().version
    const pkgName = utils.readPkg().name
    const releaseName = pkgName + '-' + version
    const tgzName = releaseName + '.tgz'

    this.log('Make sure ~/.cort exists')
    const dotcort = path.join(require('os').homedir(), '.cort')
    if (!fs.existsSync(dotcort)) fs.mkdirSync(dotcort)
    const svnOptions = {cwd: dotcort}

    this.log('checkout SVN repo')
    const checkoutpath = path.join(dotcort, 'cordova-dist-dev')
    // eslint-disable-next-line no-negated-condition
    if (!fs.existsSync(checkoutpath)) {
      await svn.checkout('https://dist.apache.org/repos/dist/dev/cordova', 'cordova-dist-dev', svnOptions)
    }

    svnOptions.cwd = path.join(checkoutpath)

    this.log('update SVN repo')
    await svn.up(svnOptions)

    this.log('add folder to SVN repo')
    const targetPath = path.join(checkoutpath, releaseName)
    if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath)
    fs.copyFileSync(tgzName, path.join(targetPath, tgzName))
    fs.copyFileSync(tgzName + '.sha512', path.join(targetPath, tgzName + '.sha512'))
    fs.copyFileSync(tgzName + '.asc', path.join(targetPath, tgzName + '.asc'))
    // TODO remove files after they were copied
    await svn.add(releaseName, svnOptions)

    this.log('commit changes to SVN')
    await svn.commit(`Uploading release candidates for plugins release (${releaseName})`, svnOptions)
  }
}

UploadCommand.description = `Upload archive to Apache SVN dist/dev`

module.exports = UploadCommand
