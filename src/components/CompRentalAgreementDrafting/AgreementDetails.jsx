import React, { useState } from 'react'
import { Switch, TextField, Tooltip, Input, getInputUtilityClass, colors } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const useStyles = makeStyles(() => ({
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
    width: '22vw',
    padding: '10px',
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
  clauseContainer: {
    display: 'flex',
    overflowX: 'auto',
    padding: '5px 0',
    scrollbarWidth: 'none', // Hide scrollbar for Firefox
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  rowLayoutInput: {
    width: '22vw',
    padding: '12px',
    marginBottom: 15,
    border: '1px solid #ccc',
    borderRadius: 4,
    boxSizing: 'border-box',
  },
  clause: {
    minWidth: '30vw',
    height: '18vh',
    marginRight: 10,
    backgroundColor: '#f1f1f1',
    border: '1px solid #ccc',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    boxSizing: 'border-box',
  },
  clauseHeading: {
    fontWeight: '600',
    fontSize: '16',
    // padding: '6px',
    color: '#464646',
  },
  clauseText: {
    textAlign: 'justyfy',
    fontSize: 10,
    // padding: '6px',
    overflowWrap: 'break-word',
    textJustify: 'inter-word'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    marginBottom: 18,
    border: '1px solid #ccc',
    borderRadius: 4,
    boxSizing: 'border-box',
    fontSize: 16,
  },
  clauseStackContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  clauseItem: {
    backgroundColor: '#eaeaea',
    borderRadius: '4px',
    padding: '8px',
    position: 'relative',
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f1f1f1',
      transition: 'opacity 0.3s ease',
    },
    '&:hover $deleteIcon': {
      opacity: 1,
      transition: 'opacity 0.3s ease',
    },
  },
  deleteIcon: {
    position: 'absolute',
    opacity: 0,
    zIndex: 2,
  },
}));

