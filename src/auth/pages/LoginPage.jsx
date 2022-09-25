import { Formik, Form, Field } from 'formik';
import { Button, Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import * as Yup from "yup"
import { TextField } from "formik-material-ui"
import { validarRut } from '../../helpers';
import { Stack } from '@mui/system';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  }
}))

const initialValues = { rut: '', 
                        password: ''}
                        
const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

export const LoginPage = () => {
  
 
  const classes = useStyle();

  const onSubmit = (values) => {
    console.log(values)
  }

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
  })

  return (       
    <Grid container
          spacing={1}
          sx = {{marginTop: {xs: 0, md:2},marginLeft: {xs: 3},marginRight: {xs: 3}, width:{xs: '90%'}}}
          direction="column"
          alignItems="center"
          alignSelf="center"
          justifySelf="center"
          justifyContent="center" height='100%'>

        <Grid item 
              xs={3}>

          <Card className={classes.padding}>
            
            <CardHeader sx={{fontFamily: "Arimo", 
                             color: '#4d0c1c'}} 
                        align="center" 
                        title="Iniciar Sesión" />

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
                          
                          <Field label="Rut"
                                 variant="outlined"
                                 fullWidth
                                 name="rut"
                                 sx = {{marginTop: 2}}
                                 value={values.rut}                              
                                 component={TextField}/>      
                          
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

                        <Stack direction="row" xs={2} spacing={2}  sx={{mt:3}} width='100%'>
                          <Button color = "primary"
                                  variant = "outlined"
                                  style = {{ align:'right', 
                                             display: "flex", 
                                             width:'46%',
                                             height:40,
                                             textTransform: 'none'}}
                                  href= '/registro-cuenta'>
                                 
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
                                    href= '/restablecer-cuenta'>
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
