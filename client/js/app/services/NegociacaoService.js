class NegociacaoService {
    
    obterNegociacaoDaSemana(cb) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)) 
                } else {
                    cb('Não foi possível executar a operação.', null)
                    console.log(xhr.responseText);
                }
                
            }
        }
        
        xhr.send(); 
    }

}