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
        this._listaNegociacao = new ListaNegociacao();
        this._negociacoesView = new NegociacaoView($('#negociacoesView'));
        
        this._negociacoesView.update(this._listaNegociacao);
    }

    adiciona(event){
        event.preventDefault();

        this._listaNegociacao.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacao);
        this._limpaFormulario();

        console.log(this._listaNegociacao.negociacoes);
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