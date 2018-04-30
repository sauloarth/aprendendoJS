class NegociacaoView {
    
    constructor(elemento){
        this._elemento = elemento;
    }

    _template(model){

        return `<table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>DATA</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR</th>
                            <th>VOLUME</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        ${model.negociacoes.map(n => {
                            return `<tr>
                                <td>${DateHelper.dateParaTexto(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.valor * n.quantidade}</td>
                            </tr>`}).join('')}
                    </tbody>
                    
                    <tfoot>
                            <td colspan="3"></td>
                            <td>${
                                (function(){
                                    let total = 0;
                                    model.negociacoes.forEach(n => total += n.valor * n.quantidade);
                                    return total;
                                })()
                            }</td>
                    </tfoot>
                </table>`;

    }

    update(model){
        this._elemento.innerHTML = this._template(model);
    }



}