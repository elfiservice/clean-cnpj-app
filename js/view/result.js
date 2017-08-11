var app = app || {};

app.Result = Backbone.View.extend({
  el: '#outValueContainer',

  render: function() {
    console.log(this.model);
    this.$el.append('<div class="out-value-content">' + this.model.get('cnpj') + '</div> ');
    return this;
  },

  resetContent: function(){
    if( $('.out-value-content').length > 0 ){
      $('.out-value-content').remove();
    }
  }
});
