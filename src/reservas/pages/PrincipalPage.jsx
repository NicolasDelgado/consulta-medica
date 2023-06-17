import { Box, Divider, Grid } from '@mui/material'
import { LoginPage } from '../../auth'
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { FormularioRegistroPaciente, FormularioRestablecerPassword, FormularioReservas, NavBar } from './../components';

import NabarDrawer from '../../admin/components/NabarDrawer';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useAuthStore } from '../../hook';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const PrincipalApp = () => {
  const styles = {
    flex: {
      flex: 1,
    },
  };
  
  
  const {status} = useAuthStore();  
  console.log(status);

  return (
    
    <Box sx={styles.flex}>
      <CssBaseline />
      <NavBar  />
      <Divider />

      {
        (status === 'checking')?
      <Grid container spacing={2}  >
  <Grid item xs={2}  sx = {{ 
                border:2}}>
  <NabarDrawer />
  </Grid>
  <Grid item xs={10}  sx = {{ 
                border:2}}>
  <Routes>
        <Route path='/' element={<FormularioReservas />}/>
        <Route path='/registro-cuenta' element={<FormularioRegistroPaciente />}/>
        <Route path='/restablecer-cuenta' element={<FormularioRestablecerPassword />}/>        
        <Route path='/auth/login' element={<LoginPage />}/>
      </Routes>
  </Grid></Grid>:<Routes>
        <Route path='/' element={<FormularioReservas />}/>
        <Route path='/registro-cuenta' element={<FormularioRegistroPaciente />}/>
        <Route path='/restablecer-cuenta' element={<FormularioRestablecerPassword />}/>        
        <Route path='/auth/login' element={<LoginPage />}/>
      </Routes>

      }
 

      
      
     
      
    </Box>
    
    
  )
}
