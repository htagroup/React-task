import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

//  For pagination
import { DataGrid } from '@mui/x-data-grid';
// Material ui
import { Dialog, DialogActions, TextField, Button, DialogTitle, DialogContent } from '@mui/material';

// Api
import { CreateComments } from "../../services/CommentApis"
import { AllFeedback } from "../../services/FeedbackApis"

import { useFormik } from "formik";
import * as yup from "yup";

const buttonBack = {
    display: "block",
    marginLeft: "auto",
    padding: "5px 10px",
    border: "1px solid #000",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0 5px",
}

const errorText = {
    color: "#d50000",
    fontSize: "14px",
    marginTop: "5px",
}

export default function Index() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [feedbackID, setFeedbackID] = useState(null);
    const [data, setData] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const getFeedback = (async () => {
        const response = await AllFeedback();
        if (response.status) {
            setData(response.data)
        }
    }, []);

    useEffect(() => {
        getFeedback();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 40 },
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'user', headerName: 'User', width: 150 },
        { field: 'description', headerName: 'Description', width: 250 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: ({ row }) => {
                return (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <button style={buttonBack} onClick={() => navigate('/dashboard/create-feedback')}>Create</button>
                        <button style={buttonBack} onClick={() => {
                            setFeedbackID(row.id)
                            setOpen(true);
                        }}
                        >Comments</button>
                    </div>
                );
            },
        },
    ];

    const rows = [
        { id: 1, title: 'Snow', user: 'Jon', description: 'No Desc',age: 35 },
        { id: 2, title: 'Lannister', user: 'Cersei', description: 'No Desc',age: 42 },
        { id: 3, title: 'Lannister', user: 'Jaime', description: 'No Desc',age: 45 },
        { id: 4, title: 'Stark', user: 'Arya', description: 'No Desc',age: 16 },
        { id: 5, title: 'Targaryen', user: 'Daenerys', description: 'No Desc',age: null },
        { id: 6, title: 'Melisandre', user: 'Daene', description: 'No Desc',age: 150 },
        { id: 7, title: 'Clifford', user: 'Ferrara', description: 'No Desc',age: 44 },
        { id: 8, title: 'Frances', user: 'Rossini', description: 'No Desc',age: 36 },
        { id: 9, title: 'Roxie', user: 'Harvey', description: 'No Desc',age: 65 },
        { id: 10, title: 'Roxie', user: 'Harvey', description: 'No Desc',age: 30 },
    ];

    const formik = useFormik({
        initialValues: {
            content: "",
            feedback_id: "",
        },
        validationSchema: yup.object({
            content: yup.string().required('This field is required'),
        }),
        onSubmit: (values) => {
            values.feedback_id = feedbackID;
            (async () => {
                const data = JSON.stringify(values)
                try {
                    const response = await CreateComments(data);
                    if (response.status) {
                        setTimeout(() => {
                            setOpen(false);
                        }, 200);
                    }
                } catch (error) {
                    console.log(error, 'error')
                }
            })();
        },
    });

    return (
        <>
            <h1>Feedback List</h1>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Comments</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={5}
                            autoComplete="off"
                            size="small"
                            label="Description"
                            sx={{ width: "500px" }}
                            value={formik.values.content}
                            onChange={(e) => {
                                formik.setFieldValue("content", e.target.value);
                            }}
                        />
                        {formik.touched.content && formik.errors.content ? (
                            <div style={errorText}>{formik.errors.content}</div>
                        ) : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Subscribe</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
