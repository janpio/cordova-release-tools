cordova-release-tools
=====================

Tools for releasing Apache Cordova packages

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cordova-release-tools.svg)](https://npmjs.org/package/cordova-release-tools)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/janpio/cordova-release-tools?branch=master&svg=true)](https://ci.appveyor.com/project/janpio/cordova-release-tools/branch/master)
[![Codecov](https://codecov.io/gh/janpio/cordova-release-tools/branch/master/graph/badge.svg)](https://codecov.io/gh/janpio/cordova-release-tools)
[![Downloads/week](https://img.shields.io/npm/dw/cordova-release-tools.svg)](https://npmjs.org/package/cordova-release-tools)
[![License](https://img.shields.io/npm/l/cordova-release-tools.svg)](https://github.com/janpio/cordova-release-tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cordova-release-tools
$ cort COMMAND
running command...
$ cort (-v|--version|version)
cordova-release-tools/0.1.0 win32-x64 node-v12.3.1
$ cort --help [COMMAND]
USAGE
  $ cort COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cort apache:archive`](#cort-apachearchive)
* [`cort apache:upload`](#cort-apacheupload)
* [`cort hello`](#cort-hello)
* [`cort help [COMMAND]`](#cort-help-command)
* [`cort identify`](#cort-identify)
* [`cort release-branch:checkout`](#cort-release-branchcheckout)
* [`cort release-branch:rebase`](#cort-release-branchrebase)
* [`cort release:commit`](#cort-releasecommit)
* [`cort release:preparecommit`](#cort-releasepreparecommit)
* [`cort release:push`](#cort-releasepush)
* [`cort release:tag`](#cort-releasetag)
* [`cort update-release-notes`](#cort-update-release-notes)
* [`cort version:bump`](#cort-versionbump)
* [`cort version:dev`](#cort-versiondev)
* [`cort version:undev`](#cort-versionundev)

## `cort apache:archive`

Creates an archive (.tar.gz, .asc, .sha) for the "current tag"

```
USAGE
  $ cort apache:archive
```

_See code: [src\commands\apache\archive.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\apache\archive.js)_

## `cort apache:upload`

Upload archive to Apache SVN dist/dev

```
USAGE
  $ cort apache:upload

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src\commands\apache\upload.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\apache\upload.js)_

## `cort hello`

Describe the command here

```
USAGE
  $ cort hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src\commands\hello.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\hello.js)_

## `cort help [COMMAND]`

display help for cort

```
USAGE
  $ cort help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src\commands\help.ts)_

## `cort identify`

Identify the project and output relevant information

```
USAGE
  $ cort identify

OPTIONS
  -n, --name=name  name to print
```

_See code: [src\commands\identify.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\identify.js)_

## `cort release-branch:checkout`

Checks out the release branch for the current version

```
USAGE
  $ cort release-branch:checkout
```

_See code: [src\commands\release-branch\checkout.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\release-branch\checkout.js)_

## `cort release-branch:rebase`

Rebases the currently checked out release branch onto master

```
USAGE
  $ cort release-branch:rebase
```

_See code: [src\commands\release-branch\rebase.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\release-branch\rebase.js)_

## `cort release:commit`

Commit release changes (commits and tag)

```
USAGE
  $ cort release:commit
```

_See code: [src\commands\release\commit.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\release\commit.js)_

## `cort release:preparecommit`

Describe the command here

```
USAGE
  $ cort release:preparecommit

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src\commands\release\preparecommit.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\release\preparecommit.js)_

## `cort release:push`

Push release commit and tag

```
USAGE
  $ cort release:push
```

_See code: [src\commands\release\push.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\release\push.js)_

## `cort release:tag`

Tag current commit with current version

```
USAGE
  $ cort release:tag
```

_See code: [src\commands\release\tag.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\release\tag.js)_

## `cort update-release-notes`

Update the project's `RELEASENOTES.md` with the relevant commits

```
USAGE
  $ cort update-release-notes
```

_See code: [src\commands\update-release-notes.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\update-release-notes.js)_

## `cort version:bump`

Bump all version strings

```
USAGE
  $ cort version:bump
```

_See code: [src\commands\version\bump.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\version\bump.js)_

## `cort version:dev`

Adds the -dev suffix to version strings in all relevant files

```
USAGE
  $ cort version:dev
```

_See code: [src\commands\version\dev.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\version\dev.js)_

## `cort version:undev`

Removes the -dev suffix from version strings in all relevant files

```
USAGE
  $ cort version:undev
```

_See code: [src\commands\version\undev.js](https://github.com/janpio/cordova-release-tools/blob/v0.1.0/src\commands\version\undev.js)_
<!-- commandsstop -->
