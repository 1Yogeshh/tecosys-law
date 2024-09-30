import React, { useState, useEffect } from 'react';
import { Input } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(()=>({
  formContainer: {
    width: '50vw',     //50vw
    minHeight: '80vh',   //80vh
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
}));

const LandlordDetails = ({ nextStep, onThisStepDataStream, initialData }) => {
  const classes = useStyles();
  const [landlordType, setLandlordType] = useState('Individual');
  const [no_of_landlords, setNoOfLandlords] = useState('1');
  console.log("Initial Data:", initialData);
  const [details, setDetails] = useState({
    ...initialData,
    landlordType: initialData.landlordType || 'Individual',
    no_of_landlords: initialData.no_of_landlords || '1',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedDetails = { ...details };
    
    if (name === 'landlordType') {
      setLandlordType(value);
      updatedDetails = { ...updatedDetails, landlordType: value };
    } else if (name === 'no_of_landlords') {
      setNoOfLandlords(value);
      updatedDetails = { ...updatedDetails, no_of_landlords: value };
      for (let i = 1; i <= value; i++) {
        updatedDetails[`ll_name_${i}`] = '';
        updatedDetails[`ll_age_${i}`] = '';
        updatedDetails[`ll_address_${i}`] = '';
        updatedDetails[`ll_aadharNo_${i}`] = '';
      }
    }
    else{
      updatedDetails = { ...details, [name]: value };
    }
    setDetails(updatedDetails);
    onThisStepDataStream(updatedDetails);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(details);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <div className={classes.flexRowDoubleContent}>
        <label className={classes.label}>
          Landlord Type:
          <Select name="landlordType" value={details.landlordType} onChange={handleChange} className={classes.select}>
            <MenuItem value="Individual">Individual</MenuItem>
            <MenuItem value="Company">Company</MenuItem>
            <MenuItem value="Partnership Firm">Partnership Firm</MenuItem>
          </Select>
        </label>
        {landlordType === 'Individual' && (
          <label className={classes.label}>
            Select Number of Landlord(s):
            <Select name="no_of_landlords" value={details.no_of_landlords} onChange={handleChange} className={classes.select}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          </label>
        )}
      </div>

      {landlordType === 'Individual' && Array.from({ length: parseInt(no_of_landlords, 10) }).map((_, index) => (
        <div key={index}>
          {no_of_landlords !== '1' && (
            <div className={classes.centeredHeaderLineBothSide}>
              <hr className={classes.hrLeft} />
              <span 
                style={{
                  fontSize: '15px', 
                  fontStyle: 'italic', 
                  color: '#007bff', 
                  alignItems: 'center'
                }}>
                Details of Landlord {index + 1}
              </span>
              <hr className={classes.hrRight} />
            </div>
          )}
          <label className={classes.label}>Name of Landlord {no_of_landlords === '1' ? '' : index+1}:</label>
          <Input
            type="text"
            name={`ll_name_${index + 1}`}
            value={details[`ll_name_${index + 1}`] || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Name as on Aadhar Card'
          />

          <label className={classes.label}>Age of Landlord {no_of_landlords === '1' ? '' : index+1}:</label>
          <Input
            type="text"
            name={`ll_age_${index + 1}`}
            value={details[`ll_age_${index + 1}`] || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Based on your Aadhar Card'
          />

          <label className={classes.label}>Address of Landlord {no_of_landlords === '1' ? '' : index+1}:</label>
          <Input
            type="text"
            name={`ll_address_${index + 1}`}
            value={details[`ll_address_${index + 1}`] || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Full Address with Pin Code'
          />

          <label className={classes.label}>Aadhar Number of Landlord {no_of_landlords === '1' ? '' : index+1}:</label>
          <Input
            type="text"
            name={`ll_aadharNo_${index + 1}`}
            value={details[`ll_aadharNo_${index + 1}`] || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='12 Digit Unique Number'
          />
        </div>
      ))}

      {landlordType === 'Company' && (
        <>
          <label className={classes.label}>Company Name:</label>
          <Input
            type="text"
            name="ll_companyName"
            value={details.ll_companyName || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Company Registered Name'
          />

          <label className={classes.label}>Number of Officials for Signature:</label>
          <Input
            type="number"
            name="ll_numberOfCO"
            value={details.ll_numberOfCO || ''}
            onChange={handleChange}
            className={classes.input}
          />

          <label className={classes.label}>Registered Address:</label>
          <Input
            type="text"
            name="ll_CompanyAddress"
            value={details.ll_CompanyAddress || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Full Address with Pin Code'
          />

          <label className={classes.label}>Company Registration Number(CRN):</label>
          <Input
            type="text"
            name="ll_crn"
            value={details.ll_crn || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Unique 21 Digit Number'
          />
        </>
      )}

      {landlordType === 'Partnership Firm' && (
        <>
          <label className={classes.label}>Firm Name:</label>
          <Input
            type="text"
            name="ll_firmName"
            value={details.ll_firmName || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Enter Firms Name'
          />

          <label className={classes.label}>Number of Officials for Signature:</label>
          <Input
            type="number"
            name="ll_numberOfPFO"
            value={details.ll_numberOfPFO || ''}
            onChange={handleChange}
            className={classes.input}
          />

          <label className={classes.label}>Registered Address:</label>
          <Input
            type="text"
            name="ll_firmAddress"
            value={details.ll_firmAddress || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Full Address with Pin Code'
          />

          <label className={classes.label}>Partnership Registration Number(DPIN):</label>
          <Input
            type="text"
            name="ll_prn"
            value={details.ll_prn || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Unique 10 Digits Number'
          />
        </>
      )}

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
        <Button variant='contained' onClick={handleSubmit}>Next</Button>
      </div>
    </form>
  );
};

export default LandlordDetails;
