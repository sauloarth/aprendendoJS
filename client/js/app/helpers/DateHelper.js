class DateHelper {

    constructor(){
        throw new Error('Esta classe não deve ser instanciada.')
    }

    static textoParaDate(texto){
        return new Date(...texto.value.split('-')
            .map((item, indice) => item - indice % 2)
        )
    }

    static dateParaTexto(data){
        return data.getDate() + '/'
        + (data.getMonth() + 1) + '/'
        + data.getFullYear();
    }

}