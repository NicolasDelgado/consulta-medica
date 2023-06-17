import {  Field } from 'formik';
import { TextField } from "formik-material-ui"

export const InputProfesional = (values) => {
    return (
        <Field label = "Nombres"
                variant = "outlined"
                fullWidth
                name = "nombre"
                sx = {{ marginTop: 2 }}
                value = { values.nombre }                             
                component = { TextField }/>
    )
  
  
    
}
