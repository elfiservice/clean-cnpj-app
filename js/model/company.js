var app = app || {};

app.Company = Backbone.Model.extend({
  defaults: {
    cnpj: 'none',
    nome: '',
    abertura: '',
    municipio: '',
    uf: '',
    atividade_principal: '',
    situacao: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    telefone: ''
  }

});
