class ListaNegociacao {

    constructor(contexto, armadilha){
        this._listaDeNegociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }

    adiciona(negociacao){
        this._listaDeNegociacoes.push(negociacao);
        //this._armadilha(this);
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes(){
        //devolve defensivamente uma cópia da lista
        return [].concat(this._listaDeNegociacoes); 
    }

    esvazia(){
        this._listaDeNegociacoes = [];
        //this._armadilha(this);
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }

}