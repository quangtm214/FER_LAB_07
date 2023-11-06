
import { useFormik } from "formik";

import { TextField, Button } from "@mui/material";
import * as React from 'react';
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DisplaySettings } from "@mui/icons-material";

import * as Yup from 'yup';
export default function UpdateUser() {
    const user = useParams();

    const [open, setOpen] = useState(false);

    const [APIData, setAPIData] = useState([]);
    const getUserUrl = `https://6536075cc620ba9358ece24a.mockapi.io/api/v1/user/${user.id}`;

    useEffect(() => {
        axios.get(getUserUrl).then(
            response => {

                return response.data;
            })
            .then(data => { setAPIData(data) })
            .catch(error => console.log(error.message));

    }, [getUserUrl])
    const handleClose = () => {
        setOpen(false);
    };
    const putUserUrl = 'https://6536075cc620ba9358ece24a.mockapi.io/api/v1/user';


    const formik = useFormik({
        enableReinitialize: true,

        initialValues: APIData,

        onSubmit: (values) => {
            axios.put(putUserUrl + `/${user.id}`, values)
                .then(response => response.data)
                .then(data => setOpen(true))
                .catch(error => console.log(error.message));
        },

        validationSchema: Yup.object({
            username: Yup.string().required("Required.").typeError("please enter name"),
            password: Yup.string().required("Required.").typeError("please enter password"),

        }),

    });

    return (
        <div>
            <h1 className="font-pages">Update staff</h1>

            <form onSubmit={formik.handleSubmit}>

                <div>
                    Username: <TextField
                        label=""
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}

                    /></div>

                <div> Password: <TextField
                    label=""
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                /></div>


                <div>
                    <Button variant="contained" size="small"
                        type='submit'>
                        Save
                    </Button>
                </div>

            </form>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Congraturation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Update successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button><Link to='/' style={{ textDecoration: "none" }}>Home</Link></Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>



        </div>


    )
}