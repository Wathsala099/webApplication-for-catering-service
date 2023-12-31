import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Checkbox, FormControlLabel, Grid, InputAdornment, Link, Stack, TextField, Tooltip, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { styleSheet } from "./style";
import Chip from '@mui/material/Chip';
import SignUp from "../SignUp";
import swal from 'sweetalert';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import UserService from '../../service/UserService';


const SignInForm = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const SignInFormTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8, top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

SignInFormTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function SignInModal(props) {
    let classes = styleSheet();
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [customer, setCustomer] = React.useState(null);
    const [admin, setAdmin] = React.useState(null);
    const [driver, setDriver] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePassword = (prop) => (event) => {
        setPassword(event.target.value);
    };


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const clearData = () => {
        setCustomer(null);
        setAdmin(null);
        setDriver(null);
    }
    const clearText = () => {
        setUserName("");
        setPassword("");
    }


    const handleSubmit = async (event) => {
        // clearData();
        // const cusResponse = await CustomerService.findCustomer(id);
        // if (cusResponse.status === 200) {setCustomer(cusResponse.data.data);
        //     console.log(cusResponse.data.data);}
        // else {
        //     //console.log("sign error: " +cusResponse+", "+adResponse+", "+driverResponse)
        // }
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        console.log(data);
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
    }


    // const sendData = () => {
    //     if (customer !== null) {
    //         props.getUserInfo(customer);
    //         swal("Sign In Successful!", "Customer", "success");
    //     } else if (admin !== null) {
    //         swal("Sign In Successful!", "Admin", "success");
    //         window.location.assign('/dash');
    //     } else {
    //         swal("Sign In Unsuccessful!", "Error", "error");
    //     }
    //     clearText();
    // }

    return (
        <div>
            <Tooltip title="Sign In">
                <Chip label="Sign In" onClick={handleClickOpen} />
            </Tooltip>
            <SignInForm className={classes.login__cover} onClose={handleClose} aria-labelledby="tittle" open={open}>
                <SignInFormTitle className={classes.login__tittle} id="tittle" onClose={handleClose}>
                    WELCOME
                    <hr />
                </SignInFormTitle>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ m: 10 }}>
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
            </SignInForm>
        </div>
    );
}

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
