import React from "react";
import "./login.module.css";
import { Grid, Paper } from "@mui/material";

const Login = ()=>{
    const handleSubmit = async(e)=>{
        e.preventDefault()
    }
    const paperStyle = {
        width : 280,
        height: '70vh',
        
    }
    return (
    <>
        <div>
            <Grid className="login-container">
                <div className="large-size">
                    Image
                </div>
                <Paper elevation={10} style={paperStyle}>
                    Login In
                </Paper>
            </Grid>
        </div>
    </>
    )
    
}

export default Login;

