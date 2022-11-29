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

const steps = [
  "Personal Information",
  "Address",
  "Demographic Stats",
  "Emergency Contacts",
  "Learning Background",
];

const { formId, formField } = formModel;

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

function Wizard() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function submitForm(values, actions) {
    await sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
    console.log("Values", values);
  }

  const handleSubmit = (values, actions) => {
    if (activeStep === steps.length - 1) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

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
                        initialValues={formInitialValues}
                        validationSchema={currentValidationSchema}
                        onSubmit={handleSubmit}
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

      {/* Renders submission confirmation fragment conditionally on the last step if a view port width is 700px or less */}
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
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={handleSubmit}
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

      {/* Renders submission confirmation fragment on the last step conditionally if a view port width is more than 700px */}
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
