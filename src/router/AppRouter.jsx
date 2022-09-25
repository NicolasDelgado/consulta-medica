import { Routes,Route, Navigate } from "react-router-dom"
import { LoginPage } from '../auth'
import { ReservasApp } from "../reservas/pages";

export const AppRouter = () => {
  
  const authStatus = 'authenticated' //'authenticated','not-authenticated';
  
  return (
    <Routes>
      {
        (authStatus === 'not-authenticated')?
          <Route path='/auth/*' element={<LoginPage/>} />:
          <Route path='/*' element={<ReservasApp/>} />
      }
      
      {/*<Route path='/*' element={<Navigate to='/auth/login'/>} />*/}
    </Routes>
  )
}
