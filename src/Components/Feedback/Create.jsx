import React from 'react';
import { useNavigate } from "react-router-dom";
import { FormControl, TextField } from '@mui/material';

import { useFormik } from "formik";
import * as yup from "yup";

// Api
import { CreateFeedback } from "../../services/FeedbackApis";

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

const buttonBack = {
    display: "block",
    marginLeft: "auto",
    padding: "7px 30px",
    border: "1px solid #000",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "30px"
}

const boxwidth = {
    width: "100%",
}

export default function Create() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
        },
        validationSchema: yup.object({
            title: yup.string().required('This field is required'),
            description: yup.string().required("This field is required"),
            category: yup.string().required("This field is required"),
        }),
        onSubmit: (values) => {
            (async () => {
                const data = JSON.stringify(values)
                try {
                    const response = await CreateFeedback(data);
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
        <div>
            <button style={buttonBack} onClick={() => navigate('/dashboard')}>Back</button>
            <h2 style={{ margin: 0, color: "#000" }}>Create Feedback</h2>
            <form onSubmit={formik.handleSubmit} style={{ marginTop: "20px" }}>
                <div style={boxwidth}>
                    <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
                        <TextField
                            autoComplete="off"
                            size="small"
                            label="Title"
                            value={formik.values.title}
                            onChange={(e) => {
                                formik.setFieldValue("title", e.target.value);
                            }}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div style={errorText}>{formik.errors.title}</div>
                        ) : null}
                    </FormControl>
                    <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={5}
                            autoComplete="off"
                            size="small"
                            label="Description"
                            value={formik.values.description}
                            onChange={(e) => {
                                formik.setFieldValue("description", e.target.value);
                            }}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div style={errorText}>{formik.errors.description}</div>
                        ) : null}
                    </FormControl>
                    <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
                        <TextField
                            autoComplete="off"
                            size="small"
                            label="category"
                            value={formik.values.category}
                            onChange={(e) => {
                                formik.setFieldValue("category", e.target.value);
                            }}
                        />
                        {formik.touched.category && formik.errors.category ? (
                            <div style={errorText}>{formik.errors.category}</div>
                        ) : null}
                    </FormControl>
                </div>
                <button type='submit' style={buttonStyle}>Submit Feedback</button>
            </form>
        </div>
    );
}