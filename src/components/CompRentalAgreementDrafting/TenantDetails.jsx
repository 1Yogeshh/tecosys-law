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
}));

const TenantDetails = ({nextStep, prevStep, onThisStepDataStream, initialData}) => {
  const [tenantType, setTenantType] = useState('Individual');
  const [no_of_tenants, setNoOfTenants] = useState('1');
  const [details, setDetails] = useState({
    ...initialData,
    tenantType: initialData.tenantType || "Individual",
    no_of_tenants: initialData.no_of_tenants || '1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedDetails = { ...details };
    if (name === 'tenantType') {
      setTenantType(value);
      setDetails({});
    } else if (name === 'no_of_tenants') {
      setNoOfTenants(value);
      updatedDetails = { ...details, no_of_tenants: value };
      for (let i = 1; i <= value; i++) {
        updatedDetails[`tenant_name_${i}`] = '';
        updatedDetails[`tenant_age_${i}`] = '';
        updatedDetails[`tenant_address_${i}`] = '';
        updatedDetails[`tenant_aadharNo_${i}`] = '';
      }
    }
    else{
      updatedDetails = { ...details, [name]: value };
    }
    setDetails(updatedDetails);
    onThisStepDataStream(updatedDetails);
  };

  // const handleChange = (e) => {
  //   setDetails({ ...details, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting details: ", details);
    nextStep(details);
  };
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <div className={classes.flexRowDoubleContent}>
        <label className={classes.label}>
          Tenant Type:
          <Select name='tenantType' value={tenantType} onChange={handleChange} className={classes.select} >
            <MenuItem value="Individual">Individual</MenuItem>
            <MenuItem value="Company">Company</MenuItem>
            <MenuItem value="Partnership Firm">Partnership Firm</MenuItem>
          </Select>
        </label>
        {tenantType === 'Individual' && (
          <label className={classes.label}>
            Select Number of Tenant(s):
            <Select name="no_of_tenants" value={no_of_tenants} onChange={handleChange} className={classes.select}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          </label>
        )}
      </div>

      {tenantType === 'Individual' && Array.from({ length: parseInt(no_of_tenants, 10) }).map((_, index) => (
        <div key={index}>
        {no_of_tenants!== '1' &&
          (<div className={classes.centeredHeaderLineBothSide}>
            <hr className={classes.hrLeft}/>
            <span style={{fontSize: '15px', fontStyle: 'italic', color: '#007bff', alignItems: 'center'}}>Details of Tenant {index+1}</span>
            <hr className={classes.hrRight}/>
          </div>)
        }
          <label className={classes.label}>Name of Tenant {no_of_tenants==='1' ? '' : index+1}:</label>
          <Input
            type="text"
            name={`tenant_name_${index + 1}`}
            value={details[`tenant_name_${index + 1}`] || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Name as on Aadhar Card'
          />

          <label className={classes.label}>Age of Tenant {no_of_tenants==='1' ? '' : index+1}:</label>
          <Input
            type="number"
            name={`tenant_age_${index + 1}`}
            value={details[`tenant_age_${index + 1}`] || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Based on your Aadhar Card'
          />

          <label className={classes.label}>Address of Tenant {no_of_tenants==='1' ? '' : index+1}:</label>
          <Input
            type="text"
            name={`tenant_address_${index + 1}`}
            value={details[`tenant_address_${index + 1}`] || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='Full Address with Pin Code'
          />

          <label className={classes.label}>Aadhar Number of Tenant {no_of_tenants==='1' ? '' : index+1}:</label>
          <Input
            type="text"
            name={`tenant_aadharNo_${index + 1}`}
            value={details[`tenant_aadharNo_${index + 1}`] || ''}
            onChange={handleChange}
            className={classes.input}
            placeholder='12 Digit Unique Number'
          />
        </div>
      ))}
      {tenantType === 'Company' && (
        <>
          <label className={classes.label}>Company Name:</label>
          <Input type="text" name="tenant_companyName" onChange={handleChange} className={classes.input} placeholder='Company Registered Name' />
          
          <label className={classes.label}>Number of Officials for Signature:</label>
          <Input type="number" name="tenant_numberOfCO" onChange={handleChange} className={classes.input} />

          <label className={classes.label}>Registered Address:</label>
          <Input type="text" name="tenant_CompanyAddress" onChange={handleChange} className={classes.input} placeholder='Full Address with Pin Code' />

          <label className={classes.label}>Company Registration Number(CRN):</label>
          <Input type="text" name="tenant_crn" onChange={handleChange} className={classes.input} placeholder='Unique 21 Digit Number' />
        </>
      )}

      {tenantType === 'Partnership Firm' && (
        <>
          <label className={classes.label}>Firm Name:</label>
          <Input type="text" name="tenant_firmName" onChange={handleChange} className={classes.input} />

          <label className={classes.label}>Number of Officials for Signature:</label>
          <Input type="number" name="tenant_numberOfPFO" onChange={handleChange} className={classes.input} />

          <label className={classes.label}>Registered Address:</label>
          <Input type="text" name="tenant_firmAddress" onChange={handleChange} className={classes.input} placeholder='Full Adress with Pin Code' />

          <label className={classes.label}>Partnership Registration Number(DPIN):</label>
          <Input type="text" name="tenant_prn" onChange={handleChange} className={classes.input} placeholder='Unique 10 Digits Number'/>
        </>
      )}
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button variant='contained' onClick={prevStep} >Previous</Button>
        <Button variant='contained' onClick={handleSubmit}>Next</Button>
      </div>
    </form>
  )
}

export default TenantDetails;