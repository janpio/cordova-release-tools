# Release Process for Cordova Core Plugins with `cort`

## Before

- `cort apache:buyinmail`
- Check out `master` branch of plugin
- `cort identify` to understand
- Manual: Create or check out release branch if needed

## Release

- `cort update-release-notes`
- Manual: Curate release notes
- `cort version:undev`
- `cort release:commit`
- TODO Check for CRLF linebreaks: https://github.com/apache/cordova-contribute/pull/27/files#diff-984f42e3d82cc870cf1726a6d3c092cd
- `cort release:votetag`
- `cort release:push`
- `cort apache:archive`
- `cort apache:upload`
- `cort apache:votemail` TODO should also automatically get tag and commit (a la `coho print-tags -r cordova-plugin-wkwebview-engine`)

### Enable further development

- `cort version:bump`
- `cort version:dev` 
- Remove archive files (TODO automate)
- `cort release:preparecommit`
- `cort release:push`

## Finish

### If vote succeeds

- `cort apache:move foo-1.2.3`
- `cort release:publish foo-1.2.3 NPM_OTP_TOKEN`
- `cort release:tag`
- `cort release:push`
- Manual: Cherry pick changes from release branch to `master`
- `cort apache:releasemail`

### If vote fails

- TODO
