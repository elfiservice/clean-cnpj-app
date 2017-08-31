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
      if( $(el).val() !== ''){
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

  companyDataAPI: function(company) {
    var self = this;
    var dataApiResult = "";
    $.ajax({
        url  : 'https://www.receitaws.com.br/v1/cnpj/' + company.get('cnpj'),
        type : "GET",
        crossDomain  : "true",
        dataType     : "jsonp",
        contentType  : "application/json",
        success: function( data ){
            //console.log(data);
            dataApiResult = data;

            if(data.status != "ERROR") {
                company.set({
                  nome: data.nome,
                  abertura: data.abertura,
                  municipio: data.municipio,
                  uf: data.uf,
                  atividade_principal: data.atividade_principal[0].text,
                  situacao: data.situacao
                });

            } else {
              company.set('cnpj', data.message);
            }
            $(".load-gif").hide(300);
            $("#go-btn").show(300);
            self.appendValue(company);
        },
        beforeSend: function( xhr ) {
          $("#go-btn").hide(300);
          $(".load-gif").show(300);
          console.log(xhr);
        }
    }).fail(function( jqXHR, textStatus ) {
      $(".load-gif").hide(300);
      $("#go-btn").show(300);
      company.set('cnpj', "Opa, tivemos problemas com servidor! :)");
      self.appendValue(company);
  //alert( "Request failed: " + textStatus );
});
  }
});
