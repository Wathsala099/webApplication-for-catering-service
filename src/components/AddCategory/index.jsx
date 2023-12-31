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


class AddCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: {
                title: '',
                desc: '',
                qty: '',
                price: '',
                category: null,
            },
            btnState: props.btnState,
            image1: undefined,
            categoryList: [],

        }
    }

    clearData = () => {
        this.setState({
            item: {
                title: '',
                desc: '',
                qty: '',
                price: '',
                category: null,
            },
            btnState: this.props.btnState,
            image1: undefined,
        })
    }

    render() {

        const {
            image1,
        } = this.state;


        const handleSubmit = async (event) => {
            const fileInput = document.getElementById('btn-upload');
            const file = fileInput.files[0];

            const formData = new FormData();
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
        };
        const selectFileOnChange = async (event) => {
            if (event.target.files.length > 0) {
                this.setState({ image1: event.target.files[0] });
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

                        <TextField style={{ width: '100%' }} value={this.state.item.desc} id="outlined-basic" label="Desc" variant="outlined"
                            onChange={(e) => {
                                let formData = this.state.item
                                formData.desc = e.target.value
                                this.setState({ formData })
                            }} />
                    </Stack>

                   


                </Stack>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2} sx={{ margin: '0', padding: '10px', width: '400px' }}>
                    

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

export default withStyles(styleSheet)(AddCategory)