import React from 'react'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(()=>({
    footer: {
        marginTop: '20vh',
        width: '100%',
        height: '40vh',
        backgroundColor: 'black',
    }
}))

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>Footer</div>
  )
}

export default Footer;