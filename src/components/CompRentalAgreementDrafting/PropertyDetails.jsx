import React, {useState} from 'react'
import { Switch, TextField, Tooltip, Input } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(()=>({
  formContainer: {
    width: '50vw',
    minHeight: '80vh',
    margin: 'auto',
    padding: 15,
    border: '1px solid #ddd',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Space between form content and button
    position: 'relative',
    backgroundColor: 'white',
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
    marginBottom: 8,
    display: 'block',
    color: '#464646',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: 18,
    border: '1px solid #ccc',
    borderRadius: 4,
    boxSizing: 'border-box',
    fontSize: 16,
  },
  select: {
    marginTop: '5px',
    width: '100%',
    padding: '12px',
    marginBottom: 18,
    border: '1px solid #ccc',
    borderRadius: 4,
    boxSizing: 'border-box',
    fontSize: 16,
  },
  button: {
    padding: '5px 10px',
    borderRadius: '3px',
    fontSize: '16px',
    fontWeight: 400,
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  hrLeft:{
    flex: 1,
    border: '0',
    borderTop: '1px solid #007bff',
    marginRight: '10px'
  },
  hrRight:{
    flex: 1,
    border: '0',
    borderTop: '1px solid #007bff',
    marginLeft: '10px'
  },
  centeredHeaderLineBothSide:{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    marginBottom: 18,
    border: '1px solid #ccc',
    borderRadius: 4,
    boxSizing: 'border-box',
    fontSize: 16,
  }
}));

const PropertyDetails = ({nextStep, prevStep, onThisStepDataStream, initialData}) => {
  const [details, setDetails] = useState({
    ...initialData,
    propertyType: initialData.propertyType || "Residential",
    property_name: initialData.property_name || "",
    property_address: initialData.property_address || "",
    property_state: initialData.property_state || "",
    list_of_goods: initialData.list_of_goods || "",
  });

  const handleChange = (e) =>{
    const { name, value } = e.target;
    let updatedDetails = { ...details };
    
    if(name === "propertyType"){
      updatedDetails = {...updatedDetails, propertyType: value};
    }
    else if(name === "property_state"){
      updatedDetails = {...updatedDetails, property_state: value};
    }
    else{
      updatedDetails = {...updatedDetails, [name]: value};
    }
    setDetails(updatedDetails);
    onThisStepDataStream(updatedDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting details: ", details); // Log details before passing to nextStep
    nextStep(details);
  };
  
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <label className={classes.label}>Property Name:</label>
      <Input 
        type="text" 
        name="property_name" 
        placeholder="Flat No.<Number> <Property Name>" 
        onChange={handleChange} 
        className={classes.input} 
      />
      <label className={classes.label}>Property Type:
        <Select value={details.propertyType} onChange={handleChange} className={classes.select} >
          <MenuItem value="Residential">Residential</MenuItem>
          <MenuItem value="Office">Office</MenuItem>
          <MenuItem value="Hotel">Hotel</MenuItem>
        </Select>
      </label>
      <label className={classes.label}>Property Address:</label>
      <Input
        type="text" 
        name="property_address" 
        placeholder="Full Address with Pin" 
        onChange={handleChange} 
        className={classes.input} 
      />
      
      <label className={classes.label}>
        Select the Property State:
        <Select name="property_state" value={details.property_state} onChange={handleChange} className={classes.select}>
            <MenuItem value="">Select a State</MenuItem>
            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
            <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
            <MenuItem value="Assam">Assam</MenuItem>
            <MenuItem value="Bihar">Bihar</MenuItem>
            <MenuItem value="Chandigarh">Chandigarh</MenuItem>
            <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
            <MenuItem value="Delhi">Delhi</MenuItem>
            <MenuItem value="Goa">Goa</MenuItem>
            <MenuItem value="Gujarat">Gujarat</MenuItem>
            <MenuItem value="Haryana">Haryana</MenuItem>
            <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
            <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
            <MenuItem value="Jharkhand">Jharkhand</MenuItem>
            <MenuItem value="Karnataka">Karnataka</MenuItem>
            <MenuItem value="Kerala">Kerala</MenuItem>
            <MenuItem value="Ladakh">Ladakh</MenuItem>
            <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
            <MenuItem value="Manipur">Manipur</MenuItem>
            <MenuItem value="Meghalaya">Meghalaya</MenuItem>
            <MenuItem value="Mizoram">Mizoram</MenuItem>
            <MenuItem value="Nagaland">Nagaland</MenuItem>
            <MenuItem value="Odisha">Odisha</MenuItem>
            <MenuItem value="Puducherry">Puducherry</MenuItem>
            <MenuItem value="Punjab">Punjab</MenuItem>
            <MenuItem value="Rajasthan">Rajasthan</MenuItem>
            <MenuItem value="Sikkim">Sikkim</MenuItem>
            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
            <MenuItem value="Telangana">Telangana</MenuItem>
            <MenuItem value="Tripura">Tripura</MenuItem>
            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
            <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
            <MenuItem value="West Bengal">West Bengal</MenuItem>
        </Select>
      </label>
      
      <label className={classes.label}>Enter List Of Goods:</label>
      <TextField
        name="list_of_goods"
        onChange={handleChange}
        placeholder="e.g. 1 X Refrigerator, 2 X Washing Machines"
        className={classes.textarea}
        multiline
        rows={5}
      />
      
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '15px'}}>
        <Button variant='contained' onClick={prevStep} >Previous</Button>
        <Button variant='contained' onClick={handleSubmit}>Next</Button>
      </div>
    </form>
  )
}

export default PropertyDetails;