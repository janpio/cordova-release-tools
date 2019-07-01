const fs = require('fs')
const path = require('path')
const svn = require('./svn')

exports.getAndCreateConfigFolder = () => {
  const dotcort = path.join(require('os').homedir(), '.cort')
  if (!fs.existsSync(dotcort)) fs.mkdirSync(dotcort)
  return dotcort
}

exports.makeSureDistIsCheckedOutAndUpdated = async () => {
  const checkoutpath = await this.makeSureDistIsCheckedOut()
  await this.updateDistCheckout()
  return checkoutpath
}

exports.makeSureDistIsCheckedOut = async () => {
  const dotcort = this.getAndCreateConfigFolder()
  const svnOptions = {cwd: dotcort}

  let svnUrl = 'https://dist.apache.org/repos/dist/dev/cordova'
  let checkoutFolder = 'cordova-dist-dev'

  // overwrite by local svnRepo information if present
  try {
    const svnRepo = JSON.parse(fs.readFileSync(path.join(dotcort, 'svnRepo.json')))
    svnUrl = svnRepo.svnUrl
    checkoutFolder = svnRepo.checkoutFolder
  } catch (error) {}

  console.log('checkout SVN repo (if needed)', svnUrl, checkoutFolder)

  const checkoutpath = path.join(svnOptions.cwd, checkoutFolder)
  if (!fs.existsSync(checkoutpath)) {
    await svn.checkout(svnUrl, checkoutFolder, svnOptions)
  }
  return checkoutpath
}

exports.getSvnOptions = () => {
  const dotcort = this.getAndCreateConfigFolder()
  const checkoutpath = path.join(dotcort, 'pseudo-cordova-dist-dev')
  const svnOptions = {cwd: checkoutpath}
  return svnOptions
}

exports.updateDistCheckout = async () => {
  console.log('update SVN repo')
  await svn.up(this.getSvnOptions())
}

exports.addFolderToDist = async folder => {
  console.log('add folder to SVN repo', folder)
  await svn.add(folder, this.getSvnOptions())
}

exports.commitDist = async message => {
  console.log('commit changes to SVN', message)
  await svn.commit(message, this.getSvnOptions())
}
