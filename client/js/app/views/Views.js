class Views {
    constructor(elemento){
        this._elemento = elemento;
    }

    template(){
        throw new Error('O método template deve ser implementado em herdeiros de Views.')
    }

    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}