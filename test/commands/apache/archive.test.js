const {expect, test} = require('@oclif/test')

describe('apache:archive', () => {
  test
  .stdout()
  .command(['apache:archive'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['apache:archive', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
