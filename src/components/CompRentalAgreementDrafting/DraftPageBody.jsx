import React from 'react'
import { useState } from 'react';
import MultiStepFormHandler from './MultiStepFormHandler.jsx'
import Footer from './Footer.jsx';
import { AiFillHome } from 'react-icons/ai';
import { GoChevronRight } from "react-icons/go"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(()=>({
    blueBgmFullWdth: {
        marginTop: '60px',
        width: '100%',
        height: '100%',
        //backgroundColor: '#4285F4',
        padding: '30px 0',
        background: 'white',
        // `linear-gradient(135deg, #4285F4, #0CAFFF)`
    },

    timeline:{
        marginLeft: '4vw',
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    twoRectBoxContainer: {
        //width: '90vw',
        height: '80vh',    //80
        marginTop: '40px',
        backgroundColor: '#fffff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 4vw',
        '@media (max-width: 800px)': {
            height: '180vh',
            display: 'flex', // Hide for screens smaller than 960px
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    },

    draftPreviewBox: {
        width: '40vw',
        minHeight: '80vh',
        backgroundColor: '#d8d8d8',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: 15,
        overflowY: 'hidden',
        '@media (max-width: 800px)': {
            width: '80vw',
            marginBottom: '20px',
            marginTop: '30px'
        },
    },
    progress: {
        width: '32vw',         
        height: '40px', 
        borderRadius: '5px',
        marginTop: '30px',
        position: 'relative',
        marginLeft: '4vw',
        '@media (max-width: 800px)': {
            width: '70vw',
            marginBottom: '20px',
            margin: '30px 15vw'
        },
    },
    progressBar: {
        height: '50%',
        borderRadius: '5px',
        transition: 'width 0.3s ease',
        '@media (max-width: 800px)': {
            width: '70vw',
            marginBottom: '20px',
        },
    },
    step: {
        position: 'absolute',
        height: '15px',
        width: '15px',
        borderRadius: '50%',
        backgroundColor: 'white',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    stepCompleted: {
        backgroundColor: 'green',
        border: '2px solid #4285F4',
    },
    stepLabelsContainer: {
        width: '30vw',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2px',
        marginLeft: '7vw',
        position: 'relative',
        '@media (max-width: 800px)': {
            width: '70vw',
            marginBottom: '20px',
            margin: '30px 15vw',
            marginTop: '-20px',
        },
    },
    stepLabel: {
        position: 'absolute',
        fontSize: '12px',
        color: 'white',
        top: '100%', // Position below the progress bar
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '5px',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    },
}));

const DraftPageBody = () => {
    const [currentStepData, setCurrentStepData] = useState(1);

    const handleStepData = (data) => {
        setCurrentStepData(data);
    };

    const getProgressWidth = () => {
        return `${(currentStepData / 5) * 100}%`;
    };

    const getStepPosition = (step) => {
        return `${(step - 1) * (100 / 3)}%`;
    };
    
    const steps = [
        { label: 'Landlord Details', position: 1 },
        { label: 'Tenant Details', position: 2 },
        { label: 'Property Details', position: 3 },
        { label: 'Agreement Details', position: 4 },
        { label: 'Additional', position: 5}
    ];

    const classes = useStyles();
  return (
    // style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: "30px"}}
    <div style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <div className={classes.blueBgmFullWdth}>
            <div className={classes.timeline}>
                <AiFillHome size={20} color='white'/>
                <span style={{paddingLeft: '8px', color: 'white'}}>Home</span>
                <GoChevronRight size={20} color='white' paddingLeft='4px'/>
                <span style={{paddingLeft: '8px', color: 'white'}}>Rental Agreement Drafting</span>
            </div>
            <div className={classes.progress}>
                <div className={classes.progressBar} style={{width: getProgressWidth()}}/>
                <div style={{width: '100%', padding: '0 10px'}}>
                    {steps.map((step) => (
                        <React.Fragment key={step.position}>
                        <div className={`${classes.step} ${currentStepData >= step.position ? classes.stepCompleted : ''}`} style={{ left: getStepPosition(step.position) }}/>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className={classes.stepLabelsContainer}>
                {steps.map((step) => (
                <div key={step.position} className={classes.stepLabel} style={{ left: getStepPosition(step.position) }}>
                    {step.label}
                </div>
                ))}
            </div>
            <MultiStepFormHandler classes={classes} currentStep={currentStepData} onStepDataChange={handleStepData}/>
        </div>
    </div>
  )
}

export default DraftPageBody;