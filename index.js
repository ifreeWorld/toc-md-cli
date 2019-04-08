#!/usr/bin/env node
var program = require('commander')
var VERSION = require('./package.json').version
var fs = require('fs')
var path = require('path')

program
  .version(VERSION, '-v, --version')
  .option('-g --generate <filePath>', 'generate markdown toc')
  .parse(process.argv)

handleFile(program.generate)

function handleFile(filePath) {
  console.log('filePath', filePath)
  if (filePath) {
    var relativePath = path.join('', filePath)
    var absolutePath = path.join(__dirname, filePath)

    if (fs.existsSync(relativePath)) {
      generateFile(relativePath)
    } else if (fs.existsSync(absolutePath)) {
      generateFile(absolutePath)
    } else {
      console.log('FilePath is invalid, Please input correct filePath')
    }
  } else {
    console.log('FilePath is empty, Please input filePath')
  }
}

function generateFile(path) {
  var content = fs.readFileSync(path, 'utf8')
  var lines = content.split('\r\n')
  var datas = []
  var texts = []
  var reg = /^#+ /
  lines.forEach((line, index) => {
    if (reg.test(line)) {
      var a = line.match(reg) || []
      // 是目录
      if (a.length > 0) {
        var pattern = a[0].replace(' ', '')
        var dtarr = line.split(a[0]) || []
        if (dtarr.length > 0) {
          var directoryName = dtarr[1]
          directoryName = replaceAll(directoryName, ' ', '')
          console.log(a[0] + directoryName)
          lines[index] = a[0] + directoryName
          datas.push({
            level: pattern.length,
            directoryName
          })
        }
      }
    }
  })
  datas.forEach(data => {
    texts.push(`${getEmptyStr(data.level)}- [${data.directoryName}](#${data.directoryName})`)
  })
  var toc = texts.join('\r\n')
  var result = '**Table of Contents**  *generated with [toc-md-cli](https://github.com/ifreeWorld/toc-md-cli)*\r\n\r\n'
  result += toc + '\r\n' + '\r\n' + lines.join('\r\n')
  fs.writeFileSync(path, result, {
    encoding: 'utf8'
  })
}

function getEmptyStr(level) {
  level = level || 1
  var str = ''
  for (var i = 1; i < level; i++) {
    str += '  '
  }
  return str
}

function replaceAll(directoryName, s1, s2) {
  return directoryName.replace(new RegExp(s1, "gm"), s2);
}
