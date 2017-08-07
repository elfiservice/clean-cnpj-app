$( document ).ready(function() {



    var elemtOutValueContainer = $('#outValueContainer');
    var btnGo = $('#go-btn');

    var model = {
        value: "",
        setValue: function(value){
            model.value = value;
        },
        getValue: function(){
            return model.value;
        }
    }

    var octpus = {
        init: function(){

            view.init();
        },
        setCurrentValue: function(outValue){
            model.setValue(outValue);
        },
        getCurrentValue: function(){
            return model.getValue();
        }
    };

    var view = {
        init: function() {
            btnGo.click(function(){
                var outValueContente = $('.out-value-content');
                var entreyValue = $('#entryValue').val();
                var outValue =  entreyValue.replace(/[^\d]+/g,'');
                if(outValueContente){
                    outValueContente.remove();
                }

                view.render(outValue);

            });
        },

        render: function(outValue){
            if(outValue != ""){
                octpus.setCurrentValue(outValue);
                var currentValue = octpus.getCurrentValue();
                var dataApiResult = "";
                $.ajax({
                    url  : 'https://www.receitaws.com.br/v1/cnpj/' + currentValue,
                    type : "GET",
                    crossDomain  : "true",
                    dataType     : "jsonp",
                    contentType  : "application/json",
                    success: function( data ){
                        console.log(data);
                        dataApiResult = data;

                        if(data.status != "ERROR") {
                            //alert(data.nome);
                            elemtOutValueContainer.append('<div class="out-value-content">' +
                                currentValue +
                                '<p>' +
                                data.nome +
                                '</p><p>' +
                                data.abertura +
                                '</p><p>'+
                                 data.municipio + '-' + data.uf +
                                '</p><p>' + data.atividade_principal[0].text +
                                '</p><p>' + data.situacao
                                +'</p></div>');

                        } else {
                            elemtOutValueContainer.append('<div class="out-value-content">' + data.message + '</div>');
                        }
                    }
                });
            } else {
                elemtOutValueContainer.append('<div class="out-value-content"> Digite um CNPJ! :)</div>');
            }



        }
    };

octpus.init();
});
