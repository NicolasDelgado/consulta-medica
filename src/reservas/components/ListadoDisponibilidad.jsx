import { Box, Grid, Typography,Paper  } from '@mui/material';
import { width } from '@mui/system';
import { HoraDisponibleProfesional } from './HoraDisponibleProfesional';
import { horasDisponibles } from '../data';


export const ListadoDisponibilidad = () => {
  return (
    
        <Grid container  spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center" sx={{mt: 5}} >
            
            {                        
                horasDisponibles.map((value, index) => {
                    return <HoraDisponibleProfesional key={value.id} {...value}/>
                })
            } 
            
        </Grid>


        
        

            

     
    
    
  )
}
