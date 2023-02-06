import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import PersonalInfo from "./PersonalInfo";
import Address from "./Address";
import DemographicStats from "./DemographicStats";
import EmergencyContacts from "./EmergencyContacts";
import LearningBackground from "./LearningBackground";
import { useMediaQuery } from "@mui/material";
import styles from "./AcceptanceForm.module.css";
import { Formik, Form } from "formik";
import validationSchema from "./FormModel/validationSchema";
import formModel from "./FormModel/formModel";
import formInitialValues from "./FormModel/formInitialValues";
import axios from "axios";

// order of wizard steps
const steps = [
  "Personal Information",
  "Address",
  "Demographic Stats",
  "Emergency Contacts",
  "Learning Background",
];

// Formik form model properties
const { formId, formField } = formModel;

function Wizard({previousData}) {

  // wizard steps components switcher function
  function renderStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalInfo formField={formField} />;
      case 1:
        return <Address formField={formField} />;
      case 2:
        return <DemographicStats formField={formField} />;
      case 3:
        return <EmergencyContacts formField={formField} />;
      case 4:
        return <LearningBackground formField={formField} />;
      default:
        return <div>Not Found</div>;
    }
  }

  // if a user moved to at least the second step in filling out the form but hasn't completed
  // the entire form then upon the page reload it will show the step a user was interrupted at 
  // in all other cases it will show the first step of the form
  const [activeStep, setActiveStep] = useState((previousData && previousData.active_step >=0 && !previousData.is_completed) ? previousData.active_step + 1 : 0);

  // if the user previously completed filling out of at least one step then upon the page reload
  // the values they entered on the completed steps will be prepopulated those fields accordingly
  if (!previousData) {
    previousData = formInitialValues;
  }

  // picking a Yup validation block depends on the current step
  const currentValidationSchema = validationSchema[activeStep];

  // handler for the Back button of the stepper
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // handler for the Next and Submit button of the stepper
  async function submitForm(values, actions) {
    setActiveStep(activeStep + 1);
    actions.setTouched({});
    actions.setSubmitting(false);
    if (activeStep + 1 === steps.length) {
      axios.post("/api/acceptanceform", { body: {...values, active_step: activeStep, is_completed: true, completed_at: new Date() } });
    } else {
      axios.post("/api/acceptanceform", { body: {...values, active_step: activeStep} });
    }
  }

  const isSmallScreen = useMediaQuery("(max-width:700px)");

  return (
    <Box sx={{ width: "100%" }}>
      {/* Renders vertical stepper conditionally if a view port width is 700px or less */}
      {isSmallScreen && (
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                <StepContent
                  sx={{ "& .MuiGrid-container": { padding: "5px" } }}
                >
                  {activeStep < steps.length && (
                    <Fragment>
                      <Formik
                        enableReinitialize
                        initialValues={previousData}
                        validationSchema={currentValidationSchema}
                        onSubmit={submitForm}
                      >
                        {({ isSubmitting }) => (
                          <Form id={formId}>
                            {renderStepContent(activeStep)}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 2,
                              }}
                            >
                              <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                              >
                                Back
                              </Button>

                              <Box sx={{ flex: "1 1 auto" }} />

                              <Button disabled={isSubmitting} type="submit">
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </Button>
                              {isSubmitting && <CircularProgress size={24} />}
                            </Box>
                          </Form>
                        )}
                      </Formik>
                    </Fragment>
                  )}
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      )}

      {/* Renders submitting confirmation fragment conditionally on the last step if a view port width is 700px or less */}
      {isSmallScreen && activeStep === steps.length && (
        <Fragment>
          <Typography sx={{ my: 10 }} className={styles.titleForm}>
            <span className={styles.highlighted}>
              Your Acceptance Form has been submitted!
            </span>
          </Typography>
        </Fragment>
      )}

      {/* Renders horizontal stepper conditionally if a view port width is more than 700px */}
      {!isSmallScreen && (
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          orientation="horizontal"
        >
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
      )}

      {/* Renders step content before the last step conditionally if a view port width is more than 700px */}
      {!isSmallScreen && activeStep < steps.length && (
        <Fragment>
          <Formik
            enableReinitialize
            initialValues={previousData}
            validationSchema={currentValidationSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {renderStepContent(activeStep)}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>

                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button disabled={isSubmitting} type="submit">
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                  {isSubmitting && <CircularProgress size={24} />}
                </Box>
              </Form>
            )}
          </Formik>
        </Fragment>
      )}

      {/* Renders submitting confirmation fragment on the last step conditionally if a view port width is more than 700px */}
      {!isSmallScreen && activeStep === steps.length && (
        <Fragment>
          <Typography sx={{ my: 10 }} className={styles.titleForm}>
            <span className={styles.highlighted}>
              Your Acceptance Form has been submitted!
            </span>
          </Typography>
        </Fragment>
      )}
    </Box>
  );
}

export default Wizard;
