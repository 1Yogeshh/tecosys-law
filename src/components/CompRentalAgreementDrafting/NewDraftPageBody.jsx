import React from 'react'
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import NewMultiStepFormHandler from './NewMultiStepFormHandler';

const useStyles = makeStyles(()=>({
    blueBgmFullWdth: {
        width: '100vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: 'white'
    },
    
    twoRectBoxContainer: {
        backgroundColor: '#fffff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '@media (max-width: 800px)': {
            height: '180vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    },
    leftSideBox: {
        flex: '1',
        width: '55vw',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        height: '100%',
        //overflowY: 'auto',
        position: 'relative',
    },
    stepper: {
        marginTop: '20px',
        height: '15vh',
        width: '53vw',
    },
    userInputBox: {
        width: '100%',
        overflowY: 'auto', 
        maxHeight: '70vh',
        flex: '1',
    },
    iframeContainer: {
        flex: 1,
        width: '45vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'fixed',
        right: 5,
        top: 20,
        backgroundColor: '#eaeaea',
        boxSizing: 'border-box',
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },

    iframe: {
        width: '90%',
        height: '80%',
        border: 'none',
        marginTop: '20px',
        borderRadius: '4px',
        backgroundColor: 'white',
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    
    /* Bellow sections are for case step === 5 i.e additional details; the overall layout would be different from previous layout*/
    spclTwoRectBoxCont: {
        marginTop: '15px',
        backgroundColor: '#fffff',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 15px',
        '@media (max-width: 800px)': {
            height: '180vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    },
    additionalDataInputBox: {
        width: '65vw', // Adjust the width to complement previewAndBillingBox
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        maxHeight: '85vh',
        overflowY: 'auto',
        position: 'relative',
    },
    
    previewAndBillingBox: {
        width: '30vw', // Ensures it takes up the remaining space
        height: '85vh',
        border: '1px solid blue',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '20px',
        //backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'column',
    },
    rentPreviewBox: {
        position: 'relative', // Ensure this box is relative so the button can be absolutely positioned within it
        overflow: 'hidden',
        borderRadius: '8px',
        border: '1px solid black',
        backgroundColor: '#f1f1f1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        transition: 'opacity 0.3s ease',
        '&:hover': {
            opacity: 0.5,
        },
    },
    previewButton: {
        opacity: 1,
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        backgroundColor: 'red',
        transition: 'opacity 0.3s ease',
    },
    billingDetails: {
        fontSize: '14px',
        fontFamily: 'Open Sans',
        fontColor: '#7F7F7F',
        fontWeight: '600',
    }
}));

const NewDraftPageBody = () => {
  const classes = useStyles();
  const [currentStepData, setCurrentStepData] = useState(1);

    const handleStepData = (data) => {
        setCurrentStepData(data);
    };
    
    const steps = [
        { label: 'Landlord Details', position: 1 },
        { label: 'Tenant Details', position: 2 },
        { label: 'Property Details', position: 3 },
        { label: 'Agreement Details', position: 4 },
        { label: 'Additional', position: 5}
    ];
  return (
    <div>
        <NewMultiStepFormHandler classes={classes} currentStep={currentStepData} onStepDataChange={handleStepData}/>
    </div>
  )
}

export default NewDraftPageBody;