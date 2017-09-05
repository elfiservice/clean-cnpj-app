var app = app || {};

app.Result = Backbone.View.extend({
  el: '#outValueContainer',

  render: function() {
    //console.log(this.model);
    if(this.model.get('nome') !== ''){
      this.$el.append('<div class="out-value-content">' +
          this.model.get('cnpj') +
          '<p>' +
          this.model.get('nome') +
          '</p><p>' +
          this.model.get('abertura') +
          '</p><p>'+
           this.model.get('municipio') + '-' + this.model.get('uf') +
          '</p><p>' + this.model.get('atividade_principal') +
          '</p><p>' + this.model.get('situacao') +
          '</p><p>' + this.model.get('cep') +
          '</p><p>' + this.model.get('logradouro') + ', ' + this.model.get('numero') + ' - ' + this.model.get('bairro') +
          '</p><p>' + this.model.get('complemento') +
          '</p><p>' + this.model.get('telefone')
          +'</p></div>');
    } else {
      this.$el.append('<div class="out-value-content">' + this.model.get('cnpj') + '</div> ');
    }

    return this;
  },

  resetContent: function(){
    if( $('.out-value-content').length > 0 ){
      $('.out-value-content').remove();
    }
  }
});
