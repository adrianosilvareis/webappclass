const app = require('./config/express.js')()

const PORT = app.get('PORT')

app.listen(PORT, console.log(`Escutando na porta ${PORT}`))
