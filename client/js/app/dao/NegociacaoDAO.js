class NegociacaoDAO{

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);
            
            request.onsuccess = e => {
                resolve();
            }
    
            request.onerror = e => {
                console.log(e.targe.error);
                reject('Não foi possível adicionar a negociação');
            }
            
        });
    }

    listaTodos(){
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
                
                let negociacoes = [];
        
                cursor.onsuccess = e => {
                    let negociacaoAtual = e.target.result;
        
                    if(negociacaoAtual){
                        var objetoJSON = negociacaoAtual.value;
                        negociacoes.push(new Negociacao(
                            objetoJSON._data,
                            objetoJSON._quantidade,
                            objetoJSON._valor));
        
                        negociacaoAtual.continue();
                    } else {
                        resolve(negociacoes);
                    }
                }
                
                cursor.onerror = e => {
                    console.log(e.target.error.name);
                    reject('Não foi possível listar as negociações.');
                }
            



        })
   
    }

    apagarTodos(){
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociações apagadas com sucesso.');

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar as negociações.');
            }
        
        })
    }

}