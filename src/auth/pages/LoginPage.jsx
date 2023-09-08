import { useEffect, useState} from "react";
import { Formik, Form, Field } from 'formik';
import { Button, Card, CardActions, CardContent, CardHeader, Grid,Alert, Stack as StackMUI} from '@mui/material';
import { makeStyles } from "@material-ui/core";
import * as Yup from "yup"
import { TextField } from "formik-material-ui"
import { validarRut, expresionesRegulares } from '../../helpers';
import Swal from 'sweetalert2'; 
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hook';


const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  }
}))

const {lowercaseRegEx, uppercaseRegEx,numericRegEx,lengthRegEx} = expresionesRegulares();

const initialValues = { email: '', 
                        password: ''}




export const LoginPage = () => {
  
  const { startLogin,limpiarMesaje, errorMessage,resultado} = useAuthStore();  

  const [ estadoMensaje, setEstadoMensaje] = useState(false);  
  const [ mensaje, setMensaje] = useState(''); 

  const [ mensaje2, setMensaje2] = useState(''); 

  useEffect(() => {
    if(resultado !== undefined){
      setEstadoMensaje(true);  
      setMensaje(resultado.descripcion);
      limpiarMesaje();
    }else{
      setEstadoMensaje(false);
      setMensaje('');
      console.log('Aqui');      
    }
  }, [resultado])
  
  const navigate = useNavigate();
 
  const classes = useStyle();

  const onSubmit = ({email,password}, {resetForm}) => {
    startLogin({'email':email , 'password': password});
    if(errorMessage !== undefined){
      resetForm({values: ''});
    }else{
      navigate('/restablecer-cuenta', {
        replace:true
      });  
    }
  }

  useEffect(() => {
    if(errorMessage !== undefined){
      Swal.fire('Error en la autenticacion', errorMessage, 'error');

    }
  }, [errorMessage])

  const onClickRestablecerCuenta = (event) => {
    event.preventDefault();
    navigate('/restablecer-cuenta', {
      replace:true
    });    
  }

  const onClickRegistrarCuenta = (event) => {
    event.preventDefault();
    navigate('/registro-cuenta', {
      replace:true
    });    
  }
  


  const validationSchema = Yup.object().shape({
    email: Yup.string()  
              .email('Invalid email')
              .required("Este campo es obligatorio"),
    password: Yup.string()
      .matches(
        lowercaseRegEx,
        "Se debe ingresar al menos una letra en minúscula"
      )
      .matches(
        uppercaseRegEx,
        "Se debe ingresar al menos una letra en mayúscula"
      )
      .matches(numericRegEx, "Se debe ingresar al menos una número")
      .matches(lengthRegEx, "Se debe ingresar al menos 6 caracteres")
      .required("Este campo es obligatorio"),
  })

  

  return (       
   
    <Grid container
          spacing={1}
          sx = {{marginTop: {xs: 0, md:2},
                 marginLeft: {xs: 3},
                 marginRight: {xs: 3}, 
                 width:{xs: '90%'}}}
          direction="column"
          alignItems="center"
          alignSelf="center"
          justifySelf="center"
          justifyContent="center" 
          height='100%'>

        <Grid item 
              xs={3}>


          <Card className={classes.padding}>
            
            <CardHeader sx={{fontFamily: "Arimo", 
                             color: '#4d0c1c'}} 
                        align="center" 
                        title="Iniciar Sesión" />
            
            { estadoMensaje && <StackMUI sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success"><strong>{mensaje}</strong></Alert>
            </StackMUI>}


            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>

              {({ dirty, isValid, values, handleChange, handleBlur }) => {
                  return (
                    <Form>
                      <CardContent>
                        <Grid item 
                              container 
                              spacing={1} 
                              justify="center">
                          
                          <Field label = "Email"
                                 variant = "outlined"
                                 fullWidth
                                 name = "email"
                                 sx = {{marginTop: 2}}
                                 value = {values.email}                              
                                 component = {TextField}/>  
                          
                          <Field  label="Password"
                                  variant="outlined"
                                  fullWidth
                                  name="password"
                                  value={values.password}
                                  type="password"
                                  autoComplete="true"
                                  sx = {{marginTop:2}}
                                  component={TextField}/>
                          
                        </Grid>
                      </CardContent>

                      <CardActions sx={{fontFamily: "Arimo"}} 
                                   align="center" >
                        <Stack  xs={1}  width='100%'>
                        <Button disabled={!dirty || !isValid}
                                align="center"
                                size="small"
                                color="primary"
                                type="Submit"
                                variant='contained'
                                style={{margin: '0 auto', 
                                        display: "flex", 
                                        width:'48%',
                                        height:40,
                                        textTransform: 'none'}}
                                
                                className={classes.button}>
                          Ingresar
                        </Button>

                        <Stack direction="row" 
                               xs={2} 
                               spacing={2}  
                               sx={{mt:3}} 
                               width='100%'>
                          <Button color = "primary"
                                  variant = "outlined"
                                  style = {{ align:'right', 
                                             display: "flex", 
                                             width:'46%',
                                             height:40,
                                             textTransform: 'none'}}
                                  type="Submit"
                                  onClick={onClickRegistrarCuenta} >                                 
                              Crear Cuenta
                            </Button>

                            <Button variant="outlined"
                                    color="error"
                                    spacing={2}
                                    style={{align:'left',
                                            display: "flex", 
                                            width:'46%',
                                            height:40,
                                            textTransform: 'none'}}
                                    type="Submit"
                                    onClick={onClickRestablecerCuenta}>
                              Restablecer Cuenta
                            </Button>

                           </Stack>
                        
                        </Stack>
                                       
                      </CardActions>
                      
                    </Form>
                  )
                }}
            </Formik>   
          </Card>
        </Grid>
      </Grid>

  )

}
