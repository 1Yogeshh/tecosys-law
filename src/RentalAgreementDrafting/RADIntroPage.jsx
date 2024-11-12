import React from 'react';
import Body from '../components/CompRentalAgreementDrafting/Body.jsx';
import Footer from '../components/CompRentalAgreementDrafting/Footer.jsx';
import Header from '../components/CompRentalAgreementDrafting/Header.jsx';
import { useNavigate } from "react-router-dom";
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
    },
    button: {
        margin: "20px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
}));


const RADIntroPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleButtonClickForRAD = () =>{
        navigate("/draft-data-input");
    }
    const handleButtonClickFornewRAD =() =>{
        navigate("/new-rad")
    }
  return (
    <div>
        <Header/>
        <div className={classes.container}>
            <Body />
            <button
            className={classes.button}
            onClick={handleButtonClickForRAD}
            >
            Create your own Rental Agreement
            </button>
            <button
            className={classes.button}
            onClick={handleButtonClickFornewRAD}
            >
            New frontend for RAD
            </button>
        </div>
    </div>
  )
}

export default RADIntroPage;