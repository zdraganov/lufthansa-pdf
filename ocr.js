const fs = require('fs')
const pdf = require('pdf-parse')
const xlsx = require('xlsx')

const sheetName = 'Sheet1'

function applyDifferencesInSheet (fileBuffer, panels) {
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' })
  const worksheet = workbook.Sheets[sheetName]

  panels.forEach(panel => {
    worksheet['B' + panel.rowNumber] = { t: 'S', v: 'N/A' }
  })

  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx', bookSST: false })
}

function getOurPanels (fileBuffer) {
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' })
  const worksheet = workbook.Sheets[sheetName]

  return xlsx.utils.sheet_to_json(worksheet).map((r, i) => ({ panel: r.Panel, rowNumber: i + 2 }))
}

function getAirbusPdfPanels (fileBuffer) {
  return pdf(fileBuffer).then(data => {
    return data.text
      .match(/\d{3}\s?[A-Z]{2}/g)
      .map(p => p.replace(' ', ''))
  })
}

async function processFiles (airbusPdf, xlsxFile) {
  const airbusPdfPanels = await getAirbusPdfPanels(airbusPdf)
  const ourPanels = await getOurPanels(xlsxFile)

  const notFoundPanelsFromOurs = ourPanels.filter(panel => !airbusPdfPanels.includes(panel.panel))
  const buffer = await applyDifferencesInSheet(xlsxFile, notFoundPanelsFromOurs)

  return buffer
}

module.exports = processFiles
