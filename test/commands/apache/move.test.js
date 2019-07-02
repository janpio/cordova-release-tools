const {expect, test} = require('@oclif/test')

describe('apache:move', () => {
  test
  .stdout()
  .command(['apache:move'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['apache:move', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
