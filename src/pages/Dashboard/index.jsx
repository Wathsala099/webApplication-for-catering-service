/*eslint-disable*/
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { styleSheet } from "./style";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';


import {
    Avatar,
    Button,
    Chip,
    Paper,
    Rating,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import swal from 'sweetalert';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import UserService from '../../service/UserService';
import PostService from '../../service/PostService';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import BadgeIcon from '@mui/icons-material/Badge';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moment from 'moment';
import AddVehicle from '../../components/AddProduct';
import UserManage from '../../components/UserManage';
import AddProduct from '../../components/AddProduct';
import ProductService from '../../service/ProductService';
import AddCategory from '../../components/AddCategory';
import BackspaceIcon from '@mui/icons-material/Backspace';
import EditIcon from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import backImg2 from '../../assets/images/dashBack3.webp'
import { axisClasses } from '@mui/x-charts';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};



const chartSetting = {
    yAxis: [
        {
            label: 'revenue (Rs)',
        },
    ],
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'rotate(-90deg) translate(0px, -20px)',
        },
    },
};
const dataset = [
    {
        Packeges: 59,
        CateringItems: 57,
        Traditional: 86,
        Sweets: 21,
        month: 'Jan',
    },
    {
        Packeges: 50,
        CateringItems: 52,
        Traditional: 78,
        Sweets: 28,
        month: 'Fev',
    },
    {
        Packeges: 47,
        CateringItems: 53,
        Traditional: 106,
        Sweets: 41,
        month: 'Mar',
    },
    {
        Packeges: 54,
        CateringItems: 56,
        Traditional: 92,
        Sweets: 73,
        month: 'Apr',
    },
    {
        Packeges: 57,
        CateringItems: 69,
        Traditional: 92,
        Sweets: 99,
        month: 'May',
    },
    {
        Packeges: 60,
        CateringItems: 63,
        Traditional: 103,
        Sweets: 144,
        month: 'June',
    },
    {
        Packeges: 59,
        CateringItems: 60,
        Traditional: 105,
        Sweets: 319,
        month: 'July',
    },
    {
        Packeges: 65,
        CateringItems: 60,
        Traditional: 106,
        Sweets: 249,
        month: 'Aug',
    },
    {
        Packeges: 51,
        CateringItems: 51,
        Traditional: 95,
        Sweets: 131,
        month: 'Sept',
    },
    {
        Packeges: 60,
        CateringItems: 65,
        Traditional: 97,
        Sweets: 55,
        month: 'Oct',
    },
    {
        Packeges: 67,
        CateringItems: 64,
        Traditional: 76,
        Sweets: 48,
        month: 'Nov',
    },
    {
        Packeges: 61,
        CateringItems: 70,
        Traditional: 103,
        Sweets: 25,
        month: 'Dec',
    },
];
const valueFormatter = (value) => `${value}`;


