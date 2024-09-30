import React from 'react'
import { makeStyles } from '@mui/styles';
import eDraftingLine from './assets/e-drafting_line.png'
import introImgNew from './assets/newIntroImg.png'

const useStyles = makeStyles(()=>({
    body: {
        marginTop: '60px',
        width: '90vw',
        height: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#f1dfd5',
        justifyContent:'space-between'
    },
    introBox: {
      padding:'40px 0 0 25px',
      height: '60vh',
      width:'100%',
      display: 'flex',
      flexDirection: 'row'
    },
    IntroTextBox:{
      flex: '1',
    },
    IntroImgBox:{
      flex: '1',
      display: 'flex',
      width:'50%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '2%'
    },
    draftingSection:{
      marginTop: '10vh',
      height: '50vh',
      width: '100%',
      backgroundColor: 'red',
    }
}));

const Body = () => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <div className={classes.introBox}>
        <div className={classes.IntroTextBox}>
          <div style={{marginTop:'75px'}}>
          <img src={eDraftingLine} alt='eDrafting' style={{width: '300px'}}/>
          <h5>The NextGen Legal Agreement Drafter from <span>LawCrats</span> at Your Desk</h5>
          <p>LawCrats is a forward-thinking firm that combines traditional legal expertise with 
            cutting-edge technology to provide comprehensive legal services. Our team of seasoned 
            lawyers is not only well-versed in the law but also possesses a deep understanding of 
            technology, which enables us to offer innovative solutions to our clients.</p>
        </div>
          </div>
        <div className={classes.IntroImgBox}>
          <img src={introImgNew} alt='introImage' style={{maxWidth:'420px', minWidth: '150px'}}/>
        </div>
      </div>
      <div className={classes.draftingSection}>

      </div>
    </div>
  )
}

export default Body