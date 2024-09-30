import React from 'react'
import Header from '../components/CompRentalAgreementDrafting/Header.jsx'
import DraftPageBody from '../components/CompRentalAgreementDrafting/DraftPageBody.jsx'
import Footer from '../components/CompRentalAgreementDrafting/Footer.jsx';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(()=>({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        overflowY: 'auto', 
        zIndex: '-1',
        '@media (max-width: 800px)': {
            height: '100vh',
            width: '100vw',
            overflowX: 'hidden'
        },
    }
}));

const DraftDataInput = () => {
  const classes = useStyles();
  return (
    <div>
        <Header/>
        <div className={classes.container}>
            <DraftPageBody/>
        </div>
    </div>
  )
}

export default DraftDataInput;