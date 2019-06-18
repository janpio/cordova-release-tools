const {expect, test} = require('@oclif/test')

describe('release:preparecommit', () => {
  test
  .stdout()
  .command(['release:preparecommit'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['release:preparecommit', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
