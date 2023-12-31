import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Divider from "@mui/material/Divider";
import { Autocomplete, FormControlLabel, LinearProgress, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import UploadService from "../../service/UploadFilesService";
import Box from "@mui/material/Box";
import swal from "sweetalert";
import ProductService from "../../service/ProductService";

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: "#EEEEEE",
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);


class AddProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: {
                title: '',
                desc: '',
                qty: '',
                price: '',
                category: 'Packeges',
            },
            btnState: props.btnState,
            image1: undefined,
            image2: undefined,
            categoryList: ['Packeges', 'Catering Items', 'Traditional', 'Sweets'],

        }
    }

    componentDidMount = async () => {
        if (this.props.btnState == "Update") {
            this.setState({
                item: this.props.data,
                image2: window.IMAGE_URL + this.props.data.img
            });
        }

    }

    clearData = () => {
        this.setState({
            item: {
                title: '',
                desc: '',
                qty: '',
                price: '',
                category: 'Packeges',
            },
            btnState: this.props.btnState,
            image1: undefined,
            image2: undefined,
        })
    }

    render() {

        const {
            image1, image2
        } = this.state;


        const handleSubmit = async (event) => {
            const fileInput = document.getElementById('btn-upload');
            const file = fileInput.files[0];

            const formData = new FormData();

            if (this.state.btnState != "Update") {
                formData.append('img', file);
                formData.append('title', this.state.item.title);
                formData.append('desc', this.state.item.desc);
                formData.append('qty', this.state.item.qty);
                formData.append('price', this.state.item.price);
                formData.append('category', this.state.item.category);
                let response = await ProductService.createProduct(formData)
                if (response.status === 200) {
                    if (!response.data.error) {
                        swal("Saved!", "success", "success");
                        this.clearData()
                    }
                } else {
                }
            } else {
                formData.append('_id', this.props.data._id);
                formData.append('img', file);
                formData.append('title', this.state.item.title);
                formData.append('desc', this.state.item.desc);
                formData.append('qty', this.state.item.qty);
                formData.append('price', this.state.item.price);
                formData.append('category', this.state.item.category);
                let response = await ProductService.updateProduct(formData)
                if (response.status === 200) {
                    if (!response.data.error) {
                        swal("Updated!", "success", "success");
                        this.clearData()
                    }
                } else {
                }
            }
        };
        const selectFileOnChange = async (event) => {
            if (event.target.files.length > 0) {
                this.setState({ image2: undefined, image1: event.target.files[0] });
            }
        }


        return (
            <Stack spacing={4} style={{ border: '1px solid gray', padding: '10px', borderRadius: '4px' }}
                justifyContent="space-evenly"
                direction="row" divider={<Divider orientation="vertical" flexItem />}>
                <Stack >
                    <h2>{this.state.btnState} Product</h2>
                    <Divider />
                    <Stack direction="row" justifyContent="flex-start" alignItems="center"
                        spacing={2} style={{ height: '100px' }}>

                        <Autocomplete
                            disablePortal
                            id="combo-box-1"
                            options={this.state.categoryList}
                            getOptionLabel={option => option}
                            sx={{ width: 300 }}
                            value={this.state.item.category}
                            onChange={(event, newValue) => {
                                let formData = this.state.item
                                formData.category = newValue
                                this.setState({ formData })
                            }}
                            renderInput={(params) => <TextField {...params} label="Select Category" />}
                        />

                        <TextField value={this.state.item.title} id="outlined-basic" label="Title" variant="outlined"
                            onChange={(e) => {
                                let formData = this.state.item
                                formData.title = e.target.value
                                this.setState({ formData })
                            }} />

                    </Stack>
                    <Stack direction="row" justifyContent="flex-start" alignItems="center"
                        spacing={2} style={{ height: '100px' }}>

                        <TextField style={{ width: '100%' }} value={this.state.item.desc} id="outlined-basic" label="Desc" variant="outlined"
                            onChange={(e) => {
                                let formData = this.state.item
                                formData.desc = e.target.value
                                this.setState({ formData })
                            }} />
                    </Stack>

                    <Stack direction="row" justifyContent="flex-start"
                        alignItems="center"
                        spacing={2} style={{ height: '100px' }}>

                        <TextField value={this.state.item.qty} id="outlined-basic" label="Qty" variant="outlined"
                            onChange={(e) => {
                                let formData = this.state.item
                                formData.qty = e.target.value
                                this.setState({ formData })
                            }} />
                        <TextField value={this.state.item.price} id="outlined-basic" label="Price"
                            variant="outlined" onChange={(e) => {
                                let formData = this.state.item
                                formData.price = e.target.value
                                this.setState({ formData })
                            }} />
                    </Stack>


                </Stack>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2} sx={{ margin: '0', padding: '10px', width: '400px' }}>
                    <label htmlFor="btn-upload">
                        <input
                            multiple
                            id="btn-upload"
                            name="btn-upload"
                            style={{ display: 'none' }}
                            type="file"
                            accept="image/*"
                            onChange={selectFileOnChange} />
                        <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span">
                            Choose Image
                        </Button>
                    </label>

                    <Stack sx={{ height: '200px', minWidth: '200px' }}
                        style={{ border: '1px solid #E0E0E0', borderRadius: '3px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                        {image1 && (
                            <img alt=''
                                src={URL.createObjectURL(image1)}
                                style={{
                                    height: '100%', backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                                }} />
                        )}
                        {this.props.btnState == "Update" &&
                            <img alt=''
                                src={image2}
                                style={{
                                    height: '100%', backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                                }} />}
                    </Stack>

                    <Divider sx={{ width: '400px' }} />

                    <Stack direction="row" justifyContent="flex-end"
                        alignItems="flex-end"
                        spacing={2} style={{ height: '80%' }}>

                        <Button onClick={this.clearData} color="info" variant="contained"
                            style={{ fontWeight: 'bold', width: '95px' }}>
                            Clear
                        </Button>
                        <Button onClick={handleSubmit} color="primary"
                            variant="contained" style={{ fontWeight: 'bold', width: '95px' }}>
                            {this.state.btnState}
                        </Button>
                    </Stack>
                </Stack>

            </Stack>

        );
    }
}

export default withStyles(styleSheet)(AddProduct)