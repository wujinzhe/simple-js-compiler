const acorn = require('acorn')
const escodegen = require('escodegen')
const estraverse = require('estraverse')
const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, 'source.js'), (err, data) => {
  let ast,          // ast结构变量
      source,       // 读取的源文件代码
      compileString // 转义后的js代码

  if (err) {
    throw new Error('文件读取失败')
  }

  source = data.toLocaleString()

  ast = acorn.parse(source)

  estraverse.traverse(ast, {
    enter (node, parent) {
      if (node.type === 'VariableDeclarator') {
        node.init.value = 333
        node.init.raw = '"333"'
      }
    }
  })

  compileString = escodegen.generate(ast)

  fs.writeFile(path.resolve(__dirname, 'compile.js'), compileString)

})