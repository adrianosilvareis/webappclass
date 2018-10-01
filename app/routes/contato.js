module.exports = (app) => {
  const contato = app.controllers.contato

  app
    .route('/contatos')
    .get(contato.listarContatos)
    .post(contato.adicionarContato)

  app.route('/contatos/:_id')
    .get(contato.obterContato)
    .put(contato.atualizarContato)
    .delete(contato.removerContato)
}
