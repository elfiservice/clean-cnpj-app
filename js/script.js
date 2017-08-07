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
            octpus.setCurrentValue(outValue);
            elemtOutValueContainer.append('<div class="out-value-content">' + octpus.getCurrentValue() + '</div>');
        }
    };

octpus.init();
});
