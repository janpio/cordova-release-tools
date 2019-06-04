const {expect, test} = require('@oclif/test')

describe('release-branch:checkout', () => {
  test
  .stdout()
  .command(['release-branch:checkout'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['release-branch:checkout', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
