const fs = require('fs')
const path = require('path')
const svn = require('./svn')

const getAndCreateConfigFolder = () => {
  const dotcort = path.join(require('os').homedir(), '.cort')
  if (!fs.existsSync(dotcort)) fs.mkdirSync(dotcort)
  return dotcort
}

//

const getSvnRepo = (dotcort, folder) => {
  let svnUrlBase = 'https://dist.apache.org/repos/dist/'
  let checkoutFolderBase = 'cordova-dist-'

  // overwrite by local svnRepo information if present
  try {
    const svnRepo = JSON.parse(fs.readFileSync(path.join(dotcort, 'svnRepo.json')))
    svnUrlBase = svnRepo.svnUrlBase
    checkoutFolderBase = svnRepo.checkoutFolderBase
  } catch (error) {
    if (error.code === 'ENOENT') {
      // do nothing
    } else {
      console.log(error)
    }
  }

  let svnUrl = svnUrlBase + folder + '/cordova/'
  let checkoutFolder = checkoutFolderBase + folder

  return {svnUrl: svnUrl, checkoutFolder: checkoutFolder}
}

const makeSureDistIsCheckedOut = async folder => {
  const dotcort = getAndCreateConfigFolder()
  const svnOptions = {cwd: dotcort}
  const svnRepo = getSvnRepo(dotcort, folder)

  console.log('checkout SVN repo (if needed)', svnRepo.svnUrl, svnRepo.checkoutFolder)

  const checkoutpath = path.join(svnOptions.cwd, svnRepo.checkoutFolder)
  if (!fs.existsSync(checkoutpath)) {
    await svn.checkout(svnRepo.svnUrl, svnRepo.checkoutFolder, svnOptions)
  }
  return checkoutpath
}

const getSvnOptions = folder => {
  const dotcort = getAndCreateConfigFolder()
  const svnRepo = getSvnRepo(dotcort, folder)
  const checkoutpath = path.join(dotcort, svnRepo.checkoutFolder)
  const svnOptions = {cwd: checkoutpath}
  return svnOptions
}

const updateDistCheckout = async folder => {
  console.log('update SVN repo', folder)
  await svn.up(getSvnOptions(folder))
}

const addPathToDist = async (folder, pathToAdd) => {
  console.log('add path to SVN repo', folder, pathToAdd)
  await svn.add(pathToAdd, getSvnOptions(folder))
}

const commitDist = async (folder, message) => {
  console.log('commit changes to SVN', folder, message)
  await svn.commit(message, getSvnOptions(folder))
}

const makeSureDistIsCheckedOutAndUpdated = async folder => {
  const checkoutpath = await makeSureDistIsCheckedOut(folder)
  await updateDistCheckout(folder)
  return checkoutpath
}

const removePathfromDist = async (folder, pathToRemove) => {
  console.log('remove path from SVN repo', folder, pathToRemove)
  await svn.rm(pathToRemove, getSvnOptions(folder))
}

const getDistRepoUrl = folder => {
  const dotcort = getAndCreateConfigFolder()
  const svnRepo = getSvnRepo(dotcort, folder)
  return svnRepo.svnUrl
}

module.exports = {
  makeSureDistIsCheckedOutAndUpdated,
  addPathToDist,
  commitDist,
  removePathfromDist,
  getDistRepoUrl,
}