export default function Dashboard() {
    let classes = styleSheet();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [itemViewOpen, setItemViewOpen] = React.useState(false);
    const [ratingViewOpen, setRatingViewOpen] = React.useState(false);
    const [rating, setRating] = React.useState([]);
    const [ratingCount, setRatingCount] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [tittle, setTittle] = React.useState("Dashboard");
    const [userList, setUserList] = React.useState([]);
    const [orderList, setUserOrderList] = React.useState([]);
    const [singleUserorderList, setSingleUserOrderList] = React.useState([]);
    const [productList, setProductList] = React.useState([]);
    const [chartDataList, setChartDataList] = React.useState([]);
    const [chartDataList1, setChartDataList1] = React.useState([]);
    const [userTabValue, setUserTabValue] = React.useState(0);
    const [itemTabValue, setItemTabValue] = React.useState(0);
    const [selectProduct, setSelectProduct] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [date, setDate] = React.useState(() => new Date());
    const [categoryWiseOrder, setCategoryWiseOrder] = React.useState([{
        Packeges: 0,
        CateringItems: 0,
        Traditional: 0,
        Sweets: 0,
        month: '',
    }]);

    React.useEffect(() => {
        console.log(window.document.cookie);
        if (window.document.cookie.split('_id=')[1] != '') {
            window.user_id = window.document.cookie.split('_id=')[1];
            loadOrders()
            loadAllUsers()
            loadAllProducts()
        } else {
            window.document.cookie = `_id=''`;
            window.location.assign('/');
        }
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
        loadAllProducts()
        loadAllUsers()
        loadOrders()

        function getTittle(newValue) {
            switch (newValue) {
                case 0:
                    return "Dashboard"
                case 1:
                    return "Orders"
                case 2:
                    return "Users List"
                case 3:
                    return "Products"
                default:
                    return "Dashboard"
            }
        }
        setTittle(getTittle(newValue))
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleItemOpen = () => {
        setItemViewOpen(true)
    }
    const handleItemClose = () => {
        setItemViewOpen(false)
    }
    const handleRatingOpen = async (id) => {
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
                setRating(list)
                setRatingCount(number / list.length)
                setRatingViewOpen(true)
            }
        } else {
            console.log("fetching error: " + res)
        }

    }
    const handleRatingClose = () => {
        setRatingViewOpen(false)
    }



    const userTabHandleChange = (event, newValue) => {
        loadAllUsers()
        setUserTabValue(newValue);
    }
    const itemTabHandleChange = (event, newValue) => {
        loadAllProducts()
        setItemTabValue(newValue);
    }



    const loadOrders = async () => {
        var monthList = []
        const res = await ProductService.loadAllOrders();
        if (res.status === 200) {
            if (!res.data.error) {
                setUserOrderList(res.data.data)
                await res.data.data.forEach(async (order, i) => {
                    const mon = moment(order.createdAt).format("MMM")
                    var data = {
                        Packeges: 0,
                        CateringItems: 0,
                        Traditional: 0,
                        Sweets: 0,
                        month: mon,
                    }

                    const index = monthList.findIndex(object => object.month === data.month);

                    if (index === -1) {
                        monthList.push(data);
                    }


                    await order.product_list.forEach((item, i) => {
                        const id = monthList.findIndex(object => object.month === mon);
                        console.log(item);
                        if (item.category === "Packeges") {
                            monthList[id].Packeges = parseFloat(monthList[id].Packeges) + (parseFloat(item.qty) * parseFloat(item.price))
                        }

                        if (item.category === "Catering Items") {
                            monthList[id].CateringItems = parseFloat(monthList[id].CateringItems) + (parseFloat(item.qty) * parseFloat(item.price))
                        }

                        if (item.category === "Traditional") {
                            monthList[id].Traditional = parseFloat(monthList[id].Traditional) + (parseFloat(item.qty) * parseFloat(item.price))
                        }

                        if (item.category === "Sweets") {
                            monthList[id].Sweets = parseFloat(monthList[id].Sweets) + (parseFloat(item.qty) * parseFloat(item.price))
                        }

                    })
                })
                await setCategoryWiseOrder(monthList)
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    const loadUserOrders = async (uid) => {
        console.log(uid);
        var monthList = []
        const res = await ProductService.loadOrders({
            user_id:uid
        });
        if (res.status === 200) {
            if (!res.data.error) {
                setSingleUserOrderList(res.data.data)
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    const updateOrder = async (data, status) => {
        const res = await ProductService.updateOrderStatus(
            {
                order_id: data._id,
                status: status
            }
        );
        if (res.status === 200) {
            if (!res.data.error) {
                loadOrders()
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    const updateOrderDelivered = async (data) => {
        const res = await ProductService.updateOrderDeliveredStatus(
            {
                order_id: data._id,
                deliver_status: data.deliver_status == "Preparing" ? "Delivered" : "Preparing"
            }
        );
        if (res.status === 200) {
            if (!res.data.error) {
                loadOrders()
            }
        } else {
            console.log("fetching error: " + res)
        }
    }


    const removeProduct = async (id) => {
        const res = await ProductService.removeProduct(
            {
                _id: id,
                status: false
            }
        );
        if (res.status === 200) {
            if (!res.data.error) {
                loadAllProducts()
                setItemTabValue(0);
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    const loadAllProducts = async () => {
        var chartDataList = []
        var chartDataList1 = []


        const res = await ProductService.getAllProducts({
            user_id: window.user_id,
            page: 1
        });
        if (res.status === 200) {
            setProductList(res.data.data)
            await res.data.data.forEach((item, i) => {
                chartDataList1.push({ id: i, value: item.qty, label: item.title })
            })
        } else {
            console.log("fetching error: " + res)
        }

        const resPackeges = await ProductService.getProductByCategory({
            value: "Packeges"
        });
        if (res.status === 200) {
            if (!res.data.error) {
                chartDataList.push({ id: 0, value: resPackeges.data.data.length, label: 'Packeges' })
            }
        }
        const resCatering = await ProductService.getProductByCategory({
            value: "Catering Items"
        });
        if (res.status === 200) {
            if (!res.data.error) {
                chartDataList.push({ id: 1, value: resCatering.data.data.length, label: 'Catering Items' })
            }
        }
        const resTraditional = await ProductService.getProductByCategory({
            value: "Traditional"
        });
        if (res.status === 200) {
            if (!res.data.error) {
                chartDataList.push({ id: 2, value: resTraditional.data.data.length, label: 'Traditional' })
            }
        }
        const resSweets = await ProductService.getProductByCategory({
            value: "Sweets"
        });
        if (res.status === 200) {
            if (!res.data.error) {
                chartDataList.push({ id: 3, value: resSweets.data.data.length, label: 'Sweets' })
            }
        }

        setChartDataList(chartDataList,)
        setChartDataList1(chartDataList1,)

    }

    const loadAllUsers = async () => {
        const res = await UserService.getAllUsers();
        if (res.status === 200) {
            setUserList(res.data.data)
        } else {
            console.log("fetching error: " + res)
        }
    }

    const changeStatus = async (id, status) => {
        const res = await UserService.adminmakeuseractive({
            user_id: id,
            active: !status,
        });
        if (res.status === 200) {
            if (!res.data.error) {
                loadAllUsers()
            }
        } else {
            console.log("fetching error: " + res)
        }
    }


    return (

        <Box sx={{ display: 'flex' }}>
            <img alt='' src={backImg2} style={{
                position: "fixed",
                width: '100vw', height: '100vh', backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', opacity: '30%',
            }} />
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <IconButton color="inherit" aria-label="open drawer" edge="start"
                            onClick={handleDrawerOpen}
                            sx={{ marginRight: 5, ...(open && { display: 'none' }), }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {tittle}
                        </Typography>

                    </Stack>
                    <Tooltip title="Logout">
                        <IconButton color="inherit"
                            onClick={() => {
                                window.document.cookie = `_id=''`;
                                window.location.assign('/')
                            }
                            }
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    Sasaara Catering
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Tabs orientation="vertical"
                    value={value} onChange={handleChange}
                    aria-label="dashboard tabs" sx={{ borderRight: 1, borderColor: 'divider' }}>


                    <Tab className={classes.tab} icon={
                        <DashboardIcon sx={{ marginRight: open ? '10px' : '22px !important' }} />} iconPosition="start"
                        label="Dashboard" {...a11yProps(0)} />
                    <Tab className={classes.tab} icon={
                        <BadgeIcon sx={{ marginRight: open ? '10px' : '22px !important' }} />} iconPosition="start"
                        label="Orders" {...a11yProps(1)} />
                    <Tab className={classes.tab} icon={
                        <PeopleIcon sx={{ marginRight: open ? '10px' : '22px !important' }} />} iconPosition="start"
                        label="Users" {...a11yProps(2)} />
                    <Tab className={classes.tab} icon={
                        <CollectionsBookmarkIcon sx={{ marginRight: open ? '10px' : '22px !important' }} />} iconPosition="start"
                        label="Products" {...a11yProps(3)} />

                </Tabs>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {/*-----------------------------------Dash-------------------------*/}
                <TabPanel value={value} index={0}>

                    <Stack spacing={4}>
                        <Stack direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                            justifyContent="center"
                            alignItems="center"
                            mt={2}>

                            <Stack className={classes.card_box}>
                                <div style={{ backgroundColor: '#27ae60' }} className={classes.card_logo_box}>
                                    <PeopleIcon style={{ fontSize: '34px' }}
                                        className={classes.card_logo} />
                                </div>
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-end" spacing={1}
                                    className={classes.card_mainAria}>
                                    <h3>Users</h3>
                                    <h2>{userList.length}</h2>
                                </Stack><Divider />
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                    alignItems="center" style={{ width: '100%', height: '40px' }}>
                                    {/* <EventIcon /><h3>Last 7 Days</h3> */}
                                </Stack>
                            </Stack>


                            <Stack className={classes.card_box}>
                                <div style={{ backgroundColor: '#f39c12' }} className={classes.card_logo_box}>
                                    <CollectionsBookmarkIcon style={{ fontSize: '34px' }}
                                        className={classes.card_logo} />
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                    alignItems="flex-end" spacing={1}
                                    className={classes.card_mainAria}>
                                    <h3>Products</h3>
                                    <h2>{productList.length}</h2>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                    alignItems="center" style={{ width: '100%', height: '40px' }}>
                                    {/* <EventIcon /><h3>Last 7 Days</h3> */}
                                </Stack>
                            </Stack>

                            <Stack className={classes.card_box}>
                                <div style={{ backgroundColor: '#8e44ad' }} className={classes.card_logo_box}>
                                    <BadgeIcon style={{ fontSize: '34px' }}
                                        className={classes.card_logo} />
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                    alignItems="flex-end" spacing={1}
                                    className={classes.card_mainAria}>
                                    <h3>Orders</h3>
                                    <h2>{orderList.length}</h2>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                    alignItems="center" style={{ width: '100%', height: '40px' }}>
                                    {/* <EventIcon /><h3>Last 7 Days</h3> */}
                                </Stack>
                            </Stack>

                        </Stack>
                        <Stack direction="column"
                            justifyContent="space-around"
                            alignItems="flex-start"
                            spacing={2}
                            style={{ border: '1px solid #E0E0E0', borderRadius: '3px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
                        >

                            <Stack direction="row" width="100%" textAlign="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                <Box flexGrow={1}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.5em' }}>Category</Typography>
                                    <PieChart
                                        series={[
                                            {
                                                data: chartDataList,
                                                innerRadius: 30,
                                                outerRadius: 100,
                                                paddingAngle: 5,
                                                cornerRadius: 5,
                                                startAngle: -90,
                                                endAngle: 180,
                                                cx: 150,
                                                cy: 150,
                                            },
                                        ]}
                                        width={400}
                                        height={300}
                                    // margin= { {left: 20 }}
                                    />
                                </Box>

                                <Box flexGrow={1}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.5em' }}>Products</Typography>
                                    <PieChart
                                        series={[
                                            {
                                                // paddingAngle: 5,
                                                innerRadius: 60,
                                                outerRadius: 100,
                                                data: chartDataList1,
                                            },
                                        ]}
                                        // margin={{ right: 5 }}
                                        width={500}
                                        height={300}
                                    // legend={{ hidden: true }}
                                    />
                                </Box>

                            </Stack>


                            <Stack direction="row" width="100%" textAlign="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                <Box flexGrow={1} sx={{ display: 'flex' }} width="100%" justifyContent="center" alignItems="center">
                                    <BarChart
                                        dataset={categoryWiseOrder}
                                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                                        series={[
                                            { dataKey: 'Packeges', label: 'Packeges', valueFormatter },
                                            { dataKey: 'CateringItems', label: 'Catering', valueFormatter },
                                            { dataKey: 'Traditional', label: 'Traditional', valueFormatter },
                                            { dataKey: 'Sweets', label: 'Sweets', valueFormatter },
                                        ]}
                                        {...chartSetting}
                                        margin={{ right: 5 }}
                                        width={1000}
                                    />
                                </Box>

                            </Stack>

                        </Stack>
                    </Stack>
                </TabPanel>

                <Dialog open={itemViewOpen} onClose={handleItemClose} style={{
                    fontFamily: 'Convergence',
                }}>
                    <DialogTitle>Item List</DialogTitle>
                    <DialogContent sx={{ minWidth: '600px' }}>
                        <Divider />
                        <p> <span >Order status :</span> {selectedOrder ? selectedOrder.status : ''}</p>
                        <p> <span >Order Amount :</span> Rs.{selectedOrder ? selectedOrder.total_amount : '0'}.00</p>
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
                                        {selectedOrder && selectedOrder.product_list.map((row) => (
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
                        <Button color="secondary" sx={{ marginLeft: '20px' }} onClick={handleItemClose} variant="outlined">Close</Button>
                    </DialogActions>
                </Dialog>

                {/*----------------------------------order-------------------------*/}
                <TabPanel value={value} index={1}>
                    <Stack>
                        <h2>Orders</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: '60vw' }} className={classes.table} aria-label="booking table">

                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.table_head} >Date</TableCell>
                                        <TableCell className={classes.table_head} >Name</TableCell>
                                        <TableCell className={classes.table_head} >Ship To</TableCell>
                                        <TableCell className={classes.table_head} align="right">Item Qty</TableCell>
                                        <TableCell className={classes.table_head} align="right">Sale Amount</TableCell>
                                        <TableCell className={classes.table_head} align="center">Delivery</TableCell>
                                        <TableCell className={classes.table_head} align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderList.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{moment(row.created).format("yyyy MMM DD")}</TableCell>
                                            <TableCell>{row.user_id.firstname}</TableCell>
                                            <TableCell>{row.address + ", " + row.city}</TableCell>
                                            <TableCell align="right">{row.product_list.length}
                                                <IconButton
                                                    onClick={() => {
                                                        setSelectedOrder(row)
                                                        handleItemOpen()
                                                    }}
                                                >
                                                    <ViewListIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">{`$${row.total_amount}`}</TableCell>
                                            <TableCell align="center">
                                                <Chip label={row.deliver_status}
                                                    color={row.deliver_status == "Preparing" ? "default" : "info"}
                                                    onClick={() => {
                                                        swal({
                                                            title: "Are you sure?",
                                                            text: "Change the delivery status!",
                                                            icon: "info",
                                                            buttons: true,
                                                        })
                                                            .then((a) => {
                                                                if (a) {
                                                                    updateOrderDelivered(row)
                                                                    swal("This Order has been Delivered!", {
                                                                        icon: "success",
                                                                    });
                                                                }
                                                            });
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.status === "rejected" ? '' :
                                                    <Chip label={row.status}
                                                        color={
                                                            row.status === "pending" && "info" ||
                                                            row.status === "approved" && "success" ||
                                                            row.status === "rejected" && "warning" ||
                                                            row.status === "cancel" && "default"
                                                        }
                                                        disabled={row.status === "cancel"}
                                                        onClick={() => {
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "Accept this Order!",
                                                                icon: "info",
                                                                buttons: true,
                                                            })
                                                                .then((a) => {
                                                                    if (a) {
                                                                        row.status = "Accept";
                                                                        updateOrder(row, "approved")
                                                                        swal("This Order has been accept!", {
                                                                            icon: "success",
                                                                        });
                                                                    }
                                                                });
                                                        }}
                                                    />
                                                }{row.status === "cancel" || row.status === "approved" ? '' :
                                                    <Chip label="Reject"
                                                        color="warning"
                                                        disabled={row.status === "rejected"}
                                                        onClick={() => {
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "Reject this Order!",
                                                                icon: "warning",
                                                                buttons: true,
                                                            })
                                                                .then((a) => {
                                                                    if (a) {
                                                                        row.status = "Reject";
                                                                        updateOrder(row, "rejected")
                                                                        swal("This Order has been Reject!", {
                                                                            icon: "success",
                                                                        });
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
                        </TableContainer>

                    </Stack>
                </TabPanel>

                {/*----------------------------------user-------------------------*/}
                <TabPanel value={value} index={2}>
                    <Stack>
                        <Tabs
                            value={userTabValue}
                            onChange={userTabHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="customer tabs"
                        >
                            <Tab value={0} label="All Users" />
                            <Tab value={1} label="Update User" disabled />
                            <Tab value={2} label="User Orders" disabled />
                        </Tabs>

                        <TabPanel value={userTabValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="customer table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.table_head} align="left">Full Name</TableCell>
                                            <TableCell className={classes.table_head} align="left">Email</TableCell>
                                            <TableCell className={classes.table_head} align="left">Orders</TableCell>
                                            <TableCell className={classes.table_head} align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            userList.map((row) => (
                                                <TableRow>
                                                    <TableCell align="left">{row.firstname + " " + row.lastname}</TableCell>
                                                    <TableCell align="left">{row.email}</TableCell>
                                                    <TableCell align="left">
                                                        <Tooltip title="View Orders">
                                                            <IconButton
                                                                onClick={async() => {
                                                                     setUser(row);
                                                                    // loadUserPosts(row._id)
                                                                    await loadUserOrders(row._id);
                                                                    setUserTabValue(2);
                                                                }}
                                                            >
                                                                <FormatListBulletedIcon color="primary" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => {
                                                                setUser(row)
                                                                setUserTabValue(1);
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <Tooltip title="Set Status">
                                                            <Switch
                                                                checked={row.isactive}
                                                                onChange={() => {
                                                                    changeStatus(row._id, row.isactive)
                                                                }}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value={userTabValue} index={1}>
                            <Stack direction="column" spacing={3} justifyContent="center" >
                                <UserManage btnState="Update" data={user} />
                            </Stack>
                        </TabPanel>
                        <TabPanel value={userTabValue} index={2}>
                            {/* <Stack direction="column" spacing={3} justifyContent="center" >
                                
                            </Stack> */}
                            {/*  */}
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: '60vw' }} className={classes.table} aria-label="booking table">

                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.table_head} >Date</TableCell>
                                        <TableCell className={classes.table_head} >Name</TableCell>
                                        <TableCell className={classes.table_head} >Ship To</TableCell>
                                        <TableCell className={classes.table_head} align="right">Item Qty</TableCell>
                                        <TableCell className={classes.table_head} align="right">Sale Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {singleUserorderList.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{moment(row.created).format("yyyy MMM DD")}</TableCell>
                                            <TableCell>{row.user_id.firstname}</TableCell>
                                            <TableCell>{row.address + ", " + row.city}</TableCell>
                                            <TableCell align="right">{row.product_list.length}
                                                <IconButton
                                                    onClick={() => {
                                                        setSelectedOrder(row)
                                                        handleItemOpen()
                                                    }}
                                                >
                                                    <ViewListIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">{`$${row.total_amount}`}</TableCell>
                                            
                                            
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                            {/*  */}
                        </TabPanel>
                    </Stack>
                </TabPanel>


                {/*----------------------------------product-------------------------*/}
                <TabPanel value={value} index={3}>
                    <Stack>
                        <Tabs
                            value={itemTabValue}
                            onChange={itemTabHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="item tabs"
                        >
                            <Tab value={0} label="All Products" />
                            <Tab value={1} label="Add Products" />
                            <Tab value={2} label="Update Products" disabled />
                        </Tabs>

                        <TabPanel value={itemTabValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="item table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.table_head} align="left">Title</TableCell>
                                            <TableCell className={classes.table_head} align="left">Category</TableCell>
                                            <TableCell className={classes.table_head} align="right">Stock Quantities</TableCell>
                                            <TableCell className={classes.table_head} align="right">Unit Price</TableCell>
                                            <TableCell className={classes.table_head} align="right">Rating</TableCell>
                                            <TableCell className={classes.table_head} align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            productList.map((row) =>
                                                row.isactive && (
                                                    <TableRow>
                                                        <TableCell align="left">{row.title}</TableCell>
                                                        <TableCell align="left">{row.category}</TableCell>
                                                        <TableCell align="right">{row.qty}</TableCell>
                                                        <TableCell align="right">{row.price}.00</TableCell>
                                                        <TableCell align="right">

                                                            <IconButton
                                                                onClick={() => {
                                                                    handleRatingOpen(row._id)
                                                                }}
                                                            >
                                                                <ViewListIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Tooltip title="Update">
                                                                <IconButton
                                                                    onClick={() => {
                                                                        setSelectProduct(row)
                                                                        setItemTabValue(2);
                                                                    }}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Remove">
                                                                <IconButton
                                                                    onClick={() => {
                                                                        swal({
                                                                            title: "Are you sure?",
                                                                            text: "Remove this Product!",
                                                                            icon: "warning",
                                                                            buttons: true,
                                                                        })
                                                                            .then((a) => {
                                                                                if (a) {
                                                                                    row.isactive = false;
                                                                                    removeProduct(row._id)
                                                                                    swal("This Product has been Removed!", {
                                                                                        icon: "success",
                                                                                    });
                                                                                }
                                                                            });
                                                                    }}
                                                                >
                                                                    <BackspaceIcon style={{ color: 'red' }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value={itemTabValue} index={1}>
                            <Stack direction="column" spacing={3} justifyContent="center" >
                                <AddProduct btnState="Create" />
                            </Stack>
                        </TabPanel>
                        <TabPanel value={itemTabValue} index={2}>
                            <Stack direction="column" spacing={3} justifyContent="center" >
                                <AddProduct btnState="Update" data={selectProduct} />
                            </Stack>
                        </TabPanel>
                    </Stack>
                </TabPanel>

                <Dialog open={ratingViewOpen} onClose={handleRatingClose} style={{
                    fontFamily: 'Convergence',
                }}>
                    <DialogTitle>Product Reviews</DialogTitle>
                    <DialogContent sx={{ minWidth: '600px' }}>

                        <StyledRating
                            className={classes.disabled_component}
                            name="highlight-selected-only"
                            defaultValue={ratingCount}
                            IconContainerComponent={IconContainer}
                            getLabelText={(value) => customIcons[value].label}
                            highlightSelectedOnly
                        />
                        <Divider />

                        <Stack spacing={3} >
                            <TableContainer component={Paper}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.table_head} >User</TableCell>
                                            <TableCell className={classes.table_head} >Rating</TableCell>
                                            <TableCell className={classes.table_head} > </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rating && rating.map((row) => (
                                            <TableRow key={row._id}>
                                                <TableCell>{row.user_id.firstname}</TableCell>

                                                <TableCell>
                                                    {row.rating != 0 ?
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={row.rating}
                                                        />
                                                        : row.feedback
                                                    }
                                                </TableCell>
                                                <TableCell>{moment(row.created).format("yyyy MMM DD, HH:mm")}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" sx={{ marginLeft: '20px' }} onClick={handleRatingClose} variant="outlined">Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const drawerWidth = 200;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
