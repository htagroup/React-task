import React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, FormControl, TextField } from '@mui/material';

import { useFormik } from "formik";
import * as yup from "yup";

// Api
import { LoginUser } from "../services/AuthApis";

const errorText = {
    color: "#d50000",
    fontSize: "14px",
    marginTop: "5px",
}

const buttonStyle = {
    display: "block",
    margin: "0 auto",
    padding: "7px 30px",
    border: "1px solid #000",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "30px"
}

const boxwidth = {
    width: "100%",
}

export default function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email().required('This field is required').max(40),
            password: yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            (async () => {
                const data = JSON.stringify(values)
                try {
                    const response = await LoginUser(data);
                    if (response.status) {
                        setTimeout(() => {
                            document.location.reload(navigate("/dashboard"));
                        }, 200);
                    }
                } catch (error) {
                    console.log(error, 'error')
                }
            })();
        },
    });

    return (
        <Box className="App-header">
            <div className='innerBox'>
                <h2 style={{ margin: 0, color: "#000" }}>Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div style={boxwidth}>
                        <FormControl sx={{ width: "100%", marginBottom: "15px" }}>
                            <TextField
                                autoComplete="off"
                                size="small"
                                label="Email"
                                variant="standard"
                                value={formik.values.email}
                                onChange={(e) => {
                                    formik.setFieldValue("email", e.target.value);
                                }}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={errorText}>{formik.errors.email}</div>
                            ) : null}
                        </FormControl>
                        <FormControl sx={{ width: "100%", marginBottom: "15px" }}>
                            <TextField
                                type="password"
                                autoComplete="off"
                                size="small"
                                label="Password"
                                variant="standard"
                                value={formik.values.password}
                                onChange={(e) => {
                                    formik.setFieldValue("password", e.target.value);
                                }}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div style={errorText}>{formik.errors.password}</div>
                            ) : null}
                        </FormControl>
                    </div>
                    <button type='submit' style={buttonStyle}>Login</button>
                </form>
                <p onClick={() => navigate('/register')} style={{ color: "#000", fontSize: "15px", cursor: "pointer", textDecoration: "underline" }}>Register</p>
            </div>
        </Box>
    );
}