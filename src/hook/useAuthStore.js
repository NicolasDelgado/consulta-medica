import { useDispatch, useSelector } from 'react-redux';
import { authApi }  from  '../api';
import { onChecking, onLogin, onLogout,clearErrorMessage,onRegistroUsuario,limpiarMesajeExito } from '../store/auth';

export const useAuthStore = () => {

    const { status, user, errorMessage, resultado } = useSelector (state => state.auth);

    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        
        dispatch( onChecking());

        try{
            const { data } = await authApi.post('/auth/login',{email, password});
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            const headers = {
                'x-token': data.token
              }

            const resp = await authApi.get('/auth/token',{
                                                            headers: headers
                                                         });

            dispatch( onLogin({ estado: resp.data.estado, rut: resp.data.rut,email: resp.data.email,nombres: resp.data.nombres}));
        }catch(error){
            dispatch( onLogout('Credenciales Incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const registrarUsuario = async({rut, password, nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, sexo, telefono,email, isapre}) => {

        dispatch( onChecking());

        try{
            const {data} =  await authApi.post('/auth/registro',{rut, password, nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, sexo, telefono,email, isapre});
            
            dispatch( onRegistroUsuario({codigo:data.codigo, descripcion:data.mensaje}));
            
        }catch(error){
            const {response} = error;
                       
            dispatch( onLogout(response.data.mensaje));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 5000);
        }
    }

    const limpiarMesaje = () => {
        console.log("Antes 10 min");
        setTimeout(() => {
            console.log("Paso 10 min");
            dispatch(limpiarMesajeExito());
        }, 5000);
        
    }

    return {
        //Propiedades
        status, 
        user, 
        resultado,
        errorMessage,
        //metodos
        startLogin,
        registrarUsuario,
        limpiarMesaje,
    }

}