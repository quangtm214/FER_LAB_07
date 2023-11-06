
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
import * as Yup from 'yup';
export default function AddUser() {

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const postUserUrl = 'https://6536075cc620ba9358ece24a.mockapi.io/api/v1/user';


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",

    },

    onSubmit: (values) => {
      values.createdAt = new Date(values.createdAt);
      axios.post(postUserUrl, values)
        .then(
          response => {
            return response.data;
          })
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
      <h1 className="font-pages">Add new staff</h1>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}

          />

          <TextField
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Stack>

        <Button variant="contained" size="small"
          type='submit'>
          Save
        </Button>

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
              <AlertTitle>Adding successful!</AlertTitle>
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