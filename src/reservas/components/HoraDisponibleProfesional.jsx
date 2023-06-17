import { Grid, Typography } from "@mui/material"
import { TarjetaProfesionalHoraDisponible } from "./"


export const HoraDisponibleProfesional = ({id,hora,profesionalHora}) => {
  return (
   
   
   
   
   
    <Grid container >
        <Grid item display="flex"
        justifyContent="center"
        alignItems="center" xs={2}  sx={{mr:3,mb:2, background:"#4d0c1c", color: "#fff" , alignItems: "center"}}>
            <Typography>{hora}</Typography>
        </Grid>
        <Grid item xs={9.5}   sx={{ mb:2}}>
            {
                profesionalHora.map((value, index) => {
                   
                    if((profesionalHora.length-1)===index){
                        const ultimo = true;
                        return  <TarjetaProfesionalHoraDisponible key={index}  ultimoRegistro={ultimo} value={value} />
                    }
                    else{
                        const ultimo = false;
                        return  <TarjetaProfesionalHoraDisponible key={index}  ultimoRegistro={ultimo} value={value}   />   
                    }
                   
                })

            }
            
            
        </Grid>
    </Grid>
  )
}
