import React from "react";
import { makeStyles } from "@mui/styles";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';


const useStyles = makeStyles(()=>({
    dropDownContainer : {
        position: "fixed",
        top: "75px",
        right: "25px",
        backgroundColor: "white",
        border: '1px solid #ddd',
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '5px',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // height: "33vh",
        // width: "20vw",
    },
    CTALine : {
        display: "flex",
        flexDirection: "row",
        padding: "8px",
        justifyContent: 'flex-start',
        gap: "20px",
        color: "#808080",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s ease, color 0.3s ease",
        "&:hover":{
            backgroundColor: "#f0f4f9",
        },
    },
}));
const Popup = ({ showProfileIconDropdown }) => {
    const classes = useStyles();
    if (!showProfileIconDropdown) return null;

    return (
        <div className={classes.dropDownContainer}>
            <div className={classes.CTALine}><PersonOutlineOutlinedIcon/><span>My Profile</span></div>
            <div className={classes.CTALine}><HomeOutlinedIcon/><span>Home Page</span></div>
            <hr style={{border: "none", borderTop: "1.5px solid #E0DDDD"}}/>
            <div className={classes.CTALine}><DiamondOutlinedIcon/><span>Upgrade to Premium</span></div>
            <hr style={{border: "none", borderTop: "1.5px solid #E0DDDD"}}/>
            <div className={classes.CTALine}><LogoutOutlinedIcon/><span>Logout</span></div>
        </div>
    );
};

export default Popup;