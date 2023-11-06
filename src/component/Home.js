import React from "react"
import { useEffect, useState } from "react"
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { Paper, TableContainer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Home() {

  const [APIData, setAPIData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelSucDia, setOpenDelSucDia] = useState(false);
  const [idDelete, setIdDelete] = useState(-1);
  const getNewsUrl = 'https://6536075cc620ba9358ece24a.mockapi.io/api/v1/user';
  const deleteNewsUrl = `https://6536075cc620ba9358ece24a.mockapi.io/api/v1/user`;

  useEffect(() => {
    loadStaffs();
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpenDelSucDia(false);
    loadStaffs();
  };

  const deleteStaff = () => {
    setOpen(false);
    axios.delete(deleteNewsUrl + `/${idDelete}`)
      .then(
        response => {
          return response.data;
        })
      .then(data => setOpenDelSucDia(true))
      .catch(error => console.log(error.message));

  };

  const showConfirmDeleteDialog = (id) => {
    setIdDelete(id);
    setOpen(true);

  };

  const loadStaffs = () => {

    axios.get(getNewsUrl).then(
      response => {
        return response.data;
      })
      .then(data => { setAPIData(data.sort((a, b) => { return b.age - a.age })) })
      .catch(error => console.log(error.message));


  };


  return (

    <div>

      <h1 className="font-pages">Home</h1>
      <Link to="/addUser">
        <IconButton><Button variant="outlined">Add user</Button></IconButton>
      </Link>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="left">Password</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="left">{user.password}</TableCell>

                <TableCell align="left">
                  <Stack direction="row" spacing={3}>


                    <Link to={`/updateUser/${user.id}`}>
                      <IconButton><Icon><EditIcon /></Icon></IconButton>
                    </Link>

                    <IconButton onClick={(e) => { showConfirmDeleteDialog(user.id) }}><Icon><DeleteIcon /></Icon></IconButton>


                  </Stack>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Staff"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="warning">
              <AlertTitle>Are you sure to Delete this user ?</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteStaff}>Yes</Button>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelSucDia}
        onClose={handleOk}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Delete User Successfully</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>OK</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}