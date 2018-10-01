const { expect } = require('chai')
const request = require('supertest')

const app = require('@/config/express')()
const ContatoController = require('../controllers/contato')(app)

describe('Contato Crud', () => {
  describe('Smoke tests', () => {
    it('should exists listarContatos', () => {
      expect(ContatoController.listarContatos).to.be.exist
    })
    it('should exists obterContato', () => {
      expect(ContatoController.obterContato).to.be.exist
    })
    it('should exists adicionarContato', () => {
      expect(ContatoController.adicionarContato).to.be.exist
    })
    it('should exists atualizarContato', () => {
      expect(ContatoController.atualizarContato).to.be.exist
    })
    it('should exists removerContato', () => {
      expect(ContatoController.removerContato).to.be.exist
    })
  })

  describe('integrations tests', () => {
    describe('listarContatos', () => {
      it('should receive list of contacts', (done) => {
        request(app)
          .get('/contatos')
          .then((response) => {
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.be.an('array')
            done()
          })
      })
    })

    describe('adicionarContato', () => {
      it('devo receber o contato que enviei para adicionar', (done) => {
        const contato = { nome: 'adriano', sobrenome: 'silva reis', email: 'adriano@email.com' }
        request(app)
          .post('/contatos')
          .send(contato)
          .then((response) => {
            contato._id = 1

            expect(response.statusCode).to.equal(201)
            expect(response.body).to.have.property('_id').to.equal(contato._id)
            expect(response.body).to.have.property('nome').to.equal(contato.nome)
            expect(response.body).to.have.property('sobrenome').to.equal(contato.sobrenome)
            expect(response.body).to.have.property('email').to.equal(contato.email)
            done()
          })
      })

      it('devo receber uma lista de contatos com um elemento', (done) => {
        request(app)
          .get('/contatos')
          .then((response) => {
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.be.an('array').have.lengthOf(1)
            done()
          })
      })

      it('devo receber um validation error', (done) => {
        const contato = { nome: 'adriano', sobrenome: 'adriano', email: 'adrianoteste' }
        request(app)
          .post('/contatos')
          .send(contato)
          .then(response => {
            expect(response.statusCode).to.equal(400)
            expect(response.body).to.have.property('name').to.equal('Validation')
            expect(response.body).to.have.property('message').to.equal('Email inválido')
            done()
          })
      })
    })

    describe('obterContato', () => {
      it('deve receber o contato de _id === 1', async () => {
        const resp = await request(app)
          .get('/contatos/1')

        expect(resp.body).to.have.property('_id').to.equal(1)
        expect(resp.body).to.have.property('nome').to.equal('adriano')
        expect(resp.body).to.have.property('sobrenome').to.equal('silva reis')
        expect(resp.body).to.have.property('email').to.equal('adriano@email.com')
      })
    })

    describe('removerContato', () => {
      it('devo receber 200 ao remover contato', (done) => {
        request(app)
          .delete('/contatos/1')
          .then(response => {
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.have.property('_id').to.equal(1)
            done()
          })
      })
    })
  })
})
