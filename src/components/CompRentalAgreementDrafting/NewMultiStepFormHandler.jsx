import React, { useState, useEffect } from 'react';
import LandlordDetails from './LandlordDetails.jsx';
import TenantDetails from './TenantDetails.jsx';
import PropertyDetails from './PropertyDetails.jsx';
import AgreementDetails from './AgreementDetails.jsx';
import AdditionalDetails from './AdditionalDetails.jsx';
import StepperComponent from './StepperComponent.jsx';
import axios from 'axios';
import HTMLDocx from 'html-docx-js/dist/html-docx.js';
import image from '../CompRentalAgreementDrafting/assets/indi-indi-rent-ss.PNG'
import { FaEye } from 'react-icons/fa';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';


const NewMultiStepFormHandler = ({ classes, currentStep, onStepDataChange }) => {
  const [step, setStep] = useState(currentStep || 1); // Initialize with currentStep or default to 1
  const [formData, setFormData] = useState({
    landlordData: {},
    tenantData: {},
    propertyData: {},
    agreementData: {},
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [docFile, setDocFile] = useState(null);

  useEffect(() => {
    setStep(currentStep); // ppdate local step when currentStep changes
  }, [currentStep]);

  useEffect(() => {
    if (onStepDataChange) {
      onStepDataChange(step);
    }
  }, [step, onStepDataChange]);

  // collect all data from each step except last step and store into formData
  const nextStep = (data) => {
    setFormData(prevData => ({
      ...prevData,
      [`${getCurrentStepDataKey()}Data`]: data
    }));
    setStep(prevStep => prevStep + 1);
  };

  const handleDataUpdate = (data) => {
    setFormData(prevData => ({
      ...prevData,
      [`${getCurrentStepDataKey()}Data`]: data
    }));
    console.log("Inside new",formData);
  };

  const finalDataCollection = (data) => {
    setFormData(prevData => ({
      ...prevData,
      paymentData: data
    }));
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };
  
  
  // to handle the doc generated from DraftPdfHandler
  const handleDocFile = (file) => {
    setDocFile(file);
  };

  const getCurrentStepDataKey = () => {
    switch (step) {
      case 1:
        return 'landlord';
      case 2:
        return 'tenant';
      case 3:
        return 'property';
      case 4:
        return 'agreement';
      default:
        return '';
    }
  };

  const handleSubmit = (isSaved) => {
    handleDownloadAndSave();
    setFormData(prevFormData => ({
      ...prevFormData,
      rental_draft: docFile
    }));
    if (isSaved) {
      sendData(); // call sendData when isSaved is true
      console.log("sendData is called", isSaved);
      console.log("Data", formData);
      console.log(response);
      console.log(error);
    }
  };

  const sendData = () => {
    axios.post('http://localhost:8000/rental-agreement-drafting/home/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => {
        setResponse(response.data);
    })
    .catch(error => {
        setError(error);
    });
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return <LandlordDetails nextStep={nextStep} onThisStepDataStream={handleDataUpdate} initialData={formData.landlordData}/>;
      case 2:
        return <TenantDetails nextStep={nextStep} prevStep={prevStep} onThisStepDataStream={handleDataUpdate} initialData={formData.tenantData}/>;
      case 3:
        return <PropertyDetails nextStep={nextStep} prevStep={prevStep} onThisStepDataStream={handleDataUpdate} initialData={formData.propertyData}/>;
      case 4:
        return <AgreementDetails nextStep={nextStep} prevStep={prevStep} onThisStepDataStream={handleDataUpdate} initialData={formData.agreementData}/>;
      case 5:
        return <AdditionalDetails finalDataCollection={finalDataCollection} prevStep={prevStep} onSubmit={handleSubmit} />;
      default:
        return <div>Form completed!</div>;
    }
  };

  
  const [showWatermark, setShowWatermark] = useState(false);

  const data = formData;
  /* this below cases are for handling the situation when type returns undefined value */
  let llt = data.landlordData?.landlordType || 'Individual';
  let tnt = data.tenantData?.tenantType || 'Individual';
  let nld = data.landlordData?.no_of_landlords || 1;
  let ntn = data.tenantData?.no_of_tenants || 1;

  const content = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
        @page {
            size: A4;
            margin: 0;
        }
          body {
            font-family: Calibri;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            height: 100%;
            width: 100%;
          }
          .a4Draft {
            width: 210mm;
            height: 297mm;
            padding: 15mm 8mm;
            display: flex;
            flex-direction: column;
            align-items: align-self;
            transform-origin: top center;
            transform: scale(0.9);
          }
          
          .content{
            position: relative;
            text-align: center;
            display: flex;
            flex-direction: column;
            font-family: Times New Roman;
          }

          .leftStartContent{
            position: relative;
            font-size: 12pt;
            font-weight: 300;
          }
          
          .commonTextClass{
            font-size: 12pt;
            line-height: 1.5;
            overflow-wrap: break-word;
            margin-bottom: 10px;
            text-align: justify;
            text-justify: inter-word;
            font-family: Times New Roman;
          }

          .draftClauseContainer{
            font-size: 12pt;
            margin-left: 30px;
            font-family: Times New Roman;
          }
          
          .draftClause{
            font-size: 12pt;
            line-height: 1.5;
            overflow-wrap: break-word;
            margin-bottom: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            text-align: justify;
            text-justify: inter-word;
          }
          .clauseContent{
            margin-left: 10px;
            overflow-wrap: break-word;
            text-align: justify;
            text-justify: inter-word;
          }
          .clauseHeading {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
          }

          .clauseContent {
            margin-top: 5px;
            margin-bottom: 5px;
            display: block;
          }
          .miscClause{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            font-family: Times New Roman;
          }
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 40pt;
            color: rgba(0, 0, 0, 0.5);
            pointer-events: none;
            z-index: 1000;
            display: ${showWatermark ? 'block' : 'none'};
          }
          .no-copy {
            pointer-events: none;
            user-select: none;
          }

          .leftsideBox .rightsideBox{
            width: 45%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          
          .lefttopMargin{
            margin-top: 50px;
          }
          .righttopMargin{
            margin-top: 60px;
          }
          p{
           font-size: 12pt;
            line-height: 1.6;           
            word-spacing: 2px;  
            letter-spacing: 0.5px;
            overflow-wrap: break-word;
            margin-bottom: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            text-align: justify;
            text-justify: inter-word;
          }
            .commonSpan {
            font-size: 12pt;
            line-height: 1.5; /* Space between lines */
            margin-bottom: 10pt; /* Space below paragraphs */
            font-weight: 100;
          }
          .rectangleBox {
            width: 300px;         
            height: 150px;        
            border: 2px solid black; 
            background-color: #f0f0f0;
            padding: 20px;  
            text-align: center; 
            line-height: 150px;
            font-weight: bold;
          }
          .signature-table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #464646;
        }
        .signature-line {
            border-bottom: 1px solid #464646;
            text-align: center;
            height: 30px; /* Height of the signature line */
        }
        .signature-details {
            font-size: 10pt;
            text-align: center;
            margin: 0;
        }
        </style>
      </head>
      <body>
        <div class="a4Draft">
          <div class='content'>
            <h2 style="font-size: 20pt; text-align: center; font-weight: 300">RENT AGREEMENT</h2>
            <h5 style="font-size: 12pt; line-height: 1.5; font-weight: 100">THIS RENT AGREEMENT is made on ${data.agreementData.agreement_date || '.......'} at ${data.agreementData.agreement_place || '................'}.</h5>
            
            BETWEEN

            <p class="leftStartContent">LANDLORD(s)</p>
            ${llt === 'Individual'? 
              (() => {
                let landlords = '';
                if(nld === 1){
                  return `
                    <p class="commonTextClass">
                      ${data.landlordData[`ll_name_1`] || '......'}, a resident of ${data.landlordData[`ll_address_1`] || '......................................'} 
                      (Aadhar No. ${data.landlordData[`ll_aadharNo_1`] || '..................'}),
                      hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include 
                      his/her heirs, executors, administrators and assigns of the one part.
                    </p>`;
                }
                else{
                  landlords += `<p class="commonTextClass">`;
                  for (let i = 1; i <= nld; i++) {
                    landlords += `
                        ${data.landlordData[`ll_name_${i}`] || '......'}, a resident of ${data.landlordData[`ll_address_${i}`] || '......................................'} 
                        (Aadhar No. ${data.landlordData[`ll_aadharNo_${i}`] || '..................'}), 
                      `;
                  }
                  landlords += `hereinafter are called the Landlord(s)/First Party which expression shall wherever the context so requires and include their heirs, executors, administrators and assigns of the part.</p>`;
                }
                return landlords;
              })() :
              llt === 'Company' ? `
                <p class="commonTextClass">
                  The Company ${data.landlordData.ll_companyName || '......'}, situated in ${data.landlordData.ll_companyAddress || '......................................'} 
                  (CRN ${data.landlordData.ll_crn || '..................'}),
                  hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include 
                  his/her heirs, executors, administrators and assigns of the one part.
                </p>
              `:
              `
                <p class="commonTextClass">
                  The Partnership Firm ${data.landlordData.ll_firmName || '......'}, situated in ${data.landlordData.ll_firmAddress || '......................................'} 
                  (PRN ${data.landlordData.ll_prn || '..................'}),
                  hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include 
                  his/her heirs, executors, administrators and assigns of the one part.
                </p>
              `
            }
            AND

            <p class="leftStartContent">TENANT(s)</p>
            ${tnt === 'Individual' ? 
              (()=>{
                let tenant = '';
                if(ntn === 1){
                  return `
                    <p class="commonTextClass">${data.tenantData.tenant_name_1 || '.....'}, a resident of ${data.tenantData.tenant_address_1 || '......................................'} (Aadhar No. ${data.tenantData.tenant_aadharNo_1 || '..................'}), 
                     hereinafter is called the Tenant/Second Party which expression shall wherever the context so requires and include his/her heirs, executors, administrators and assigns of the one part.</p>
                  `;
                }
                else{
                  tenant += `<p class="commonTextClass">`;
                  for(let i=1; i<=ntn; i++){
                    tenant += `${data.tenantData[`tenant_name_${i}`] || '......'}, a resident of ${data.tenantData[`tenant_address_${i}`] || '......................................'} (Aadhar No. ${data.tenantData[`tenant_aadharNo_${i}`] || '..................'}),`;
                  }
                  tenant += ` hereinafter are called the Tenant(s)/Second Party which expression shall wherever the context so requires and include their heirs, executors, administrators and assigns of the one part.</p>`
                }
                return tenant;
              })()
             : tnt === 'Company' ? `
              <p class="commonTextClass">The Company ${data.tenantData.tenant_companyName || '......'}, situated in ${data.tenantData.tenant_companyAddress || '......................................'} (CRN ${data.tenantData.tenant_crn || '..................'}),
              hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include his/her heirs, executors, administrators and assigns of the one part.</p>
            `: `
              <p class="commonTextClass">The Partnership Firm ${data.tenantData.tenant_firmName || '......'}, situated in ${data.tenantData.tenant_firmAddress || '......................................'} (PRN ${data.tenantData.tenant_prn || '..................'}),
              hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include his/her heirs, executors, administrators and assigns of the one part.</p>
            `}
            
            WHERE,
            <p class="commonTextClass">The LANDLORD/First Party is the absolute and exclusive owner of ${data.propertyData.property_name || '....'}, ${data.propertyData.property_address || '......................................'} 
            (hereinafter referred to as the SAID PREMISES).</p>

            <p class="commonTextClass">AND WHEREAS THE LANDLORD/First Party agreed to let out the said property and the TENANT/Second Party agreed to take on rent the said property on the following terms and conditions:</p>
            <ol class="draftClauseContainer">
            
              <li><p>That the monthly rent of the said property is fixed by and between the parties at a sum of Rs.${data.agreementData.monthly_rent_amount || '............'}/- per month excluding maintenance charges.</p></li>

              <li><p>That the Second Party will pay the said monthly rent in advance on or before the ${data.agreementData.rent_day || '......'} day of each month of the English calendar.</p></li>

              <li><p>The Second Party will give Rs.${data.agreementData.security_amount || '........'}/- as an interest-free security deposit, refundable depending on the condition of the flat at the time of vacation.</p></li>

              <li><p>That the Landlord/First Party has let out the said property to the Tenant/Second Party for a period of ${data.agreementData.agreement_period || '.........'} from ${data.agreementData.agreement_date || '..........'} and the Second Party has agreed to vacate the premises after the expiry of the period.</p></li>

              <li><p>That the Second Party can vacate the property before the expiry of the lease by giving 1 month notice to the First Party, and the First Party can get the property vacated before the expiry of the lease by giving 1 month notice to the Second Party.</p></li>

              <li><p>That a fresh rent agreement shall be signed if the rent agreement is extended beyond a period of ${data.agreementData.agreement_period || '............'} months.</p></li>
              ${data.agreementData.isCustomClause?
                (`
                  
                  `):(`
              <li><p>That the Second Party is fully responsible for maintaining all provided utilities with periodic maintenance in the required time period. If any mishandling occurs, the Second Party is responsible for restoring it to good condition or replacing it.</p></li>

              <li><p>That the Second Party will not make any additions or alterations to the existing rented structure without the written permission of the owner.</p></li>

              <li><p>That the Second Party will permit the owner or his duly authorized agent to enter the said premises for inspection or required work at any reasonable time.</p></li>

              <li><p>That the Second Party will not sublet the said premises or any part thereof to anyone else.</p></li>
       
              <li><p>That the Second Party will use the said property for commercial purposes only.</p></li>

              <li><p>That the tenancy period can be extended subject to mutually agreed terms by both parties.</div></li>
              ${data.agreementData.additional_clause ? `<li><p>${data.agreementData.additional_clause}</p></li>` : ''}
              `)}
            </ol>
            ${data.agreementData.isCustomClause?'':(`<p class="miscClause"><u>Miscellaneous Clause(s)</u>:</p>
              <ol class="draftClauseContainer">
              ${data.agreementData.miscellaneous_clause ? data.agreementData.miscellaneous_clause.map((clause, index) => `
                <li key="${index}">
                  <p class="clauseHeading"><u>${clause.heading}</u>:</p>
                  <p class="clauseContent">${clause.text}</p>
                </li>
              `).join('') : ''}
            </ol>`)}
            <p class="commonTextClass">In Witness Whereof the Parties hereto have set their hands and signatures in this Rent Agreement of the ${data.agreementData.agreement_date || '........'}.</p>
            <div class="signaturePart" style="display: flex; flex-direction: column;">
              <table style="width: 100%; border-collapse: collapse; border: 1px solid #464646;">
                  
                  <tr>
                      <td colspan="2" style="height: 50px;">&nbsp;</td> <!-- Add space above signature line -->
                  </tr>
                  
                  <tr>
                      <td colspan="2" class="signature-line">&nbsp;</td>
                  </tr>
                  
                  <tr>
                      <td style="width: 100%; height: 15px; display: flex; align-items: center; justify-content: center; padding: 10px;">
                        <p style="font-size: 10pt; text-align: center; margin: 0;">
                          Landlord: ${data.landlordData.ll_name_1 || 'Landlord Name'}, ${data.landlordData.ll_age_1 || 'Landlord Age'} years
                        </p>
                      </td>
                  </tr>
              </table>
              <br/>
              <table class="signature-table">
                <tr>
                    <td colspan="2" class="space-above">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="2" class="signature-line">
                    </td>
                </tr>
                <tr>
                    <td style="width: 100%; height: 15px; display: flex; align-items: center; justify-content: center; padding: 10px;">
                        <p style="font-size: 10pt; text-align: center; margin: 0;">
                            Tenant: ${data.tenantData.tenant_name_1 || 'Tenant Name'}, ${data.tenantData.tenant_age_1 || 'Tenant Age'} years
                        </p>
                    </td>
                </tr>
              </table>
              <br/>
              <table class="signature-table">
                <tr>
                    <td colspan="2" class="space-above">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="2" class="signature-line">
                        <!-- Space for witness 1 signature -->
                    </td>
                </tr>
                <tr>
                    <td style="width: 100%; height: 15px; display: flex; align-items: center; justify-content: center; padding: 10px;">
                        <p style="font-size: 10pt; text-align: center; margin: 0;">
                            Witness 1:
                        </p>
                    </td>
                </tr>
              </table>
              <br/>
              <table class="signature-table">
                <tr>
                    <td colspan="2" class="space-above">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="2" class="signature-line">
                        <!-- Space for witness 2 signature -->
                    </td>
                </tr>
                <tr>
                    <td style="width: 100%; height: 15px; display: flex; align-items: center; justify-content: center; padding: 10px;">
                        <p style="font-size: 10pt; text-align: center; margin: 0;">
                            Witness 2:
                        </p>
                    </td>
                </tr>
              </table>
            </div>
            <div class="watermark ${showWatermark ? '' : 'no-copy'}">PREVIEW</div>
            <script>
              document.body.addEventListener('copy', (e) => e.preventDefault());
              document.body.addEventListener('contextmenu', (e) => e.preventDefault());
            </script>
          </div>
        </div>
      </body>
    </html>
  `;

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const reader = new FileReader();

    reader.onload = () => {
      const html = reader.result;
      const converted = HTMLDocx.asBlob(html);
      const url = URL.createObjectURL(converted);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rent_agreement.docx';
      a.click();
      URL.revokeObjectURL(url);
      // if (onDocFileReady) {
      //   onDocFileReady(converted);
      // }
    };

    reader.readAsText(blob);
  };

  const handleDownloadAndSave = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const reader = new FileReader();
  
    reader.onload = () => {
      const html = reader.result;
      const converted = HTMLDocx.asBlob(html);
      setDocFile(converted);
    };
  
    reader.readAsText(blob);
  };

  const handlePreview = () => {
    setShowWatermark(true);
    const previewWindow = window.open('', '_blank', 'width=800,height=600');
    if (previewWindow) {
      previewWindow.document.open();
      previewWindow.document.write(content);
      previewWindow.document.close();
      setShowWatermark(false); // Reset watermark for iframe display
    }
  };
  useEffect(() => {
    if (step === 1) {
      // Perform any side effects or actions when step is set to 1
      console.log('Step is set to 1');
    }
  }, [step]);
  console.log(formData);
  return (
    <div className={classes.blueBgmFullWdth}>
      {currentStep !== 5?(
        <div className={classes.twoRectBoxContainer}>
          <div className={classes.leftSideBox}>
            <div className={classes.stepper}>
              <StepperComponent currentStep={currentStep-1}/>
            </div>
            <div className={classes.userInputBox}>
              {renderForm()}
            </div>
          </div>
          <div className={classes.iframeContainer}>
              <iframe className={classes.iframe} srcDoc={content} sandbox="allow-scripts" />
              {/* <button onClick={handlePreview}>
                Preview
              </button> */}
          </div>
        </div>
      ):(
        <div className={classes.spclTwoRectBoxCont}>
          <div className={classes.additionalDataInputBox}>
            {renderForm()}
          </div>
          <div className={classes.previewAndBillingBox}>
            {/* <iframe className={classes.iframe2}  src={image} sandbox="allow-scripts" /> */}
            <div className={classes.rentPreviewBox} onClick={handleDownload}>
              <img src={image} style={{width: '25vw', margin: '10px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}} alt="" />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px 0'}}>
              <Button variant='outlined' onClick={()=>setStep(1)} style={{ textTransform: 'none' }}>
                <EditNoteIcon style={{ marginRight: '5px'}} /> 
                Edit
              </Button>
              <Button variant='contained' style={{ textTransform: 'none' }}>
                <HttpsOutlinedIcon style={{ marginRight: '5px', width: '15px'}} /> 
                Continue to secure pay
              </Button>
            </div>
            <hr/>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <span style={{fontSize: '14px', fontFamily: 'Open Sans', fontColor: '#7F7F7F', fontWeight: '600'}}>Billing Informations</span>
                <ReceiptIcon style={{ marginLeft: '5px', width: '15px'}}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', padding: '5px'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span>Drafting Charge</span>
                  <span>:</span>
                  <span>250</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span>Drafting Charge</span>
                  <span>:</span>
                  <span>250</span>
                </div><div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span>Drafting Charge</span>
                  <span>:</span>
                  <span>250</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewMultiStepFormHandler;