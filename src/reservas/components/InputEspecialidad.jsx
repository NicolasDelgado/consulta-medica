import { useState } from 'react'
import { especialidades } from '../data/especialidades';
import { FormControl, InputLabel, Select,MenuItem } from '@mui/material';


export const InputEspecialidad = () => {
    const [especialidad, setEspecialidad] = useState('');

    const eventoCambioEspecialidad = (event) => {
        setEspecialidad(event.target.value);
    };
    
    return (
        <FormControl fullWidth  sx = {{marginTop: 2}}>
    
            <InputLabel id="demo-simple-select-label">Especialidad</InputLabel>

            <Select labelId = "demo-simple-select-label"
                    id = "demo-simple-select"
                    value = { especialidad }
                    label = "Especialidad"   
                    onChange = { eventoCambioEspecialidad }>
            {
                especialidades.map(esp => (
                <MenuItem key = { esp.id } 
                            value = { esp.id }> { esp.descripcion } </MenuItem>    
                ))  
            }
            </Select>

        </FormControl>
      )
}
