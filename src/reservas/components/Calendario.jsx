import { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import { Grid, Button  } from '@mui/material';
import { useEffect } from "react";

export const Calendario = () => {
  const defaultValue = {
    year: new Date(new Date().toLocaleString('en', {timeZone: 'America/Santiago'})).getFullYear(),
    month: new Date(new Date().toLocaleString('en', {timeZone: 'America/Santiago'})).getMonth()+1,
    day: new Date(new Date().toLocaleString('en', {timeZone: 'America/Santiago'})).getDate(),
  };



  const ObtenerdiaDisponibles = () => {
    const x = [{ year: 2022, month: 10, day: 4, className: 'orangeDay' }];
    const y = { year: 2022, month: 10, day: 20, className: 'orangeDay' };
  
    console.log( new Date(2022, 10, 0).getDate());

    x.push(y);

    return x;
  }

  const diaDisponibles = ObtenerdiaDisponibles();

  const maxValue = {
    year: new Date(new Date().toLocaleString('en', {timeZone: 'America/Santiago'})).getFullYear()+1,
    month: new Date(new Date().toLocaleString('en', {timeZone: 'America/Santiago'})).getMonth()+1,
    day: new Date(new Date().toLocaleString('en', {timeZone: 'America/Santiago'})).getDate(),
  };



  const myCustomLocale = {
    // months list by order
    months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
    ],
  
    // week days by order
    weekDays: [
      {
        name: 'Lunes', // used for accessibility 
        short: 'L', // displayed at the top of days' rows        
      },
      {
        name: 'Martes',
        short: 'M',
      },
      {
        name: 'Miercoles',
        short: 'M',
      },
      {
        name: 'Jueves',
        short: 'J',
      },
      {
        name: 'Viernes',
        short: 'V',
      },
      {
        name: 'Sabado',
        short: 'S',
        isWeekend: true,
      },
      {
        name: 'Domingo',
        short: 'D',
        isWeekend: true,
      },
    ],
  
    // just play around with this number between 0 and 6
    weekStartingIndex: 6,
  
    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },
  
    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },
  
    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
  
    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },
  
    // texts in the date picker
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',
  
    // for input range value
    from: 'from',
    to: 'to',
  
  
    // used for input value when multi dates are selected
    digitSeparator: ',',
  
    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,
  
    // is your language rtl or ltr?
    isRtl: false,
  }

  const disabledDays = [
    {
      year: 2022,
      month: 10,
      day: 25,
    },
    {
      year: 2022,
      month: 10,
      day: 21,
    }
  ];

  const handleDisabledSelect = disabledDay => {
    console.log('Tried selecting a disabled day', disabledDay);
  };

  

  const [selectedDay, setSelectedDay] = useState(null);


  const onchangeCalendar = date => {
    setSelectedDay(date);
    console.log('Hello')
    console.log('Tried selecting a disabled day', date);
  };

  const changeCalendar = (event, date) => {
    console.log(date)

  };





  return (

    

    <Grid container
          spacing={3}
          sx = {{ marginTop: { xs: 5, md:5},
                  marginLeft: { xs: 3},
                  marginRight: { xs: 3}, 
                  marginBottom: { xs: 10, md:10},
                  width:{ xs: '90%'}}}
          direction = "column"
          alignItems = "center"
          alignSelf = "center"
          justifySelf = "center"
          justifyContent = "center">

        <Grid item 
              xs = {3} 
              sx = {{ width:{ xs:'100%', md: '30%'}}}>




<div onClick={changeCalendar}>
     
    <Calendar
      value={null}
      onChange={onchangeCalendar}
      disabledDays={disabledDays} // here we pass them
      onDisabledDayError={handleDisabledSelect} // handle error
      
      
      minimumDate={defaultValue}
      shouldHighlightWeekends
      maximumDate={maxValue}
       locale={myCustomLocale} 
      customDaysClassName={diaDisponibles}
    />
</div>
</Grid>
</Grid>
  );
    }