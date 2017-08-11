var app = app || {};

app.EraseView = Backbone.View.extend({
  el: '#erase',

  events: {
    'click #go-btn': 'eraseCnpj'
  },

  eraseCnpj: function( e ) {
    e.preventDefault();

    var self = this;

    $('#formData div').children('input').each(function(i, el){ //take the inputs into the #addBook div
      if( $(el).val() !== ''){  //if the input is not empty
        var outValue =  $(el).val().replace(/[^\d]+/g,'');
        var company = new app.Company({
          cnpj: outValue
        });

        self.appendValue(company);
      }
    });
  },

  appendValue: function(value){
    var result = new app.Result({
      model: value
    });
    result.resetContent();
    this.$el.append(result.render().el);
  },
});
