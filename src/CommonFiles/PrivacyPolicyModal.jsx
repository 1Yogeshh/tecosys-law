import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import lawCratsIconBlack from "../components/CompLawChatBot/assets/LCLogoBlack.png"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  dialog: {
    backdropFilter: 'blur(5px)',
  },
  dialogPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    minWidth: '300px',
    minHeight: '200px',
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  liObj: {
    fontSize: "12pt",
    lineHeight: "1.5",
    overflowWrap: "break-word",
    marginBottom: "10px",
    textAlign: "justify",
    textJustify: "inter-word",
    fontFamily: "Times New Roman",
  },
});

const PrivacyPolicyModal = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="privacy-policy-title" className={classes.dialog} PaperProps={{ className: classes.dialogPaper,}}>
      <DialogTitle style={{width: "100%"}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <img src={lawCratsIconBlack} alt="" style={{width: '40px'}}/>
            <h4>Privacy Policy</h4>
            <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon/>
            </IconButton>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <ol>
            <li className={classes.liObj}>
                At LawCrats, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services, including any information you provide during registration, when using our platform, or through any other interactions with LawCrats.
            </li>
            <li className={classes.liObj}>
                We collect personal data such as your name, contact details, and payment information to provide you with our legal tech services. Additionally, we may collect information about your usage of our platform, such as IP addresses and browser types, to improve user experience and for security purposes.
            </li>
            <li className={classes.liObj}>
                LawCrats may use cookies and similar technologies to enhance your experience on our platform. These technologies help us analyze traffic, customize content, and ensure secure transactions. You can manage your cookie preferences through your browser settings.
            </li>
            <li className={classes.liObj}>
                Your personal data will be used strictly for the purpose of delivering our services, fulfilling legal requirements, and improving our platform. We do not share or sell your data to third parties, except as necessary to comply with legal obligations or to provide services with trusted partners.
            </li>
            <li className={classes.liObj}>
                We implement advanced security measures, including encryption and secure servers, to ensure that your information is protected. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.
            </li>
            <li className={classes.liObj}>
                You have the right to access, update, and delete your personal information at any time. If you have any questions or concerns about your data, or if you wish to exercise your rights, please contact our support team at support@lawcrats.com.
            </li>
            <li className={classes.liObj}>
                LawCrats reserves the right to modify this Privacy Policy at any time. Any changes will be posted on this page, and your continued use of our services constitutes your acceptance of the updated policy.
            </li>
            <li className={classes.liObj}>
                Last updated: [Insert Date]
            </li>
        </ol>
      </DialogContent>
      <DialogActions>
        support@lawcrats.com
      </DialogActions>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
