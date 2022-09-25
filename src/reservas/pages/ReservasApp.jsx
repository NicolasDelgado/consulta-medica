import { Box, Divider } from '@mui/material'
import { LoginPage } from '../../auth'
import { HeaderApp } from './HeaderApp'
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { RegistroApp, RestablecerApp } from './';



export const ReservasApp = () => {
  const styles = {
    flex: {
      flex: 1,
    },
  };
  
  
  return (
 
    <Box sx={styles.flex}>
      <CssBaseline />
      <HeaderApp  />
      <Divider />
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/registro-cuenta' element={<RegistroApp />}/>
        <Route path='/restablecer-cuenta' element={<RestablecerApp />}/>
      </Routes>
    </Box>

      
    
    
  )
}
