const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const processFiles = require('./ocr')
const app = express()
const port = 8088

const storage = multer.memoryStorage()
const upload = multer({ storage })

const processMiddleware = upload.fields([
  { name: 'xlsxFile', maxCount: 1 },
  { name: 'airbusPdfFile', maxCount: 1 }
])

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.sendFile('index.html', { root: path.join(__dirname, './') }))
app.get('/version', (req, res) => res.send('1'))

app.post('/process', processMiddleware, (req, res) => {
  processFiles(req.files.airbusPdfFile[0].buffer, req.files.xlsxFile[0].buffer)
    .then(resultBuffer => {
      const fileName = 'result-' + new Date().getTime() + '.xlsx'
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-Transfer-Encoding', 'binary');
      res.setHeader('Content-Type', 'application/octet-stream');

      res.send(resultBuffer)
    })
})

app.listen(port, () => console.log('Server is running on port ' + port))
