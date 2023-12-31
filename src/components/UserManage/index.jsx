import React from "react";
import { Component } from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Divider from "@mui/material/Divider";
import { FormControlLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import UserService from "../../service/UserService";
import swal from "sweetalert";

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                contact: '',
                type: 'user',
            },
            btnState: props.btnState,
            selectUser: props.customerData,
        }
    }


    clearData = () => {
        this.setState({
            user: {
                _id: this.props.data._id,
                firstname: '',
                lastname: '',
                email: '',
                contact: '',
                type: 'user',
            },
            selectUser: null,
        })
    }

    componentDidMount() {
        if (this.props.btnState == "Update") {
            this.setState({
                user: this.props.data,
            });
        }
    }


    render() {
        const saveUser = async () => {
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

        return (
            <Stack style={{ border: '1px solid gray', padding: '10px', borderRadius: '8px' }}>
                <h2>{this.state.btnState} User</h2>
                <Divider />
                <Stack direction="row" justifyContent="flex-start" alignItems="center"
                    spacing={2} style={{ height: '100px' }}>
                    <TextField value={this.state.user.firstname} id="outlined-basic" label="First Name" variant="outlined"
                        style={{ width: '100%' }}
                        onChange={(e) => {
                            let formData = this.state.user
                            formData.firstname = e.target.value
                            this.setState({ formData })
                        }} />
                    <TextField value={this.state.user.lastname} id="outlined-basic" label="Last Name" variant="outlined"
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
                    <TextField value={this.state.user.email} id="outlined-basic" label="E-mail Address" variant="outlined"
                        style={{ width: '100%' }}
                        onChange={(e) => {
                            let formData = this.state.user
                            formData.email = e.target.value
                            this.setState({ formData })
                        }} />
                    <TextField value={this.state.user.contact} id="outlined-basic" label="Contact" variant="outlined"
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
                    <Button onClick={this.clearData} autoFocus color="info" variant="contained" style={{ fontWeight: 'bold', width: '95px', borderRadius: 15 }}>
                        Clear
                    </Button>
                    <Button onClick={saveUser} disabled={this.state.selectUser === null}
                        color="primary" variant="contained" style={{ fontWeight: 'bold', width: '95px', borderRadius: 15 }}>
                        {this.state.btnState}
                    </Button>
                </Stack>
            </Stack>
        );
    }
}
export default withStyles(styleSheet)(UserManage)