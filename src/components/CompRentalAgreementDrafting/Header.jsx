// eslint-disable-next-line no-unused-vars
import React from 'react'
import eDraftingLogo from './assets/e-drafting_logo.png'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(()=>({
    header: {
        height:'60px', 
        backgroundColor:'white', 
        // #f1dfd5
        display:'flex', 
        flex:'row', 
        justifyContent: 'space-between', 
        alignItems:'center',
        position: 'fixed',
        width: '100%',
        zIndex: '50',
        top: '0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    
    },
    logoSection: {
        paddingLeft:'50px'
    },
    headerContentLeft: {
        display: 'flex',
        flex: 'row',
        width: '120px',
        justifyContent: 'space-between',
        marginRight: '7vw'
    },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
        <div className={classes.logoSection}>
            <img src={eDraftingLogo} alt='eDraftingLogo' style={{maxWidth:'250px', minWidth: '120px'}}/>
        </div>
        <div className={classes.headerContentLeft}>
            <span>Sign Up</span>
            <span>Log In</span>
        </div>
    </div>
  )
}

export default Header