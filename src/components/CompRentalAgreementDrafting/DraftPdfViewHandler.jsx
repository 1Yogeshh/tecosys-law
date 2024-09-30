import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import html2pdf from 'html2pdf.js';
import HTMLDocx from 'html-docx-js/dist/html-docx.js';

const useStyles = makeStyles(() => ({
  sampleDraftBackground: {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: 'white',
    scrollbarWidth: 'none', // Hide scrollbar for Firefox
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  iframeContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  zoomButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    padding: '0 5px',
    height: '35px',
    bottom: '8px',
    left: '12px',
    zIndex: 0,
  },
  downloadButton: {
    width: '80px',
    padding: '6px 10px',
    fontSize: '10px',
    cursor: 'pointer',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
}));

const DraftPdfViewHandler = ({ data, onDocFileReady }) => {
  const classes = useStyles();
  const [showWatermark, setShowWatermark] = useState(false);

  
  const content = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
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
            padding: 15mm;
            display: flex;
            flex-direction: column;
            align-items: align-self;
            // font-family: Times New Roman;
          }
          
          .content{
            position: relative;
            text-align: center;
            display: flex;
            flex-direction: column;
            font-family: Times New Roman;
          }
          
          .title {
            font-size: 20pt;
            text-align: center;
            direction: ltr;
            font-weight: 300;
          }
          .commonSpan {
            font-size: 12pt;
            line-height: 1.5; /* Space between lines */
            margin-bottom: 10pt; /* Space below paragraphs */
            font-weight: 100;
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
            font-family: Times New Roman;
          }
          .clauseContent{
            margin-left: 10px;
            overflow-wrap: break-word;
            text-align: justify;
            text-justify: inter-word;
          }
          .miscClause{
            display: flex;
            flex-direction: row;
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
          
          .flexboxContainer{
            width: 100%;
            margin-top: 50px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
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
        </style>
      </head>
      <body>
        <div class="a4Draft">
          <div class='content'>
            <div class="title">RENT AGREEMENT</div>
            <p class="commonSpan">THIS RENT AGREEMENT is made on ${data.agreementData.agreement_date || '......'} at ${data.agreementData.agreement_place || '................'}.</p>
            
            <div style="font-size:12pt">BETWEEN</div>

            <div class="leftStartContent">LANDLORD(s)</div>
            ${data.landlordData.landlordType === 'Individual' || data.landlordData.landlordType == null ? `
                <div class="commonTextClass"><span>${data.landlordData.ll_name || '......'}, a resident of ${data.landlordData.ll_address || '......................................'} (Aadhar No. ${data.landlordData.ll_aadharNo || '..................'}),
                hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include his/her heirs, executors, administrators and assigns of the one part.</span></div>
              `: data.landlordData.landlordType === 'Company' ? `
                <div class="commonTextClass"><span>The Company ${data.landlordData.ll_companyName || '......'}, situated in ${data.landlordData.ll_companyAddress || '......................................'} (CRN ${data.landlordData.ll_crn || '..................'}),
                hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include his/her heirs, executors, administrators and assigns of the one part.</span></div>
              `: `
                <div class="commonTextClass"><span>The Partnership Firm ${data.landlordData.ll_firmName || '......'}, situated in ${data.landlordData.ll_firmAddress || '......................................'} (PRN ${data.landlordData.ll_prn || '..................'}),
                hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include his/her heirs, executors, administrators and assigns of the one part.</span></div>
            `}
            <div style="font-size:12pt; margin:15px 0">AND</div>

            <div class="leftStartContent">TENANT(s)</div>
            ${data.tenantData.tenantType === 'Individual' || data.tenantData.tenantType == null ? `
              <div class="commonTextClass"><span>${data.tenantData.tenant_name || '......'}, a resident of ${data.tenantData.tenant_address || '......................................'} (Aadhar No. ${data.tenantData.tenant_aadharNo || '..................'}),
              hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include his/her heirs, executors, administrators and assigns of the one part.</span></div>
            `: data.tenantData.tenantType === 'Company' ? `
              <div class="commonTextClass"><span>The Company ${data.tenantData.tenant_companyName || '......'}, situated in ${data.tenantData.tenant_companyAddress || '......................................'} (CRN ${data.tenantData.tenant_crn || '..................'}),
              hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include his/her heirs, executors, administrators and assigns of the one part.</span></div>
            `: `
              <div class="commonTextClass"><span>The Partnership Firm ${data.tenantData.tenant_firmName || '......'}, situated in ${data.tenantData.tenant_firmAddress || '......................................'} (PRN ${data.tenantData.tenant_prn || '..................'}),
              hereinafter is called the Landlord/First Party which expression shall wherever the context so requires and include his/her heirs, executors, administrators and assigns of the one part.</span></div>
            `}
            
            <div style="font-size:12pt; margin:15px 0">WHERE</div>
            <div class="commonTextClass"><span>The LANDLORD/First Party is the absolute and exclusive owner of ${data.propertyData.property_name || '....'}, ${data.propertyData.property_address || '......................................'} 
            (hereinafter referred to as the SAID PREMISES).</span></div>

            <div class="commonTextClass"><span>AND WHEREAS THE LANDLORD/First Party agreed to let out the said property and the TENANT/Second Party agreed to take on rent the said property on the following terms and conditions:</span></div>
            <div class="draftClauseContainer">
              <div class="draftClause"><span>1.</span><div class="clauseContent"><span> That the monthly rent of the said property is fixed by and between the parties at a sum of Rs.${data.agreementData.monthly_rent_amount || '............'}/- per month excluding maintenance charges.</span></div></div>

              <div class="draftClause"><span>2.</span><div class="clauseContent"><span> That the Second Party will pay the said monthly rent in advance on or before the ${data.agreementData.rent_day || '......'} of each month of the English calendar.</span></div></div>

              <div class="draftClause"><span>3.</span><div class="clauseContent"><span> The Second Party will give Rs.${data.agreementData.security_amount || '........'}/- as an interest-free security deposit, refundable depending on the condition of the flat at the time of vacation.</span></div></div>

              <div class="draftClause"><span>4.</span><div class="clauseContent"><span> That the Landlord/First Party has let out the said property to the Tenant/Second Party for a period of ${data.agreementData.agreement_period || '.........'} from ${data.agreementData.agreement_date || '..........'} and the Second Party has agreed to vacate the premises after the expiry of the period.</span></div></div>

              <div class="draftClause"><span>5.</span><div class="clauseContent"><span> That the Second Party can vacate the property before the expiry of the lease by giving 1 month notice to the First Party, and the First Party can get the property vacated before the expiry of the lease by giving 1 month notice to the Second Party.</span></div></div>

              <div class="draftClause"><span>6.</span><div class="clauseContent"><span> That the tenancy period can be extended subject to mutually agreed terms by both parties.</span></div></div>

              <div class="draftClause"><span>7.</span><div class="clauseContent"><span> That the Second Party is fully responsible for maintaining all provided utilities with periodic maintenance in the required time period. If any mishandling occurs, the Second Party is responsible for restoring it to good condition or replacing it.</span></div></div>

              <div class="draftClause"><span>8.</span><div class="clauseContent"><span> That the Second Party will not make any additions or alterations to the existing rented structure without the written permission of the owner.</span></div></div>

              <div class="draftClause"><span>9.</span><div class="clauseContent"><span> That the Second Party will permit the owner or his duly authorized agent to enter the said premises for inspection or required work at any reasonable time.</span></div></div>

              <div class="draftClause"><span>10.</span><div class="clauseContent"><span> That the Second Party will not sublet the said premises or any part thereof to anyone else.</span></div></div>
       
              <div class="draftClause"><span>11.</span><div class="clauseContent"><span> That the Second Party will use the said property for commercial purposes only.</span></div></div>

              <div class="draftClause"><span>12.</span><div class="clauseContent"><span> That a fresh rent agreement shall be signed if the rent agreement is extended beyond a period of ${data.agreementData.agreement_period || '............'} months.</span></div></div>
              ${data.agreementData.additional_clause ? `<div class="draftClause"><span><u>Additional Clause</u>:</span><div class="clauseContent>"<span> ${data.agreementData.additional_clause}</span></div></div>` : ''}
            </div>
            <div class="miscClause"><span><u>Miscellaneous Clause(s)</u>:</span></div>
            ${data.agreementData.miscellaneous_clause ? data.agreementData.miscellaneous_clause.map((clause, index) => `
              <div class="draftClause" key="${index}"><span><u>${clause.heading}</u>:</span><div class="clauseContent"><span>${clause.text}</span></div></div>
            `).join('') : ''}
            <div class="commonTextClass"><span>In Witness Whereoff the Parties hereto have set their hands and signatures in this Rent Agreement of the ${data.agreementData.agreement_date || '........'}.</span></div>
            <div class="flexboxContainer">
              <div class="leftsideBox">
                <div><span><strong>WITNESSES:</strong></span></div>
                <div class="lefttopMargin"><span><strong>1. ______________________</strong></span></div>
                <div class="lefttopMargin"><span><strong>2. ______________________</strong></span></div>
              </div>
              <div class="rightsideBox">
                <div class="righttopMargin"><span><strong>LANDLORD/FIRST PARTY</strong></span></div>
                <div class="righttopMargin"><span><strong>TENANT/SECOND PARTY</strong></span></div>
              </div>
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
      if (onDocFileReady) {
        onDocFileReady(converted);
      }
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

  return (
    <div className={classes.iframeContainer}>
      <iframe className={classes.sampleDraftBackground} srcDoc={content} sandbox="allow-scripts" />
      <div className={classes.zoomButtonContainer}>
        <button className={classes.downloadButton} onClick={handlePreview}>
          Preview
        </button>
        <button className={classes.downloadButton} onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};


export default DraftPdfViewHandler;

