class DateHelper {

    constructor(){
        throw new Error('Esta classe não deve ser instanciada.')
    }

    static textoParaDate(texto){
        console.log(texto);
        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(texto))
            throw new Error('Deve estar no formato dd/mm/aaaa');
    
        return new Date(...texto.split('/').reverse()
        .map((item, indice) => item - indice % 2)
        )
    }

    static dateParaTexto(data){
        return (`${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`)
 
    }

}