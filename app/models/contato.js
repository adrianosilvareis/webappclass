const Validations = require('./validations.js')()

class Contato {
  constructor ({ _id, nome, sobrenome, email } = {}) {
    const validations = new Validations()

    this.nome = validations.validateDefault(nome, 'nome')
    this.sobrenome = validations.validateDefault(sobrenome, 'sobrenome')
    this.email = validations.validateEmail(email, false)
    this.nomeCompleto = `${nome} ${sobrenome}`.trim()
  }

  set primaryKey (_id) {
    this._id = _id
  }

  get primaryKey () {
    return this._id
  }
}

module.exports = () => Contato