const AgreementDetails = ({ nextStep, prevStep, onThisStepDataStream, initialData, onSubmit }) => {
  const [details, setDetails] = useState({
    ...initialData,
    isCustomClause: initialData.isCustomClause || false,
    rent_day: initialData.rent_day || '',
    agreement_period: initialData.agreement_period || '',
    miscellaneous_clause: initialData.miscellaneous_clause || [],
    customClause: initialData.customClause || [],
  });
  const [selectedClauses, setSelectedClauses] = useState([]);
  const [isCustomClause, setIsCustomClause] = useState(false);
  const [currentClauseText, setCurrentClauseText] = useState('');
  const [isSaved, setIsSaved] = useState(false);


  const handleChange = (e, clause = null) => {
    const { name, value, type, checked } = e.target;
    let updatedDetails = { ...details };
  
    if (name === "miscellaneous_clause" && clause) {
      let updatedClauses = [...selectedClauses];
      if (checked) {
        updatedClauses.push(clause);
      } else {
        updatedClauses = selectedClauses.filter(c => c.heading !== clause.heading);
      }
      setSelectedClauses(updatedClauses);
      updatedDetails = { ...updatedDetails, miscellaneous_clause: updatedClauses };
    } 
    else if (name === "isCustomClause") {
      setIsCustomClause(checked);
      updatedDetails = { ...updatedDetails, isCustomClause: checked };
    } 
    else {
      updatedDetails = { ...updatedDetails, [name]: value };
    }
  
    setDetails(updatedDetails);
    onThisStepDataStream(updatedDetails);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    // setIsSaved(true);
    // if (onSubmit){
    //   onSubmit(true);
    //   nextStep(details);
    // } 
    nextStep(details);
  };


  const handleCustomClauseChange = (e) => {
    setCurrentClauseText(e.target.value);
  };

  const addCustomClause = () => {
    if (currentClauseText.trim() !== '') {
      const newCustomClauses = [...details.customClause, currentClauseText];
      const updatedDetails = { ...details, customClause: newCustomClauses };
      
      setDetails(updatedDetails);
      onThisStepDataStream(updatedDetails);
      
      setCurrentClauseText('');
    }
  };
  
  const deleteClause = (index) => {
    const newCustomClauses = details.customClause.filter((_, i) => i !== index);
    const updatedDetails = { ...details, customClause: newCustomClauses };
    
    setDetails(updatedDetails);
    onThisStepDataStream(updatedDetails);
  };
  
  const clauses = [
    { heading: 'Electricity Charges', text: 'The Tenant shall be solely responsible for the payment of all electricity charges during the tenancy. The Tenant agrees to transfer the electricity account into their name and pay all bills directly to the service provider. The Tenant shall ensure that all payments are made on time, and any late fees or penalties incurred due to non-payment shall be the responsibility of the Tenant.' },
    { heading: 'Gas Connection Charges', text: 'The licensee herein shall pay the piped gas consumption bills directly for energy consumed on the licensed premises and should submit original receipts to Licensor indicating that the gas bills are paid.' },
    { heading: 'Pet Policy', text: 'The clause states that no pets (except service animals) are allowed. Prior written consent from the landlord is required for any exceptions. Violation may result in fees for cleaning, de-fleeing, and damage repair.' },
    { heading: 'Water Charge Policy', text: 'Tenant has to pay for water consumed as shown on said meter (if such facilities are available) as and when bills are rendered, and on default in making such payment, Landlord may pay such charges and collect the same from Tenant.' },
    { heading: 'Pest Control', text: 'The Landlord will provide quarterly pest control services. The Tenant must maintain cleanliness to prevent infestations and promptly report any pest issues to the Landlord.' },
    { heading: 'Right of Entry', text: 'The Landlord reserves the right to enter the premises with 24 hours notice for inspections, repairs, or showings to prospective tenants or buyers. In case of emergencies, the Landlord may enter without prior notice.' },
    { heading: 'Noise and Disturbance', text: 'The Tenant agrees not to engage in or permit any activities that create excessive noise or disturbances, interfering with the quiet enjoyment of other residents. Repeated violations may result in termination of the lease.' },
    { heading: 'Mold and Moisture Prevention', text: 'The Tenant shall maintain adequate ventilation and cleanliness to prevent mold growth. Any signs of excessive moisture or mold must be reported to the Landlord immediately.' },
    { heading: 'Dispute Resolution', text: 'In the event of any dispute arising from this agreement, both parties agree to attempt resolution through mediation before proceeding to arbitration or litigation.' },
  ];

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <label className={classes.label}>Agreement Place:</label>
      <Input
        type="text"
        name="agreement_place"
        value={details.agreement_place}
        onChange={handleChange}
        className={classes.input}
      />
      {/* row layout 1 */}
      <div className={classes.flexRowDoubleContent}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <label className={classes.label}>Agreement Date:</label>
          <Input
            type="date"
            name="agreement_date"
            value={details.agreement_date}
            onChange={handleChange}
            className={classes.rowLayoutInput}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <label className={classes.label}>Tenancy Start Date:</label>
          <Input
            type="date"
            name="tenancy_start_date"
            value={details.tenancy_start_date}
            onChange={handleChange}
            className={classes.rowLayoutInput}
          />
        </div>
      </div>

      {/* row layout 2 */}
      <div className={classes.flexRowDoubleContent}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <label className={classes.label}>Period:</label>
          <Select name='agreement_period' value={details.agreement_period} onChange={handleChange} className={classes.select}>
            <MenuItem value=''>Select</MenuItem>
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='2'>2</MenuItem>
            <MenuItem value='3'>3</MenuItem>
            <MenuItem value='4'>4</MenuItem>
            <MenuItem value='5'>5</MenuItem>
            <MenuItem value='6'>6</MenuItem>
            <MenuItem value='7'>7</MenuItem>
            <MenuItem value='8'>8</MenuItem>
            <MenuItem value='9'>9</MenuItem>
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='11'>11</MenuItem>
          </Select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <label className={classes.label}>Rent Day:</label>
          <Select name='rent_day' value={details.rent_day} onChange={handleChange} className={classes.select}>
            <MenuItem value=''>Select</MenuItem>
            <MenuItem value='1st'>1st</MenuItem>
            <MenuItem value='2nd'>2nd</MenuItem>
            <MenuItem value='3rd'>3rd</MenuItem>
            <MenuItem value='4th'>4th</MenuItem>
            <MenuItem value='5th'>5th</MenuItem>
            <MenuItem value='6th'>6th</MenuItem>
            <MenuItem value='7th'>7th</MenuItem>
            <MenuItem value='8th'>8th</MenuItem>
            <MenuItem value='9th'>9th</MenuItem>
            <MenuItem value='10th'>10th</MenuItem>
            <MenuItem value='11th'>11th</MenuItem>
            <MenuItem value='12th'>12th</MenuItem>
            <MenuItem value='13th'>13th</MenuItem>
            <MenuItem value='14th'>14th</MenuItem>
            <MenuItem value='15th'>15th</MenuItem>
            <MenuItem value='16th'>16th</MenuItem>
            <MenuItem value='17th'>17th</MenuItem>
            <MenuItem value='18th'>18th</MenuItem>
            <MenuItem value='19th'>19th</MenuItem>
            <MenuItem value='20th'>20th</MenuItem>
            <MenuItem value='21st'>21st</MenuItem>
            <MenuItem value='22nd'>22nd</MenuItem>
            <MenuItem value='23rd'>23rd</MenuItem>
            <MenuItem value='24th'>24th</MenuItem>
            <MenuItem value='25th'>25th</MenuItem>
            <MenuItem value='26th'>26th</MenuItem>
            <MenuItem value='27th'>27th</MenuItem>
            <MenuItem value='28th'>28th</MenuItem>
            <MenuItem value='29th'>29th</MenuItem>
            <MenuItem value='30th'>30th</MenuItem>
            <MenuItem value='31st'>31st</MenuItem>
          </Select>
        </div>
      </div>

      <div className={classes.flexRowDoubleContent}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <label className={classes.label}>Rent Amount:</label>
          <Input
            type="text"
            name="monthly_rent_amount"
            value={details.monthly_rent_amount}
            onChange={handleChange}
            className={classes.rowLayoutInput}
            placeholder='Rs. Per Month'
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <label className={classes.label}>Security Amount:</label>
          <Input
            type="text"
            name="security_amount"
            value={details.security_amount}
            onChange={handleChange}
            className={classes.rowLayoutInput}
            placeholder='In Rs.'
          />
        </div>
      </div>

      <div>
        <label className={classes.label}>
          <Switch
            name='isCustomClause'
            value={details.isCustomClause}
            checked={isCustomClause}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Write your own clause
          <Tooltip
            title="The clauses from 1 to 6 are default clauses and can not be edited. You can write your own clauses from clause number 7 and for this clauses from 7 to 12 would be removed."
            arrow
          >
            <LightbulbOutlinedIcon
              color="action"
              className={classes.infoIcon}
              style={{ marginLeft: '8px', cursor: 'pointer' }}
            />
          </Tooltip>
        </label>
      </div>
      
      {isCustomClause && (
        <div className={classes.customClauseContainer}>
          <label className={classes.label}>Custom Clause:</label>
          <TextField
            name="customClauseText"
            value={details.currentClauseText}
            onChange={handleCustomClauseChange}
            placeholder="Enter your custom clause here..."
            className={classes.textarea}
            multiline
            rows={3}
          />
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '15px'}}>
            <Button onClick={addCustomClause} className={classes.button}>+ Add</Button>
          </div>
          <div className={classes.clauseStackContainer}>
            <Stack spacing={2}>
              {details.customClause.map((clause, index) => (
                <div key={index} className={classes.clauseItem}>
                  <div style={{width: '100%'}}>{clause}</div>
                  <IconButton size='large' aria-label="delete" onClick={() => deleteClause(index)} className={classes.deleteIcon}>
                    <DeleteOutlinedIcon sx={{color: 'red'}}/>
                  </IconButton>
                </div>
              ))}
            </Stack>
          </div>
        </div>
      )}
      {/* for miscellaneous clause section */}
      {isCustomClause? '':(
        <div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <label className={classes.label}>Miscellaneous Clause:</label>
        <div className={classes.clauseContainer}>
            {clauses.map((clause, index) => (
              <label key={index} className={classes.clause}>
                <Input
                  type="checkbox"
                  name="miscellaneous_clause"
                  value={details.miscellaneous_clause}
                  checked={selectedClauses.some(c => c.heading === clause.heading)}
                  onChange={(e) => handleChange(e, clause)}
                />
                <div style={{marginLeft: '12px'}}>
                  <div className={classes.clauseHeading}>{clause.heading}</div>
                  <div className={classes.clauseText}>{clause.text}</div>
                </div>
              </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '5px'}}>
        <label className={classes.label} style={{alignContent: 'center', textAlign: 'center'}}>Additional Clause:</label>
        <Input
          type="text"
          name="additional_clause"
          value={details.additional_clause}
          onChange={handleChange}
          className={classes.input}
          style={{width: '70%'}}
        />
      </div>
      </div>
      )}

      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '15px'}}>
        <Button variant='contained' onClick={prevStep} >Previous</Button>
        <Button variant='contained' type="submit" onClick={handleSubmit}>Submit</Button>
      </div>
    </form>
  )
}

export default AgreementDetails;