import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import * as Yup from "yup"
import { TextField as MaterialTextFields, ToggleButton, ToggleButtonGroup, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { TextField } from "formik-material-ui"
import { validarRut, expresionesRegulares } from '../../helpers';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {es} from "date-fns/locale";
import {format} from "date-fns"; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { previsiones } from '../data/previsiones';
import { useAuthStore } from '../../hook';
import Swal from 'sweetalert2'; 


const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  }
}))

const {lowercaseRegEx, uppercaseRegEx,numericRegEx,lengthRegEx} = expresionesRegulares();

const initialValues = { rut: '', 
                        password: '',
                        fechaNacimiento:'',
                        repassword:'',
                        nombre:'',
                        apellidoPaterno:'',
                        apellidoMaterno:'',
                        sexo:'',
                        telefono:'',
                        email:'',
                        prevision: '' }

export const FormularioRegistroPaciente = () => {
 
  const [inputFechaNacimiento, setInputFechaNacimiento] = useState(null);

  const [prevision, setPrevision] = useState(0);

  const eventoCambioPrevision = (event) => {
    setPrevision(event.target.value);
  };

  const [sexo, setSexo] = useState('');

  const { registrarUsuario, errorMessage,resultado} = useAuthStore();  
  
  const navigate = useNavigate();
 
  const classes = useStyle();

  const onSubmit = async ({rut,password,fechaNacimiento,nombre,apellidoPaterno,apellidoMaterno,sexo,telefono,email}) => {
    console.log({rut,password,fechaNacimiento,nombre,apellidoPaterno,apellidoMaterno,sexo,telefono,email});
    registrarUsuario({'rut':rut , 
                      'password': password, 
                      'fechaNacimiento': fechaNacimiento, 
                      'nombres': nombre , 
                      'apellidoPaterno': apellidoPaterno, 
                      'apellidoMaterno': apellidoMaterno, 
                      'sexo': sexo, 
                      'telefono': telefono, 
                      'email': email, 
                      'isapre': prevision})   
  }

  useEffect(() => {
    if(errorMessage !== undefined){
      Swal.fire('Error en la autenticacion', errorMessage, 'error');

    }
  }, [errorMessage])

  useEffect(() => {

    if(resultado !== undefined){
      if(resultado.codigo ===200){
        navigate('/auth/login', {
          replace:true
        });
      }
      
    }
  }, [resultado])

  const validationSchema = Yup.object().shape({
    rut:Yup.string()
      .test('validator-rut', function (value) {
        const validation = validarRut(value);
        if (!validation.isValid) {
          return this.createError({
            path: this.path,
            message: validation.errorMessage,
          });
          
        }
        else {
          return true;
        }
      }
    ),    
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
    repassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "La password ingresada no coincide")
      .required('Este campo es obligatorio'),
    nombre: Yup.string()  
      .required("Este campo es obligatorio")
      .min(3, 'Se debe ingresar más de tres caracteres'),
    apellidoPaterno: Yup.string()  
      .required("Este campo es obligatorio")
      .min(3, 'Se debe ingresar más de tres caracteres'),
    email: Yup.string()  
      .email('Invalid email')
      .required("Este campo es obligatorio"),
    telefono: Yup.number()
      .required("Este campo es obligatorio")
      .typeError('Solo deben ser ingresados números'),
  })  

 

  return (       
    <Grid container
          spacing={3}
          sx = {{ marginTop: { xs: 5, md:5},
                  /*marginLeft: { xs: 3},
                  marginRight: { xs: 3}, */
                  marginBottom: { xs: 10, md:10},
                  border: 2,
                  width:{ xs: '100%'}}}
          direction = "column"
          alignItems = "center"
          alignSelf = "center"
          justifySelf = "center"
          justifyContent = "center">

        <Grid item 
              xs = {3} 
              sx = {{ width:{ xs:'100%', md: '30%'}}}>

          <Card className = { classes.padding }   
                sx = {{ marginBottom: { xs: 10, md:10 }}}>
            
            <CardHeader sx = {{ fontFamily: "Arimo", 
                                color: '#4d0c1c'}} 
                        align = "center" 
                        title = "Registrar Paciente" />

            <Formik initialValues = {initialValues}
                    validationSchema = {validationSchema}
                    onSubmit = {onSubmit}>

                {({ dirty, isValid, errors, values, handleChange, touched,setFieldTouched, setFieldValue, handleBlur,  }) => {
                    return (
                      <Form>
                        <CardContent>
                          <Grid item 
                                container 
                                spacing = {1} 
                                justify = "center">
                          
                            <Field label = "Rut"
                                  variant = "outlined"
                                  fullWidth
                                  name = "rut"
                                  sx = {{ marginTop: 2 }}
                                  value = { values.rut }                              
                                  component = { TextField }/>      
                            
                            <Field label = "Password"
                                  variant = "outlined"
                                  fullWidth
                                  name = "password"
                                  value = { values.password }
                                  type = "password"
                                  autoComplete = "true"
                                  sx = {{ marginTop:2 }}
                                  component = { TextField }/>

                            <Field label = "Repetir Password"
                                  variant = "outlined"
                                  fullWidth
                                  name = "repassword"
                                  value = { values.repassword }
                                  type = "password"
                                  autoComplete = "true"
                                  sx = {{ marginTop:2 }}
                                  component = { TextField }/>
                            
                            <Field label = "Nombres"
                                  variant = "outlined"
                                  fullWidth
                                  name = "nombre"
                                  sx = {{ marginTop: 2 }}
                                  value = { values.nombre }                              
                                  component = { TextField }/>

                            <Field label = "Apellido Paterno"
                                  variant = "outlined"
                                  fullWidth
                                  name = "apellidoPaterno"
                                  sx = { {marginTop: 2 }}
                                  value = { values.apellidoPaterno }                              
                                  component = { TextField }/>  
                            
                            <Field label = "Apellido Materno"
                                  variant = "outlined"
                                  fullWidth
                                  name = "apellidoMaterno"
                                  sx = {{ marginTop: 2,
                                          marginBottom: 3 }}
                                  value = { values.apellidoMaterno }                              
                                  component = { TextField }/>
                                
                            <LocalizationProvider dateAdapter = { AdapterDateFns } 
                                                  adapterLocale = {es}>

                              <DatePicker label = "Fecha Nacimiento"
                                          value = { inputFechaNacimiento }
                                          variant = "outlined"
                                          inputFormat = "dd/MM/yyyy"
                                          selected = { inputFechaNacimiento }
                                          onBlur = { (nuevoValor) => {
                                            setInputFechaNacimiento(nuevoValor);                                         
                                          }}
                                          onChange = {(fecha, name) => {
                                            setInputFechaNacimiento(fecha);
                                            var formatearFecha = format(fecha, "dd/MM/yyyy");
                                            setFieldValue("fechaNacimiento", formatearFecha)
                                            
                                          }}
                                          maxDate={new Date()}
                                          renderInput = {(params) => <MaterialTextFields error={ Boolean( errors.fechaNacimiento ) && touched.fechaNacimiento}   
                                                                                        helperText={Boolean(errors.fechaNacimiento)? 'errors.fechaNacimiento': ''}
                                                                                        {...params}/>}/>
                            </LocalizationProvider>
                                  
                            <Typography sx = {{ marginTop: 2, 
                                                width:'100%;' }}> Sexo </Typography>
                            
                            <br/>

                            <ToggleButtonGroup color = "secondary"
                                              value = { sexo }
                                              name = "sexo"
                                              sx = {{ marginTop: 2 }}
                                              id = 'sexo'
                                              exclusive
                                              onChange = {(event,sexo) => {
                                                  setSexo(event.target.value)
                                                  setFieldValue("sexo", sexo)                           
                                              }}>
                              <ToggleButton value = "M"> Masculino </ToggleButton>
                              <ToggleButton value = "F"> Femenino </ToggleButton>
                            </ToggleButtonGroup>

                            
                            <Field label = "Teléfono"
                                  variant = "outlined"
                                  fullWidth
                                  type = "tel"
                                  name = "telefono"
                                  sx = {{ marginTop: 2 }}
                                  value = { values.telefono }                              
                                  component = { TextField }/>

                            <Field label = "Email"
                                  variant = "outlined"
                                  fullWidth
                                  name = "email"
                                  sx = {{marginTop: 2}}
                                  value = {values.email}                              
                                  component = {TextField}/>

                            <FormControl fullWidth  sx = {{marginTop: 2}}>

                              <InputLabel id="demo-simple-select-label">Previsión</InputLabel>

                              <Select labelId = "demo-simple-select-label"
                                      id = "demo-simple-select"
                                      value = { prevision }
                                      label = "Previsión"   
                                      onChange = {eventoCambioPrevision}>
                                {
                                  previsiones?.map(pre => {return(
                                    <MenuItem key = { pre.id } 
                                              value = { pre.id }> { pre.nombre } </MenuItem>    
                                              );
                                            })}
                              </Select>

                            </FormControl>
                           
                          </Grid>

                        </CardContent>

                        <CardActions sx = {{ fontFamily: "Arimo" }} 
                                     align = "center">
                          <Stack  xs = {1}  
                                  width = '100%'>
                            <Button align = "center"
                                    size = "small"
                                    color = "primary"
                                    type = "Submit"
                                    variant = 'contained'
                                    style = {{margin: '0 auto', 
                                              display: "flex", 
                                              width: '48%',
                                              height: 40,
                                              textTransform: 'none'}}                                  
                                    className={classes.button}>Registrar</Button>
                          
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
