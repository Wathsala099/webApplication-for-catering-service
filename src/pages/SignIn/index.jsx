import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserService from '../../service/UserService';
import swal from 'sweetalert';
import backImg2 from "../../assets/images/spices.avif";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Sasaara Catering
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    window.document.cookie = `_id=''`;
    console.log(window.API_URL);
    try {

      const uResponse = await UserService.findUser({
        email: data.get('email'),
        password: data.get('password'),
      });
      if (uResponse.status === 200) {
        if (uResponse.data.data.type == 'admin') {
          swal({
            title: "Sign In Successful!",
            text: "",
            icon: "success",
            timer: 1500,
            buttons: false,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((res) => {
            window.document.cookie = `_id=${uResponse.data.data._id}`;
            window.location.assign('/da');
          })
        } else if (uResponse.data.data.type == 'user') {
          if (uResponse.data.data.isactive) {
            swal({
              title: "Sign In Successful!",
              text: "",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              buttons: false,
              showConfirmButton: false,
            }).then((res) => {
              window.document.cookie = `_id=${uResponse.data.data._id}`;
              window.location.assign('/h');
            })
          } else {
            swal({
              title: 'Account Suspended!',
              text: 'Sorry, your account has been suspended for violating our terms of service.',
              icon: "warning",
            })
          }
        }
      }
      else {
        swal({
          title: 'Oops...',
          text: 'Something went wrong!',
          icon: "error",
        })
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundImage: backImg2,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>

                </Grid>
                <Grid item>
                  <Link href="/su" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}