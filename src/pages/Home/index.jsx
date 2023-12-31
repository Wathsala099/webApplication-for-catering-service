import * as React from "react";
import { Component } from "react";

import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import profileImage from "../../assets/images/profileImage.jpg";
import Button from "@mui/material/Button";
import { Badge, CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputBase, InputLabel, Paper, Rating, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import SignIn from "../SignIn";
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import swal from 'sweetalert';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import PostForm from "../../components/PostForm";
import EditProfile from "../../components/EditProfile";
import ChangeProfileImage from "../../components/ChangeProfileImage";
import UserService from "../../service/UserService";
import PostService from "../../service/PostService";
import axios from "axios";
import '../../config';
import moment from "moment";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewListIcon from '@mui/icons-material/ViewList';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkout from "../../components/Checkout";
import ProductService from "../../service/ProductService";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FeedbackForm from "../../components/FeedbackForm";
import SignInModal from "../SignInModal";
import Slideshow from "../../components/Slider";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/h">
                Sasaara Catering
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElNav: null,
            selectItem: null,
            selectItemQty: 1,
            selectItemRating: 0,
            feedbackList: [],
            userFeedback: '',
            value: 1,
            tabValue: 0,
            notificationFormValue: 0,
            bookingTabValue: 0,
            profileTabValue: 0,
            categorTabValue: 0,
            reminderDate: new Date(),
            anchorEl: true,
            openLogin: false,
            signInIcon: null,
            user: null,
            selectUser: null,
            productList: [],
            userPostList: [],
            searchValue: '',
            searchPostList: [],
            notificationList: [],
            cartList: [],
            orderList: [],
            reservationList: [],
            page_count: 1,
            itemView: false,
            selectOrder: null,
        }
    }





    componentDidMount() {
        this.loadProducts()
        // console.log(window.document.cookie);
        // if (window.document.cookie.split('_id=')[1] != '') {
        //     window.user_id = window.document.cookie.split('_id=')[1];
        //     this.getUser(window.user_id);
        // } else {
        //     window.document.cookie = `_id=''`;
        //     window.location.assign('/');
        // }
    }

    // getUser = async (id) => {
    //     const res = await UserService.getUser({
    //         user_id: id,
    //         target_id: id,
    //     })
    //     if (res.status === 200) {
    //         this.setState({ user: res.data.data })

    //     } else {
    //         console.log("fetching error: " + res)
    //     }
    // }

    getUserData = (data) => {
        this.setState({ user: data })
        console.log("get " + data._id)
    }

    clearCart = (data) => {
        console.log("clear cart");
        this.setState({ cartList: [] })
    }

    feedbackSubmit = async (event) => {
        if (this.state.user) {
            if (this.state.userFeedback != "") {
                let response = await ProductService.addFeedback({
                    user_id: this.state.user._id,
                    product_id: this.state.selectItem._id,
                    feedback: this.state.userFeedback,
                })
                if (response.status === 200) {
                    if (!response.data.error) {
                        swal("Saved!", "success", "success");
                    }
                } else {
                }
            } else {
                swal("Please add feedback!", "", "error");
            }
        } else {
            swal("Sign In Unsuccessful!", "Please Sign In", "error")
        }

    };



    loadProducts = async () => {
        await this.setState({ productList: [] })
        const res = await ProductService.getAllProducts({
            page: this.state.page_count,
        });
        if (res.status === 200) {
            if (!res.data.error) {
                this.setState({ productList: res.data.data })
            }
        } else {
            console.log("fetching error: " + res)
        }
    }


    getProductByCategory = async (data) => {
        await this.setState({ productList: [] })
        const res = await ProductService.getProductByCategory({
            page: this.state.page_count,
            value: data
        });
        if (res.status === 200) {
            if (!res.data.error) {
                this.setState({ productList: res.data.data })
            }
        } else {
            console.log("fetching error: " + res)
        }
    }



    searchProduct = async (value) => {
        this.setState({
            productList: [],
            tabValue: 0
        })
        const res = await ProductService.findProduct({
            page: this.state.page_count,
            searchvalue: value,
        })
        if (res.status === 200) {
            if (!res.data.error) {
                this.setState({
                    productList: res.data.data,
                    tabValue: 0
                })
            } else {
                this.setState({
                    productList: [],
                    tabValue: 0
                })
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    addtoCart = async (data, qty) => {
        if (qty != "" && parseFloat(data.qty) >= parseFloat(qty)) {
            this.state.cartList.push({
                user_id: window.user_id,
                product_id: data._id,
                product: data,
                stock_qty: data.qty - qty,
                qty: qty,
            })
            swal("Added!", "success", "success");
            this.setState({ tabValue: 0 })
        } else {
            swal("Out Of Stock!", "", "error");
        }
    }

    addRating = async (data, val) => {
        if (this.state.user) {
            let response = await ProductService.addFeedback({
                user_id: this.state.user._id,
                product_id: data._id,
                rating: val,
                feedback: '',
            })
            if (response.status === 200) {
                if (!response.data.error) {
                    this.setState({ selectItemRating: val })
                    swal("Saved!", "success", "success");
                }
            } else {
            }
        } else {
            swal("Sign In Unsuccessful!", "Please Sign In", "error")
        }
    }

    addFeedback = async (data, val) => {
        if (this.state.user) {
            let response = await ProductService.addFeedback({
                user_id: this.state.user._id,
                product_id: data._id,
                feedback: val,
            })
            if (response.status === 200) {
                if (!response.data.error) {
                    swal("Saved!", "success", "success");
                }
            } else {
            }
        } else {
            swal("Sign In Unsuccessful!", "Please Sign In", "error")
        }
    }

    loadOrders = async () => {
        const res = await ProductService.loadOrders({
            user_id: this.state.user._id,
        });
        if (res.status === 200) {
            if (!res.data.error) {
                this.setState({ orderList: res.data.data })
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    loadRating = async (id) => {
        const res = await ProductService.loadAllFeedbacks({
            product_id: id
        });
        if (res.status === 200) {
            if (!res.data.error) {
                var list = res.data.data;
                var number = 0;
                for (let i = 0; i < list.length; i++) {
                    number = parseFloat(number) + parseFloat(list[i].rating);
                }
                this.setState({
                    selectItemRating: number / list.length,
                    feedbackList: list
                })
            }
        } else {
            console.log("fetching error: " + res)
        }
    }


    updateOrder = async (data, status) => {
        const res = await ProductService.updateOrderStatus(
            {
                order_id: data._id,
                status: status
            }
        );
        if (res.status === 200) {
            if (!res.data.error) {
                this.loadOrders()
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    updateUser = async () => {
        let formData = this.state.user

        let response = await UserService.updateUser(formData)
        if (response.status === 200) {
            if (!response.data.error) {
                swal("Updated!", "success", "success");
                this.clearData()
            }
        } else {
        }
    };


    render() {
        let { classes } = this.props;

        const navTabChange = (event, newValue) => {
            this.loadProducts()
            this.loadOrders()
            this.setState({ tabValue: newValue });
        };
        

        const categoryTabHandleChange = (event, newValue) => {
            this.setState({
                productList: [],
            })
            if (newValue == 0) {
                this.loadProducts()
            }
            if (newValue == 1) {
                this.getProductByCategory("Packeges")
            }
            if (newValue == 2) {
                this.getProductByCategory("Catering Items")
            }
            if (newValue == 3) {
                this.getProductByCategory("Traditional")
            }
            if (newValue == 4) {
                this.getProductByCategory("Sweets")
            }
            this.setState({ categorTabValue: newValue });
        };

        const handleOpenNavMenu = (event) => {
            this.setState({ anchorElNav: event.currentTarget });
        };

        const handleCloseNavMenu = () => {
            this.setState({ anchorElNav: null });
        };
        const logout = () => {
            this.setState({ user: null });
            window.location.assign('/');
            this.setState({ tabValue: 0 });
        };

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2, padding: theme.spacing(1),
            textAlign: 'center', color: theme.palette.text.secondary,
        }));

        const signInHandleMenu = (event) => {
            this.setState({ signInIcon: event.currentTarget });
        };

        const signUpHandleClose = () => {
            this.setState({ signInIcon: null });
        };


        return (
            <div >
                <div className={classes.back__floor}>

                    <div className={classes.nav__bar}
                    // style={{ backgroundImage: `url(${navBack})` }}
                    >
                        <div className={classes.nav__item}>

                            <h3 className={classes.nav__head}>Sasaara Catering</h3>
                        </div>
                        <div className={classes.nav__item}>
                            <Typography sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                                height={"40px"} textAlign="center">

                            </Typography>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '40vw' }} justifyContent="space-around" >
                                <Stack style={{ backgroundColor: 'rgb(225 225 225)', borderRadius: '15px' }} spacing={3} direction="row" justifyContent="center" alignItems="center">
                                    <InputBase
                                        sx={{ ml: 1, flex: 1, width: '100%' }}
                                        placeholder="Search Product.."
                                        inputProps={{ 'aria-label': 'search product' }}
                                        onChange={e => e.target.value != '' ? this.searchProduct(e.target.value) : this.loadProducts()}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                                        <SearchIcon />
                                    </IconButton>
                                </Stack>
                                <Tabs value={this.state.tabValue} onChange={navTabChange}
                                    aria-label="basic tabs">
                                    <Tab label="Home" {...a11yProps(0)} />
                                    {this.state.user &&
                                        <Tab label="My Orders" {...a11yProps(1)} />
                                    }

                                </Tabs>
                            </Box>

                        </div>
                        <div className={classes.nav__item}>
                            <IconButton size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{ display: { xs: 'block', md: 'none' }, }}>
                                <MenuIcon />
                            </IconButton>

                            <Menu id="menu-appbar"
                                anchorEl={this.state.anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                                open={Boolean(this.state.anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'fex', md: 'none' }, }}>

                                <Tabs orientation="vertical" value={this.state.tabValue} onChange={navTabChange}
                                    aria-label="menu tabs">
                                    <Tab label="Products" {...a11yProps(0)} />
                                    <Tab label="Orders" {...a11yProps(1)} />

                                </Tabs>
                            </Menu>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Tooltip title="My cart">
                                    <IconButton color="primary" aria-label="add to shopping cart"
                                        onClick={() => {
                                            this.setState({ tabValue: 2 })
                                        }}>
                                        <Badge color="success" badgeContent={this.state.cartList.length}>
                                            <ShoppingCartIcon style={{ color: 'black' }} />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>

                                {!this.state.user &&
                                    <SignInModal getUserInfo={this.getUserData.bind(this)} />
                                }

                                {this.state.user &&
                                    <Chip
                                        avatar={<Avatar alt=""
                                            src={this.state.user ? window.IMAGE_URL + this.state.user.img : profileImage} />}
                                        label={this.state.user ? this.state.user.firstname : ''}
                                        variant="outlined"
                                        onClick={signInHandleMenu}
                                        sx={{ ml: '5px' }}
                                    />}
                                <Menu anchorEl={this.state.signInIcon}
                                    id="account-menu"
                                    open={Boolean(this.state.signInIcon)}
                                    onClose={signUpHandleClose}
                                    onClick={signUpHandleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32, height: 32, ml: -0.5, mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block', position: 'absolute',
                                                top: 0, right: 14, width: 10, height: 10,
                                                bgcolor: 'background.paper', zIndex: 0,
                                                transform: 'translateY(-50%) rotate(45deg)',
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={() => {
                                        this.setState({ tabValue: 5 })
                                    }}>
                                        <Avatar fontSize="small" /> Profile
                                    </MenuItem>
                                    <Divider />

                                    <MenuItem onClick={logout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    {/*-------------------------------------------- Products --------------------------- */}
                    <TabPanel value={this.state.tabValue} index={0} >
                        <Slideshow></Slideshow>
                        <Stack
                            alignItems="center"
                            spacing={2}>
                            <Tabs
                                value={this.state.categorTabValue}
                                onChange={categoryTabHandleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="customer tabs"
                            >
                                <Tab value={0} label="All " />
                                <Tab value={1} label="Packeges" />
                                <Tab value={2} label="Catering Items" />
                                <Tab value={3} label="Traditional" />
                                <Tab value={4} label="Sweets" />
                            </Tabs>

                            <ThemeProvider theme={defaultTheme}>

                                <main>
                                    <TabPanel value={0} index={0}>
                                        {/* Hero unit */}

                                        <Container sx={{ py: 12 }} style={{ width: '88vw' }}>

                                            {/* End hero unit */}
                                            <Grid container spacing={4}>
                                                {this.state.productList.map((card) =>
                                                    card.isactive && (

                                                        <Grid item key={card} xs={12} sm={6} md={4}>
                                                            <Card
                                                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                                            >
                                                                <CardActionArea onClick={() => {
                                                                    this.loadRating(card._id)
                                                                    this.setState({
                                                                        selectItem: card,
                                                                        selectItemQty: 1,
                                                                        tabValue: 4
                                                                    })
                                                                }}>
                                                                    <CardMedia
                                                                        component="div"
                                                                        sx={{
                                                                            // 16:9
                                                                            pt: '56.25%',
                                                                        }}
                                                                        image={window.IMAGE_URL + card.img}
                                                                    />

                                                                    {/* <CardMedia
                                                        component="img"
                                                        height="300"
                                                        image={window.IMAGE_URL + props.postData.post_img}
                                                        alt="image"
                                                        style={{
                                                            height: '100%', backgroundPosition: 'center',
                                                            backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                                                        }}
                                                    /> */}
                                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                                        <Typography gutterBottom variant="h5" component="h2">
                                                                            {card.title}
                                                                        </Typography>
                                                                        <Typography>
                                                                            {card.category ? card.category : ''}
                                                                        </Typography>
                                                                        <Typography>
                                                                            Rs.{card.price ? card.price : '0'}
                                                                        </Typography>
                                                                    </CardContent>
                                                                </CardActionArea>
                                                                {/* <CardActions>
                                                        <FeedbackForm data={card} username={this.state.user ? this.state.user.firstname : window.user_id} />
                                                        <PostForm data={card} user_id={window.user_id} addtoCart={this.getCartData.bind(this)} />
                                                    </CardActions> */}
                                                            </Card>
                                                        </Grid>
                                                    )

                                                )}

                                            </Grid>
                                        </Container>
                                    </TabPanel>
                                </main>
                                {/* Footer */}
                                <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                                    <Typography variant="h6" align="center" gutterBottom>
                                        Sasaara Catering
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        align="center"
                                        color="text.secondary"
                                        component="p"
                                    >
                                        {/* Something here to give the footer a purpose! */}
                                    </Typography>
                                    <Copyright />
                                </Box>
                                {/* End footer */}
                            </ThemeProvider>
                        </Stack>

                    </TabPanel>


                    {/*-------------------------------------------- cart --------------------------- */}
                    <TabPanel value={this.state.tabValue} index={2} >
                        <Stack sx={{ p: 12, my: 10 }}>
                            <Typography variant="h6" gutterBottom>
                                My Cart List
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Unit Price</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">Total Amount</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.cartList.map((row, i) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{row.product.title + " " + row.product.desc}</TableCell>
                                            <TableCell align="right">{`${row.product.price}`}</TableCell>
                                            <TableCell align="right">{row.qty}</TableCell>
                                            <TableCell align="right">{`${row.qty * row.product.price}`}.00</TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() => {
                                                    var list = this.state.cartList
                                                    this.setState({ cartList: [] })
                                                    list.splice(i, 1)
                                                    this.setState({ cartList: list })
                                                }}>
                                                    <BackspaceIcon style={{ color: 'red' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Stack direction="row" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                {this.state.cartList.length > 0 &&
                                    <Chip
                                        label="Checkout"
                                        color="success"
                                        style={{ width: '12%', }}
                                        onClick={() => {
                                            this.state.user !== null ?
                                                this.setState({
                                                    tabValue: 3,
                                                })
                                                :
                                                swal("Sign In Unsuccessful!", "Please Sign In", "error")
                                        }
                                        }
                                    />}
                            </Stack>

                        </Stack>

                    </TabPanel>

                    {/*-------------------------------------------- Checkout --------------------------- */}
                    <TabPanel value={this.state.tabValue} index={3} >

                        <Checkout cartList={this.state.cartList} user={this.state.user} setCartClear={this.clearCart.bind(this)} />

                    </TabPanel>

                    {/*-------------------------------------------- Item view --------------------------- */}
                    <TabPanel value={this.state.tabValue} index={4} >
                        <Stack sx={{ p: 12, mt: 10, display: 'flex', justifyContent: 'center' }}
                            direction="row"
                            spacing={2}
                            divider={<Divider orientation="vertical" flexItem />}
                        >
                            <Stack>
                                <img alt=''
                                    src={this.state.selectItem ? window.IMAGE_URL + this.state.selectItem.img : ''}
                                    style={{
                                        width: '40vw', height: '300px', backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                                    }} />
                            </Stack>
                            <Stack spacing={1} sx={{ width: '40vw' }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.selectItem ? this.state.selectItem.title : ''}
                                </Typography>
                                <Typography>
                                    {this.state.selectItem ? this.state.selectItem.category : ''}
                                </Typography>
                                <Typography>
                                    {this.state.selectItem ? this.state.selectItem.desc : ''}
                                </Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={this.state.selectItemRating}
                                    onChange={(event, newValue) => {
                                        this.addRating(this.state.selectItem, newValue)
                                    }}
                                />
                                <Divider />
                                <Typography variant="h4" sx={{ color: 'red' }}>
                                    Rs.{this.state.selectItem ? this.state.selectItem.price : '0'}.00
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                >
                                    <TextField
                                        margin="dense"
                                        id="post_data"
                                        label="Quantity"
                                        type="number"
                                        variant="standard"
                                        value={this.state.selectItemQty}
                                        onChange={(e) => this.setState({ selectItemQty: e.target.value })}
                                    />
                                    <Typography >
                                        Only {this.state.selectItem ? this.state.selectItem.qty : '0'} items left
                                    </Typography>
                                </Stack>
                                <Button size="small" variant="contained" onClick={() => this.addtoCart(this.state.selectItem, this.state.selectItemQty)} >Add to Cart</Button>
                            </Stack>
                        </Stack>
                        <Stack sx={{ mb: 10, display: 'flex', alignItems: 'center' }}
                            direction="column"
                            spacing={2}
                        >
                            <Stack spacing={2} style={{ width: '80vw', border: '1px solid #cfc8c8', padding: '10px', borderRadius: '8px' }}

                            >
                                <span style={{
                                    fontFamily: 'Convergence',

                                    fontWeight: 'bold',
                                    letterSpacing: '1px'
                                }}>Product Reviews :</span>
                                <Divider />
                                {this.state.feedbackList.map(msg => msg.rating == 0 && (
                                    <Stack spacing={1} direction="column">
                                        <p
                                            style={{
                                                fontFamily: 'Convergence',
                                            }}
                                        >{msg.user_id.firstname}:</p>

                                        <span
                                            style={{
                                                fontFamily: 'Convergence',
                                            }}
                                        >{moment(msg.created).format("yyyy MMM DD, HH:mm")}. - {msg.feedback}</span>
                                    </Stack>
                                ))}

                                <TextField
                                    margin="dense"
                                    id="post_data"
                                    label="Feedback"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => this.setState({ userFeedback: e.target.value })}
                                />
                                <Stack sx={{ display: 'flex', alignItems: 'end' }}>
                                    <Button style={{ width: '200px' }} color="success" onClick={this.feedbackSubmit} variant="outlined" >Submit</Button>
                                </Stack>

                            </Stack>
                        </Stack>

                    </TabPanel>



                    {/*-------------------------------------------- Orders --------------------------- */}
                    <TabPanel value={this.state.tabValue} index={1}>
                        <Stack sx={{ p: 6, my: 10 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.table_head}  >Transaction Date</TableCell>
                                        <TableCell className={classes.table_head} >Order Date</TableCell>
                                        <TableCell className={classes.table_head} >Name</TableCell>
                                        <TableCell className={classes.table_head} >Ship To</TableCell>
                                        <TableCell className={classes.table_head} >Item Qty</TableCell>
                                        <TableCell className={classes.table_head} align="right">Sale Amount</TableCell>
                                        <TableCell className={classes.table_head} align="center">Dilever</TableCell>
                                        <TableCell className={classes.table_head} align="center">Status</TableCell>
                                        <TableCell className={classes.table_head} align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.orderList.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{moment(row.created).format("yyyy MMM DD")}</TableCell>
                                            <TableCell>{moment(row.date).format("yyyy MMM DD")}</TableCell>
                                            <TableCell>{row.card_name}</TableCell>
                                            <TableCell>{row.address + ", " + row.city}</TableCell>
                                            <TableCell>{row.product_list.length}
                                                <IconButton
                                                    onClick={() => {
                                                        this.setState({
                                                            selectOrder: row,
                                                            itemView: true
                                                        })
                                                    }}
                                                >
                                                    <ViewListIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">Rs.{row.total_amount}.00</TableCell>
                                            <TableCell align="center">
                                                <Chip label={row.deliver_status}
                                                    color={row.deliver_status == "Preparing" ? "default" : "info"}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip label={row.status}
                                                    color={
                                                        row.status === "pending" && "info" ||
                                                        row.status === "approved" && "success" ||
                                                        row.status === "rejected" && "warning" ||
                                                        row.status === "cancel" && "default"
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.status != "cancel" &&
                                                    <Chip
                                                        label="Cancel"
                                                        // color="warning"
                                                        onClick={() => {
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "Cancel this Order!",
                                                                icon: "warning",
                                                                buttons: true,
                                                            })
                                                                .then((a) => {
                                                                    if (a) {
                                                                        row.status = "Cancel";
                                                                        this.updateOrder(row, "cancel")
                                                                        if (moment(row.date).diff(moment(row.created), 'days') < 5 && parseFloat(row.total_amount) >= 100000) {
                                                                            swal("The Amount will not be Refunded!", {
                                                                                icon: "info",
                                                                            });
                                                                        } else {
                                                                            swal({
                                                                                title: "This Order has been Canceled!",
                                                                                text: "Refund this Order!",
                                                                                icon: "info",
                                                                                buttons: true,
                                                                            })
                                                                                .then((b) => {
                                                                                    if (b) {
                                                                                        swal("This Amount has been Refunded!", {
                                                                                            icon: "success",
                                                                                        });
                                                                                    }
                                                                                });
                                                                        }
                                                                    }
                                                                });
                                                        }}
                                                    />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Stack>
                    </TabPanel>

                    <Dialog open={this.state.itemView} style={{
                        fontFamily: 'Convergence',
                    }}>
                        <DialogTitle>Item List</DialogTitle>
                        <DialogContent sx={{ minWidth: '600px' }}>
                            <Divider />
                            <p> <span >Order status :</span> {this.state.selectOrder ? this.state.selectOrder.status : ''}</p>
                            <p> <span >Order Amount :</span> Rs.{this.state.selectOrder ? this.state.selectOrder.total_amount : '0'}.00</p>
                            <Divider />

                            <Stack spacing={3} >
                                <TableContainer component={Paper}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.table_head} >Item</TableCell>
                                                <TableCell className={classes.table_head} align="right">Qty</TableCell>
                                                <TableCell className={classes.table_head} align="right">Unit Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.selectOrder && this.state.selectOrder.product_list.map((row) => (
                                                <TableRow key={row._id}>
                                                    <TableCell>{row.title}</TableCell>
                                                    <TableCell align="right">{row.qty}</TableCell>
                                                    <TableCell align="right">{row.price}.00</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" sx={{ marginLeft: '20px' }} onClick={() => this.setState({ itemView: false })} variant="outlined">Close</Button>
                        </DialogActions>
                    </Dialog>


                    {/*-------------------------------------------- Profile --------------------------- */}
                    <TabPanel value={this.state.tabValue} index={5} >
                        <Stack sx={{ p: 12, mt: 10 }} style={{
                            fontFamily: 'Convergence',
                        }}>
                            <Stack style={{ border: '1px solid gray', padding: '10px', borderRadius: '8px' }}>
                                <h2>My Profile</h2>
                                <Divider />
                                <Stack direction="row" justifyContent="flex-start" alignItems="center"
                                    spacing={2} style={{ height: '100px' }}>
                                    <TextField value={this.state.user ? this.state.user.firstname : ''} id="outlined-basic" label="First Name" variant="outlined"
                                        style={{ width: '100%' }}
                                        onChange={(e) => {
                                            let formData = this.state.user
                                            formData.firstname = e.target.value
                                            this.setState({ formData })
                                        }} />
                                    <TextField value={this.state.user ? this.state.user.lastname : ''} id="outlined-basic" label="Last Name" variant="outlined"
                                        style={{ width: '100%' }}
                                        onChange={(e) => {
                                            let formData = this.state.user
                                            formData.lastname = e.target.value
                                            this.setState({ formData })
                                        }} />

                                </Stack>
                                <Stack direction="row" justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={2} style={{ height: '100px' }}>
                                    <TextField value={this.state.user ? this.state.user.email : ''} id="outlined-basic" label="E-mail Address" variant="outlined"
                                        style={{ width: '100%' }}
                                        onChange={(e) => {
                                            let formData = this.state.user
                                            formData.email = e.target.value
                                            this.setState({ formData })
                                        }} />
                                    <TextField value={this.state.user ? this.state.user.contact : ''} id="outlined-basic" label="Contact" variant="outlined"
                                        style={{ width: '100%' }}
                                        onChange={(e) => {
                                            let formData = this.state.user
                                            formData.contact = e.target.value
                                            this.setState({ formData })
                                        }} />
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="flex-end"
                                    alignItems="center"
                                    spacing={2} style={{ height: '80px' }}>
                                    <Button disabled={this.state.user === null}
                                        color="primary" variant="contained" style={{ fontWeight: 'bold', width: '95px', borderRadius: 15 }}
                                        onClick={()=>this.updateUser()}>
                                        Upadte
                                    </Button>
                                </Stack>
                            </Stack>

                        </Stack>

                    </TabPanel>

                </div >
            </div >
        )
    }
}

export default withStyles(styleSheet)(HomePage);


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}{...other}>
            {value === index && (
                <Box sx={{}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
