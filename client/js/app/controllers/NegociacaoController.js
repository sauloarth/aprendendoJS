class NegociacaoController {

    constructor() {

        /*criou um "atalho" para document.querySelector
         *o normal é que esse atalho sempre se refira ao elemento no qual
         *está sendo chamado, mas como precisamos que o querySelector sempre
         *seja acessado no contexto do nosso document, utilizamos o
         *.bind(document) para que o atalho seja criado mas a referencia
         *seja mantida em document.
         */
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        /*
        this._listaNegociacao = new ListaNegociacao(this, function(model){
            this._negociacoesView.update(model);
        });
       
        this._listaNegociacao = new ListaNegociacao(model => 
            this._negociacoesView.update(model));
        */
       let self = this;
        this._listaNegociacao = new Proxy(new ListaNegociacao(), {
            get(target, prop, receiver) {
                
                if(['adiciona', 'esvazia'].includes(prop) && 
                    typeof(target[prop]) == typeof(Function)) {
                        return function() {
                            console.log(`Interceptada: ${prop}`);
                            Reflect.apply(target[prop], target, arguments);
                            // só chamo após bind the arguments at the target
                            self._negociacoesView.update(target);
                        }
                    }
                            
                return Reflect.get(target, prop, receiver);
            }
        });

        this._negociacoesView = new NegociacaoView($('#negociacoesView'));
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._negociacoesView.update(this._listaNegociacao);
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event){
        event.preventDefault();

        this._listaNegociacao.adiciona(this._criaNegociacao());
        //this._negociacoesView.update(this._listaNegociacao);
        this._mensagem.texto = 'Negociação inserida com sucesso.'
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();

        console.log(this._listaNegociacao.negociacoes);
    }

    apaga(){
        this._listaNegociacao.esvazia();
        //this._negociacoesView.update(this._listaNegociacao);

        this._mensagem.texto = 'Negociações apagadas com sucesso.'
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
            )
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}