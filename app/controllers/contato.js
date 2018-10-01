module.exports = (app) => {
  const Contato = app.models.contato

  let mockContatoTable = []

  return {
    listarContatos (req, res) {
      res.status(200).json(mockContatoTable)
    },
    obterContato (req, res) {
      const _id = Math.floor(req.params._id)

      const contato = mockContatoTable.find((contato) => contato._id === _id)

      if (!contato) res.status(404).json('Contato não encontrado!')

      res.status(200).json(contato)
    },
    adicionarContato (req, res) {
      try {
        const contato = new Contato(req.body)
        contato.primaryKey = mockContatoTable.length + 1

        mockContatoTable.push(contato)

        return res.status(201).json(contato)
      } catch (Error) {
        if (Error.name === 'Validation') {
          return res.status(400).json(Error)
        }

        return res.status(500).json(Error)
      }
    },
    atualizarContato (req, res) {
      try {
        const _id = Math.floor(req.params._id)
        const contato = new Contato(req.body)

        const index = mockContatoTable.findIndex((item) => item._id === _id)

        if (!index) res.status(404).json('Contato não encontrado!')

        mockContatoTable[index] = contato

        res.status(200).json(contato)
      } catch (Error) {
        if (Error.name === 'Validation') {
          return res.status(400).json(Error)
        }

        return res.status(500).json(Error)
      }
    },
    removerContato (req, res) {
      const _id = Math.floor(req.params._id)

      const contato = mockContatoTable.find((item) => item._id === _id)

      if (!contato) res.status(404).json('Contato não encontrado!')

      mockContatoTable = mockContatoTable.filter((item) => item._id !== _id)

      res.status(200).json(contato)
    }
  }
}
