import { Formik, Form, Field } from 'formik';
import { Button, Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import * as Yup from "yup"
import { TextField } from "formik-material-ui"
import { validarRut } from '../../helpers';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { InputProfesional } from '.';
import { InputEspecialidad } from '.';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  }
}))

const initialValues = { nombres: ''}

export const FormularioEspecialidad = () => {
  
    const [flagEspecialidad, setFlagEspecialidad] = useState(true);
    const [flagProfesional, setFlagProfesional] = useState(false);
    
    const onClickEspecialidad = () => {
        setFlagEspecialidad(!flagEspecialidad);
        setFlagProfesional(!flagProfesional);
    };

    const onClickProfesional = () => {
        setFlagEspecialidad(!flagEspecialidad);
        setFlagProfesional(!flagProfesional);
    };
    
  const classes = useStyle();

  const onSubmit = (values) => {
    console.log(values)
  }

  

  const validationSchema = Yup.object().shape({
    nombres:Yup.string()
      .required('')
    
  })

  return (       
    <Grid container
          spacing={1}
          sx = {{marginTop: {xs: 0, md:2},
                 marginLeft: {xs: 3},
                 marginRight: {xs: 3}, 
                 width:{xs: '100%'}}}
          direction="column"
          alignItems="center"
          alignSelf="center"
          justifySelf="center"
          justifyContent="center" 
          height='100%'
          width="50%">

        <Grid item 
              xs={3} sx ={{width:{ xs:'100%', md: '50%'}}}>

          <Card className={classes.padding}  sx ={{width:{ md: '100%'}}}>

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
                          
                          {flagEspecialidad ? <InputEspecialidad />: <InputProfesional values={values}/>}         
                          
                          
                        </Grid>
                      </CardContent>

                      <CardActions sx={{fontFamily: "Arimo"}} 
                                   align="center" >
                        <Stack  xs={2} spacing={2} width='100%' direction="row" >
                          <Button onClick={onClickEspecialidad}
                                  align="center"
                                  size="small"
                                  color= "secondary"
                                  variant={flagEspecialidad ? 'contained': "outlined"}
                                  style={{margin: '0 auto', 
                                          display: "flex", 
                                          width:'48%',
                                          height:40,
                                          textTransform: 'none'}}                                
                                  className={classes.button}>
                            Especialidad
                          </Button>    
                          
                          <Button onClick={onClickProfesional}
                                  align="center"
                                  size="small"
                                  color="secondary"
                                  variant={flagProfesional? 'contained': "outlined"}
                                  style={{margin: '0 auto', 
                                          display: "flex", 
                                          width:'48%',
                                          height:40,
                                          textTransform: 'none'}}                                
                                  className={classes.button}>
                            Profesional
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
