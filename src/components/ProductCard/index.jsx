import React from 'react';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Rating, Stack } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WifiIcon from '@mui/icons-material/Wifi';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';

import { Component } from "react";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import room1 from '../../assets/images/room1.jpg'
import ReservationForm from '../ReservationForm';

class ProductCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.userSignIn,
        }
    }


    vehicleSelect = () => {

    }



    render() {
        let { classes } = this.props;

        return (
            <div /*sx={{ maxWidth: 345 }}*/>
                <Stack className={classes.card_box}
                    justifyContent="center" alignItems="stretch"
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{ bgcolor: '#f1f1f1' }}>

                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                        <div>
                            <img className={classes.card_img} src={room1} alt="" />
                        </div>
                    </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                        <Stack direction="column" justifyContent="space-evenly" alignItems="flex-start" spacing={2} style={{ minWidth: '300px' }}>
                            <div>
                                <Typography className={classes.card_brand} sx={{ fontSize: { xs: '1.5em', md: '1.7em' } }} >
                                    {this.props.setProduct.name}
                                </Typography>
                            </div>
                        </Stack>

                        <Divider />
                        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1} style={{ maxWidth: '500px' }}>
                            <Typography paragraph>
                                {this.props.setProduct.description}
                            </Typography>

                        </Stack>
                    </Stack>

                    <hr style={{ border: '1px solid #E0E0E0' }} />

                    <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={2}>
                        <p className={classes.card_type} >LKR.{this.props.setProduct.dailyrate}</p>
                        <Button
                            color="primary"
                            variant="contained" onClick={this.vehicleSelect}>
                            Add to Cart
                        </Button>

                    </Stack>

                </Stack>
            </div>
        );
    }

}
export default withStyles(styleSheet)(ProductCard)
