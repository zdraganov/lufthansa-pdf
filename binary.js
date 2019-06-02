const fs = require('fs')
const xlsx = require('xlsx')
const processFiles = require('./ocr')

async function main () {
  try {
    const airbusPdfFile = fs.readFileSync(process.argv[3])
    const xlsxFile = fs.readFileSync(process.argv[2])

    const fileBuffer = await processFiles(airbusPdfFile, xlsxFile)
    const fileName = 'result-' + new Date().getTime() + '.xlsx'

    fs.writeFileSync(fileName, fileBuffer)

    process.exit(0)
  } catch (e) {
    console.error(e)

    process.exit(1)
  }
}

main()
