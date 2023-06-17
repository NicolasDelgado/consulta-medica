import { Grid, Typography } from "@mui/material"
import { Box, fontSize } from "@mui/system"


export const HoraDisponible = ({id,nombre,profesion,sucursal}) => {
  return (
    

      
        
       

        


<Grid container >
  <Grid item xs={2.5} display="flex"
        justifyContent="center"
        alignItems="center" >
        <Box component="img" 
                      sx={{display: 'inline', width: '80%',
                            height: '90%'}}
                      src={`../../src/imagen/sin_imagen.png?w=100&fit=crop&auto=format`}/>
  </Grid>
  <Grid item  xs={9.5}>
    <Grid item  xs={9.5}>
    <Box  component="div" sx={{ ml:2,
                              height: 50,width:'100%'}} display="flex"
                              flexDirection = "column"
                              justifyContent = "end" > <Typography sx={{fontFamily: "Arimo", fontWeight:'bold', fontSize: 14}}>{nombre}</Typography> </Box>
    </Grid>
    <Grid item  xs={9.5}>
    <Box  component="div" sx={{  ml:2, width:'100%',
                              height: 50}} > <Typography sx={{fontFamily: "Arimo", fontSize: 14}}>{profesion}, {sucursal}</Typography> </Box>
    </Grid>
    <Grid item  xs={9.5}>
    <Box  component="div" sx={{  ml:2, width:'100%',
                              height: 50}} > <Typography sx={{fontFamily: "Arimo", fontSize: 14}}>{profesion}, {sucursal}</Typography> </Box>
    </Grid>
  </Grid>
  
</Grid>

        
  
  )
}
