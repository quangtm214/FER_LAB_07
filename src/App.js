import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './component/Navigation';
import Home from './component/Home';
import AddUser from './component/AddUser';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import UpdateUser from './component/UpdateUser';
import { Avatar, Card, CardMedia, Grid, Typography } from '@mui/material';
function App() {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setOpen(true);
  }
  useEffect(() => {
    /* global google*/

    google.accounts.id.initialize({
      client_id: "553517650514-9aj1b9f2nvh7c3pa254k8tanumcu3hq3.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // also display the One Tap dialog

  }, []);


  return (
    <div className="App">


      <Navigation />
      <div id='buttonDiv'></div>
      <div>
        {user && open && (
          <Grid container spacing={2}>
            <Grid item xs={5}></Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{
                width: 151,
              }} >
                <CardMedia
                  component="img"
                  alt={user.name}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 151,
                  }}
                  image={user.picture}
                />
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={5}></Grid>
          </Grid>
        )
        }
      </div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addUser' element={<AddUser />} />
        <Route path='/updateUser/:id' element={<UpdateUser />} />

      </Routes>

    </div>
  );
}

export default App;
