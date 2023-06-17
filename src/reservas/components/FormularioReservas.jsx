import { Box, Button, Typography ,Grid, Stepper, Step, StepLabel }  from '@mui/material';
import { useState } from 'react';
import NabarDrawer from '../../admin/components/NabarDrawer';
import { FormularioEspecialidad, Calendario2 } from './';

const steps = [
    'Búsqueda Área',    
    'Buscar Horas Disponibles',
    'Datos Del Paciente',
  ];

export const FormularioReservas = () => {
  
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    

    <Grid container
         
          sx = {{ marginTop: { xs: 5, md:5},
                  
                  marginBottom: { xs: 10, md:10},
                  width:{ xs: '100%'}}}
          direction = "column"
          alignItems = "center"
          alignSelf = "center"
          justifySelf = "center"
          justifyContent = "center">

        <Grid item 
              xs = {2} 
              sx = {{ width:{ xs:'100%', md: '50%'}}}>
    <Box sx={{ width: '100%', border:2 }}>
      <Stepper  sx={{
          '& .MuiStepLabel-root .Mui-completed': {
            color: 'secondary.dark', // circle color (COMPLETED)
          },
          '& .MuiStepLabel-label.MuiStepLabel-active': {
            color: 'green'
        },
          '& .MuiStepLabel-root .Mui-active': {
            color: 'secondary.main', // circle color (ACTIVE)
            textDecorationColor: 'red',
            

          },
        }} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel sx ={{color: 'red'}} {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          


            {(() => {
              switch (activeStep+1) {
                case 1:
                  return <FormularioEspecialidad/>;
                  break;
                case 2:
                  return <Calendario2 />;
                  break;
                default:
                  break;
              }

            })()}
            

     
          
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ textTransform: 'none'}}>
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1, textTransform: 'none'}}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext} sx={{ textTransform: 'none'}}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </>
      )}
    </Box>
    </Grid>
    </Grid>
  );
}
