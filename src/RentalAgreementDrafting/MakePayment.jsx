import React from 'react'
import Header from '../components/CompRentalAgreementDrafting/Header.jsx'
import Body from '../components/CompRentalAgreementDrafting/Body.jsx';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(()=>({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fffff',
        alignItems: 'center',
        // position: 'fixed',
        overflowY: 'auto', 
        zIndex: '-1'
    }
}));

const MakePayment = () => {
  const classes = useStyles();
  return (
    <div>
        <Header/>
        <div className={classes.container}>
          <Body/>

        </div>
    </div>
  )
}

export default MakePayment;