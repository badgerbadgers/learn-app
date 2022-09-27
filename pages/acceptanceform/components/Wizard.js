
import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonalInfo from './PersonalInfo';
import Address from './Address';
import DemographicStats from './DemographicStats';
import EmergencyContacts from './EmergencyContacts';
import LearningBackground from './LearningBackground';
import { useMediaQuery } from '@mui/material';
import styles from './AcceptanceForm.module.css'

const steps = ['Personal Information', 'Address', 'Demographic Stats', 'Emergency Contacts', 'Learning Background'];

function renderStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalInfo />;
    case 1:
      return <Address />;
    case 2:
      return <DemographicStats />;
    case 3:
      return <EmergencyContacts />;
    case 4:
      return <LearningBackground />;
    default:
      return <div>Not Found</div>;
  }
}

function Wizard(props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isSmallScreen = useMediaQuery("(max-width:700px)");

  return (

    <Box sx={{ width: '100%' }}>

      {
        isSmallScreen &&
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                <StepContent sx={{ '& .MuiGrid-container': { padding: '5px', } }}>
                  {activeStep < steps.length && (
                    <Fragment>
                      {renderStepContent(activeStep)}
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                      </Box>
                    </Fragment>
                  )}
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      }
      {
        (isSmallScreen) && (activeStep === steps.length) && (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }} className={styles.titleForm}>
              <span className={styles.highlighted}>Your Acceptance Form has been submitted!</span>
            </Typography>
          </Fragment>
        )
      }

      {
        !isSmallScreen &&
        <Stepper activeStep={activeStep} orientation='horizontal'>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (

              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      }
      {
        (!isSmallScreen) && (activeStep === steps.length) &&
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }} className={styles.titleForm} >
            <span className={styles.highlighted}>Your Acceptance Form has been submitted!</span>
          </Typography>
        </Fragment>
      }
      {
        (!isSmallScreen) && (activeStep < steps.length) &&
        <Fragment>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Fragment>
      }

    </Box >

  );
}

export default Wizard;