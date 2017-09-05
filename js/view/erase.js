var app = app || {};

app.EraseView = Backbone.View.extend({
  el: '#erase',

  events: {
    'click #go-btn': 'eraseCnpj'
  },

  initialize: function(){
  },

  eraseCnpj: function( e ) {
    e.preventDefault();
    var self = this;

    $('#formData div').children('input').each(function(i, el){ //take the inputs into the #addBook div
      var company = new app.Company();
      if( $(el).val() !== '' ){
        var outValue =  $(el).val().replace(/[^\d]+/g,'');
        company.set('cnpj', outValue);
        self.companyDataAPI(company);
      } else {
        company.set('cnpj', 'Digitie um CNPJ :)');
        self.appendValue(company);
      }
    });
  },

  appendValue: function(company){
    var result = new app.Result({
      model: company
    });
    result.resetContent();
    this.$el.append(result.render().el);
  },

  hideBtnGo: function() {
    $("#go-btn").hide(300);
    $(".load-gif").show(300);
  },

  showBtnGo: function() {
    $(".load-gif").hide(300);
    $("#go-btn").show(300);
  },

  companyDataAPI: function(company) {
    var self = this;
    var dataApiResult = "";
    $.ajax({
        url  : 'https://www.receitaws.com.br/v1/cnpj/' + company.get('cnpj'),
        type : "GET",
        crossDomain  : "true",
        dataType     : "jsonp",
        contentType  : "application/json",
        beforeSend: function( xhr ) {
          self.hideBtnGo();
        },
        success: function( data ){
            dataApiResult = data;
            if(data.status != "ERROR") {
                company.set({
                  nome: data.nome,
                  abertura: data.abertura,
                  municipio: data.municipio,
                  uf: data.uf,
                  atividade_principal: data.atividade_principal[0].text,
                  situacao: data.situacao,
                  cep: data.cep,
                  logradouro: data.logradouro,
                  numero: data.numero,
                  bairro: data.bairro,
                  complemento: data.complemento,
                  telefone: data.telefone
                });
            } else {
              company.set('cnpj', data.message);
            }
            self.showBtnGo();
            self.appendValue(company);
        }
    }).fail(function( jqXHR, textStatus ) {
        self.showBtnGo();
        company.set({nome: "Opa, tivemos problemas com o servidor, não foi possível trazer mais informações deste CNPJ!"});
        self.appendValue(company);
      });
  }
});
