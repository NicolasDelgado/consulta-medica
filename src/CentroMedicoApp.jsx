import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"

export const CentroMedicoApp = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}
