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

        this._negociacoesView = new NegociacaoView($('#negociacoesView'));
        this._mensagemView = new MensagemView($('#mensagemView'));
        
        this._listaNegociacao = new Bind(
            new ListaNegociacao(),
            new NegociacaoView($('#negociacoesView')),
            'adiciona', 'esvazia'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        )
    }

    adiciona(event){
        event.preventDefault();
        console.log(this);
        this._listaNegociacao.adiciona(this._criaNegociacao());
        //this._negociacoesView.update(this._listaNegociacao);
        this._mensagem.texto = 'Negociação inserida com sucesso.'
        //this._mensagemView.update(this._mensagem);
        this._limpaFormulario();

        console.log(this._listaNegociacao.negociacoes);
    }

    apaga(){
        this._listaNegociacao.esvazia();
        //this._negociacoesView.update(this._listaNegociacao);

        this._mensagem.texto = 'Negociações apagadas com sucesso.'
       // this._mensagemView.update(this._mensagem);
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

    importaNegociacoes(){
        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacaoDaSemana(),
            service.obterNegociacaoDaSemanaAnterior(),
            service.obterNegociacaoDaSemanaRetrasada()]
        ).then(negociacoes => { 
                negociacoes
                .reduce((flatArray, array) => flatArray.concat(array), [])
                .forEach(negociacao => this._listaNegociacao.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso.'
            })
            .catch(erro => this._mensagem.texto = erro);
        
    }

}