class ValidateError {
  constructor (message) {
    this.name = 'Validation'
    this.message = message || 'Erro de validação'
    this.stack = (new Error()).stack
  }
}

class Validation extends ValidateError {
  /**
   *
   * @param {String} email
   * @param {boolean} required default true
   */
  validateEmail (email, required = true) {
    required || this.validateDefault(email)

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(email).toLowerCase())) {
      return String(email).toLowerCase()
    }

    throw new ValidateError('Email inválido')
  }

  /**
   *
   * @param {String} value
   * @param {String} value
   */
  validateDefault (value, key) {
    if (value) {
      return String(value)
    }

    throw new ValidateError(`Campo ${key.toUpperCase()} requerido`)
  }
}

module.exports = () => Validation
