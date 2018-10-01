const express = require('express')
const load = require('express-load')
const bodyParser = require('body-parser')

module.exports = () => {
  const app = express()

  app.set('PORT', process.env.PORT || 3000)

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  load('models', { cwd: 'app' })
    .then('controllers')
    .then('routes')
    .into(app)

  const NotFound = (req, res) => {
    res.status(405).json(`Método ${req.method} não permitido para ${req.baseUrl}`)
  }

  app.use('*', NotFound)

  return app
}
