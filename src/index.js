const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const decrypto = require('./app/decrypto')
const urlGET = process.env.URL_GET
const urlPOST = process.env.URL_POST
const request = require('request')

class App {
  constructor () {
    this.write()
  }

  write () {
    request.get(urlGET, (err, response, body) => {
      if (err) console.log(err)

      console.log(body)
      fs.writeFile(path.resolve('tmp', 'answer.json'), body, err => {
        if (err) console.log(err)
        this.read()
      })
    })
  }

  async read () {
    const data = await JSON.parse(
      fs.readFileSync(path.resolve('tmp', 'answer.json'))
    )

    const phrase = decrypto(data.cifrado, data.numero_casas)
    const phraseHash = sha1(phrase)

    const currentResponse = {
      ...data,
      decifrado: phrase,
      resumo_criptografico: phraseHash
    }

    this.reWrite(currentResponse)
  }

  async reWrite (data) {
    fs.writeFile(
      path.resolve('tmp', 'answer.json'),
      JSON.stringify(data),
      err => {
        if (err) console.log(err)
        this.upload()
      }
    )
  }

  upload () {
    var options = {
      url: urlPOST,
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      },
      formData: {
        answer: fs.createReadStream(path.resolve('tmp', 'answer.json'))
      }
    }
    request.post(options, (err, response, body) => {
      if (err) console.log(err)

      console.log(body)
    })
  }
}

module.exports = new App()
