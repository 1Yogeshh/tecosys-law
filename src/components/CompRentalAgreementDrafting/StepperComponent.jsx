import React, { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Landlord', 'Tenant', 'Property', 'Agreement'];

const StepperComponent = ({ currentStep }) => {
  return (
    <div className="stepper">
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepperComponent;
