import React from 'react'
import Header from '../components/CompRentalAgreementDrafting/Header.jsx'
import NewDraftPageBody from '../components/CompRentalAgreementDrafting/NewDraftPageBody.jsx'
import Footer from '../components/CompRentalAgreementDrafting/Footer.jsx';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(()=>({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        alignItems: 'center', 
        zIndex: '0',
        marginTop: '60px',
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'fixed',
        '@media (max-width: 800px)': {
            height: '100vh',
            width: '100vw',
            overflowX: 'hidden'
        },
    }
}));

const NewDraftDataInput = () => {
  const classes = useStyles();
  return (
    <div>
        <Header/>
        <div className={classes.container}>
            <NewDraftPageBody/>
        </div>
    </div>
  )
}

export default NewDraftDataInput;