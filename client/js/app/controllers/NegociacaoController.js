class NegociacaoController {

    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._ordemAtual = '';
        
        this._negociacoesView = new NegociacaoView($('#negociacoesView'));
        this._mensagemView = new MensagemView($('#mensagemView'));
        
        this._listaNegociacao = new Bind(
            new ListaNegociacao(),
            new NegociacaoView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        )

        this._negociacaoService = new NegociacaoService();
        this._init();

        
    }
    
    _init(){
        
        this._negociacaoService
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(negociacao => this._listaNegociacao.adiciona(negociacao))
            )
            .catch(erro => {
                this._mensagem.texto = erro;
            })
    
        setInterval(() => {
            this.importaNegociacoes();
        }, 3000)
    
    }
    
    adiciona(event){
        event.preventDefault();
        console.log(this);

        let negociacao = this._criaNegociacao();
        this._negociacaoService
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacao.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erros);

        console.log(this._listaNegociacao.negociacoes);
    }

    apaga(){
        this._negociacaoService
            .apaga()
            .then(mensagem => {
                this._listaNegociacao.esvazia();
                this._mensagem.texto = mensagem;
            })
            .catch(erro => {
                this._mensagem.texto = erro;
            })
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
            )
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    importaNegociacoes(){
        this._negociacaoService
            .importa(this._listaNegociacao.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacao.adiciona(negociacao);
                this._mensagem.texto = 'Negociações importadas com sucesso.'; 
            }))
            .catch(erro => this._mensagem.texto = erro);
        
    }

    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._listaNegociacao.inverteOrdem();
        } else {
            this._listaNegociacao.ordena((a, b) => a[coluna] - b[coluna]);
        }
        
        this._ordemAtual == coluna;
    }

}