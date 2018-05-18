class NegociacaoService {
    constructor (){
        this._http = new HttpService();
    }
    
    obterNegociacaoDaSemana() {

        return this._http
                .get('negociacoes/semana')
                .then(negociaoes => {
                    return negociaoes.map(objeto => new Negociacao(
                        new Date(objeto.data),
                        objeto.quantidade,
                        objeto.valor
                    ))
                })
                .catch(erro => {
                    console.log(erro)
                    throw new Error('Não foi possível importar as negociações da semana.');
                });
            
    }

    obterNegociacaoDaSemanaAnterior() {
        return this._http
                .get('negociacoes/anterior')
                .then(negociaoes => { //as if 'then' behave like a resolve
                    return negociaoes.map(objeto => new Negociacao(
                        new Date(objeto.data),
                        objeto.quantidade,
                        objeto.valor
                    ))
                })
                .catch(erro => {
                    console.log(erro)
                    throw new Error('Não foi possível importar as negociações da semana anterior.');
                });
            
    }

    obterNegociacaoDaSemanaRetrasada() {
        return this._http
                .get('negociacoes/retrasada')
                .then(negociaoes => {
                    return negociaoes.map(objeto => new Negociacao(
                        new Date(objeto.data),
                        objeto.quantidade,
                        objeto.valor
                    ))
                })
                .catch(erro => {
                    console.log(erro)
                    throw new Error('Não foi possível importar as negociações da semana retrasada.');
                });
            
    }

}