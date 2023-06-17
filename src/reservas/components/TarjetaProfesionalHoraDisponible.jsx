import { Grid, Typography } from "@mui/material"
import { HoraDisponible } from "./";

export const TarjetaProfesionalHoraDisponible = ({value,ultimoRegistro}) => {
  
  const {id,nombre,profesion,sucursal} = value;
  
  return (
    <>
        {
            ultimoRegistro ? <Grid item   sx={{ width:'100%',background:'#F6F8F6'}}>  
                        <HoraDisponible  key={id} {...value}/>
                     </Grid>
                   : <Grid item   sx={{ width:'100%', mb:1,background:'#F6F8F6'}} >  
                        <HoraDisponible key={id} {...value}/>
                     </Grid>
           
        }

        
       
    </>
  )
}
