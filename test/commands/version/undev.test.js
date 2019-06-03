const {expect, test} = require('@oclif/test')

describe('version:undev', () => {
  test
  .stdout()
  .command(['version:undev'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['version:undev', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
