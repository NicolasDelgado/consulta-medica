import { Routes,Route, Navigate } from "react-router-dom"
import { LoginPage } from '../auth'
import { PrincipalApp } from "../reservas/pages";
import { getEnvVariables } from "../helpers";
import  { store } from '../store'
import { Provider } from 'react-redux';

export const AppRouter = () => {
  
  const authStatus = 'authenticated' //'authenticated','not-authenticated';

  console.log(getEnvVariables())
  
  return (
    <Provider store={store}>
    <Routes>
      {
        (authStatus === 'not-authenticated')?
          <Route path='/auth/*' element={<LoginPage/>} />:
          <Route path='/*' element={<PrincipalApp/>} />
      }
      
      {/*<Route path='/*' element={<Navigate to='/auth/login'/>} />*/}
    </Routes>
    </Provider>
  )
}
