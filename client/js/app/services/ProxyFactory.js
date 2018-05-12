class ProxyFactory {
    
    static create(objeto, props, acao){
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                        return function() {
                            console.log(`Interceptada: ${prop}`);
                            Reflect.apply(target[prop], target, arguments);
                            // só chamo após bind the arguments at the target
                            return acao(target);
                        }
                    }
                            
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){

                if(props.includes(prop)){
                   console.log(`Interceptada: ${prop}`)
                    target[prop] = value;
                    acao(target)
                }

                return Reflect.set(target, prop, value, receiver);

            }
        });
    }

    static _ehFuncao(func){
        return typeof(func) == typeof(Function);
    }
}