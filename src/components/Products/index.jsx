import React from "react";
import VehicleService from "../../service/VehicleService";
import {
    IconButton, InputBase, Paper,
    Stack
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import VehicleCard from "../VehicleCard";
import MediumVehicleCard from "../mediumVehicleCard";
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from "../ProductCard";
import ProductService from "../../service/ProductService";

export default function Products(props) {
    const [productList, setProductList] = React.useState([]);
    const [user, setUser] = React.useState(props.user_id);
    const [selectVehicle, setSelectVehicle] = React.useState(null);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        loadProducts()
    }, []);


    const handleChange = (event, value) => {
        setPage(value);
        console.log(page - 1)
    };

    const loadProducts = async () => {
        const res = await ProductService.getAllProducts();
        if (res.status === 200) {
            if (!res.data.error) {
                setProductList(res.data.data)
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    const searchProduct = async (value) => {
        const res = await ProductService.findProduct({ searchvalue: value })
        if (res.status === 200) {
            if (!res.data.error) {
                setProductList(res.data.data)
            } else {
                setProductList([])
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    const getVehicleData = (data) => {
        console.log("get v " + data)
        setSelectVehicle(data)
        props.setVehicle(data)
    }

    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="center" style={{ width: '98vw', minHeight: '80vh' }} >
                <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} style={{ width: '100%' }}>
                        <Stack direction="row" justifyContent="flex-start" alignItems="flex-start"
                            sx={{ display: { xs: 'none', md: 'flex' }, }} >
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: '#f1f1ff' }}
                            >
                                <Stack spacing={3} direction="row" justifyContent="center" alignItems="center">
                                    <InputBase
                                        sx={{ ml: 1, flex: 1, width: '500px' }}
                                        placeholder="Search Product"
                                        inputProps={{ 'aria-label': 'search product' }}
                                        onChange={e => e.target.value != '' ? searchProduct(e.target.value) : loadProducts()}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                                        <SearchIcon />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        </Stack>
                        <ProductCard
                            userSignIn={window.user_id}
                            setProduct={{ name: 'name', description: 'description' }}
                        /> 
                        <ProductCard
                            userSignIn={window.user_id}
                            setProduct={{ name: 'name', description: 'description' }}
                        /> 
                        <ProductCard
                            userSignIn={window.user_id}
                            setProduct={{ name: 'name', description: 'description' }}
                        />
                        {productList && productList.map(product => (
                            <ProductCard
                                userSignIn={window.user_id}
                                setProduct={{ name: 'name', description: 'description' }}
                            />
                        ))
                        }
                    </Stack>

                </Stack>

            </Stack>
        </div>
    );
}

