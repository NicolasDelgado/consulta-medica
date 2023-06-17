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

export const FormularioRestablecerPassword = () => {
  
 
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
    )
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
          height='100%'
          width="50%">

        <Grid item 
              xs={3} sx ={{width:{ xs:'100%', md: '30%'}}}>

          <Card className={classes.padding}  sx ={{width:{ md: '100%'}}}>
            
            <CardHeader sx={{fontFamily: "Arimo", 
                             color: '#4d0c1c'}} 
                        align="center" 
                        title="Restablecer Cuenta" />

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
                            Enviar
                          </Button>                       
                        
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
