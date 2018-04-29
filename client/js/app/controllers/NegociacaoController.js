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
    }

    adiciona(event){
        event.preventDefault();
        
        let data = new Date(...this._inputData.value.split('-')
            .map(function(item, indice) {
                if(indice == 1) {
                    return item - 1;
                }
                return item;
            })
        )

        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        )

        console.log(negociacao);
    }

}