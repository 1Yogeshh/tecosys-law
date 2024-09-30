import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';



const useStyles = makeStyles(()=>({
  formContainer: {
    width: '65vw',
    minHeight: '80vh',
    margin: 'auto',
    padding: 15,
    // border: '1px solid #ddd',
    // borderRadius: 8,
    // boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'space-between', // Space between form content and button
    position: 'relative',
    // backgroundColor: 'red',
    overflowY: 'auto',
    '@media (max-width: 800px)': {
        width: '80vw',
        marginBottom: '20px',
    },
  },
  flexRowDoubleContent:{
    display: 'flex', 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    display: 'block',
    color: '#464646',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: 15,
    border: '1px solid #ccc',
    borderRadius: 4,
    boxSizing: 'border-box',
    fontSize: 16,
  },
  select: {
    marginTop: '5px',
    width: '100%',
    padding: '12px',
    marginBottom: 15,
    border: '1px solid #ccc',
    borderRadius: 4,
    boxSizing: 'border-box',
    fontSize: 16,
  },
  heading: {
    fontSize: '28px',
    fontWeight: '400',
    fontFamily: "Open Sans",
  }
}));

const AdditionalDetails = ({finalDataCollection, prevStep, onSaved}) => {
  const [details, setDetails] = useState({});
  const [eSignWithStamp, setESignWithStamp] = useState(false);
  const [eStump, setEStamp] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState(null);

  const handleChange = (e) =>{
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsSaved(true);
    finalDataCollection(details);
    if (onSaved) onSaved(true);
  }

  const handleEstamp = () => {
    setEStamp(true);
    setESignWithStamp(false);
    setDetails({ ...details, eSignWithStamp: false })
  };

  const handleESignClick = () =>{
    setESignWithStamp(true);
    setEStamp(false);
    setDetails({ ...details, eSignWithStamp: true })
  }
  const handleStampChange = (e) => {
    setSelectedStamp(e.target.value);
    setDetails({ ...details, [e.target.name]: e.target.value })
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <div className={classes.heading}>You're almost there...</div>
      <hr/>
        <Button variant='contained' disabled>Generate Agreement</Button>
      {/* </div> */}
    </form>
  )
}

export default AdditionalDetails;