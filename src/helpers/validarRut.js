let validarDV = (rut) => {
    var M=0,S=1;
    for(;rut;rut=Math.floor(rut/10))
    S=(S+rut%10*(9-M++%6))%11;
    return S?S-1:'k';
}

export const validarRut = (rutCompleto) => {
    if(rutCompleto != null){
        if(!rutCompleto.includes("-")){
          rutCompleto = rutCompleto.substr(0,rutCompleto.length-1)+'-'+rutCompleto.substr(rutCompleto.length-1,1)
        }
    
        rut = rutCompleto.replaceAll(".","");
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rut ))
        return {
          isValid: false,
          errorMessage: 'Se debe ingresar un Rut válido',
        }
        var tmp   = rut.split('-');
        var digv  = tmp[1]; 
        var rut   = tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
        
        if(validarDV(rut) == digv ){
          return {isValid: true,}
        }
        else{
          return {
              isValid: false,
              errorMessage: 'Se debe ingresar un Rut válido',
            }
        }
    }
    else{
        return {
            isValid: false,
            errorMessage: 'Este campo es obligatorio',
        }
    }     
     
}
