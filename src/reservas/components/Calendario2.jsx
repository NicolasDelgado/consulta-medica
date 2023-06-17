import { useState } from 'react';
import Calendar from 'react-calendar';
import { ListadoDisponibilidad } from './';
import { Grid  } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import { addDays, differenceInCalendarDays } from 'date-fns';

export const Calendario2 = () => {
  
    const [value, onChange] = useState(new Date());

    const [disponibilidad, setDisponibilidad] = useState(false);

    const disabledDates = [
        new Date(2022, 9, 10),
        new Date(2022, 9, 27),
      ];


  
    const now = new Date();
const tomorrow = addDays(now, 1);
const in3Days = addDays(now, 3);
const in5Days = addDays(now, 5);

const highlightedDates = [tomorrow, in3Days, in5Days];

console.log(disabledDates);

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

    const changeCalendar = (event, date) => {
        console.log(value)
    
      };

      function tileClassName({ date, view }) {
        if (
          view === 'month' &&
          disabledDates.find((dDate) => isSameDay(dDate, date))
        ) {
          return 'highlight';
        }else{
            if(new Date()<=date && new Date().getMonth()===date.getMonth() && new Date().getFullYear()===date.getFullYear()){
                var dt = new Date(date);
                const  currentDay = dt.getDay();
          
                const dateIsInWeekend = (currentDay === 6) || (currentDay === 0);
                
                if(!dateIsInWeekend){
                    return 'disponible';  
                }
                
                
            }
           
        }
      }

    return (
        <Grid container
        sx = {{ marginTop: { xs: 5, md:5},
                border:2,
                marginBottom: { xs: 10, md:10},
                width:{ xs: '100%'}}}
        direction = "column"
        alignItems = "center"
        alignSelf = "center"
        justifySelf = "center"
        justifyContent = "center">

      <Grid item 
            xs = {4} 
            sx = {{ width:{ xs:'100%', md: '50%'},border:2}}>
    <Calendar  value={value}
    minDate={new Date()}
    maxDate= {new Date(new Date().getFullYear()+1, new Date().getMonth(), new Date().getDate())}
    tileClassName={tileClassName}
    tileDisabled={({date, view}) =>
    (view === 'month') && // Block day tiles only
    disabledDates.some(disabledDate =>
      date.getFullYear() === disabledDate.getFullYear() &&
      date.getMonth() === disabledDate.getMonth() &&
      date.getDate() === disabledDate.getDate()
    )}
                onActiveStartDateChange={value => {
        console.log("value", value);        
      }}     onClickMonth={value => {
        console.log("value", value);        
      }}/>


      
  </Grid>

  
  { !disponibilidad &&<Grid item 
            xs = {7}  
            sx = {{border:2}}> <ListadoDisponibilidad />    </Grid>}


  </Grid>
  )
}
