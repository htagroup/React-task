import React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, FormControl, TextField } from '@mui/material';

import { useFormik } from "formik";
import * as yup from "yup";

// Api
import { RegisterUser } from "../services/AuthApis";

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

export default function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required('This field is required'),
            email: yup.string().email().required('This field is required').max(40),
            password: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters'),
            confirm_password: yup
                .string()
                .required("Confirm Password required")
                .oneOf([yup.ref("password")], "Password does not match"),
        }),
        onSubmit: (values) => {
            (async () => {
                const data = JSON.stringify(values)
                try {
                    const response = await RegisterUser(data);
                    if (response.status) {
                        setTimeout(() => {
                            navigate("/")
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
                <h2 style={{ margin: 0, color: "#000" }}>Register</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div style={boxwidth}>
                        <FormControl sx={{ width: "100%", marginBottom: "15px" }}>
                            <TextField
                                size="small"
                                autoComplete="off"
                                id="standard-basic"
                                label="Name"
                                variant="standard"
                                value={formik.values.name}
                                onChange={(e) => {
                                    formik.setFieldValue("name", e.target.value);
                                }}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div style={errorText}>{formik.errors.name}</div>
                            ) : null}
                        </FormControl>
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
                        <FormControl sx={{ width: "100%", marginBottom: "15px" }}>
                            <TextField
                                type="password"
                                autoComplete="off"
                                size="small"
                                label="Confirm Password"
                                variant="standard"
                                value={formik.values.confirm_password}
                                onChange={(e) => {
                                    formik.setFieldValue("confirm_password", e.target.value);
                                }}
                            />
                            {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                <div style={errorText}>{formik.errors.confirm_password}</div>
                            ) : null}
                        </FormControl>
                    </div>
                    <button type='submit' style={buttonStyle}>Register</button>
                </form>
                <p onClick={() => navigate('/')} style={{ color: "#000", fontSize: "15px", cursor: "pointer", textDecoration: "underline" }}>Login</p>
            </div>
        </Box>
    );
}