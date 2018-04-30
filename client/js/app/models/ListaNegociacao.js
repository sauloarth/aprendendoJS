class ListaNegociacao {

    constructor(){
        this._listaDeNegociacoes = [];
    }

    adiciona(negociacao){
        this._listaDeNegociacoes.push(negociacao);
    }

    get negociacoes(){
        //devolve defensivamente uma cópia da lista
        return [].concat(this._listaDeNegociacoes); 
    }

}