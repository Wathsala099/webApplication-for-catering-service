import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, InputBase, Stack } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PostService from '../../service/PostService';
import swal from 'sweetalert';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SendIcon from '@mui/icons-material/Send';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import VehicleService from '../../service/VehicleService';

export default function BookingForm(props) {
    const [open, setOpen] = React.useState(false);

    const [date, setDate] = React.useState(new Date());
    const [note, setNote] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (event) => {
        let formData = {
            user_id: props.user,
            vehicle_owner_id: props.vData.user_id,
            vehicle_id: props.vData._id,
            notes: note,
            date: date,
            phone: phone,
        }

        let response = await VehicleService.createBooking(formData)
        if (response.status === 200) {
            if (!response.data.error) {
                swal("Submit!", "success", "success");
                setOpen(false);
                // window.location.reload();
            }
        } else {
        }
    };

    return (
        <div>
            <Stack spacing={3} direction="row" justifyContent="center" alignItems="center">

                <Button
                    color="primary"
                    variant="contained" onClick={handleClickOpen}>
                    Select Car
                </Button>

            </Stack>
            <Dialog open={open} onClose={handleClose}  >
                <DialogTitle>Booking Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Stack spacing={3}>
                            <TextField
                                id="post_data"
                                label="Phone"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    sx={{ m: 1, minWidth: 220 }}
                                    label="Rent Date"
                                    inputFormat="yyyy/MM/dd"
                                    value={date}
                                    onChange={(date) => {
                                        setDate(date)
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField
                                multiline
                                margin="dense"
                                id="post_data"
                                label="Note"
                                type="text"
                                variant="standard"
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </Stack>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button color="secondary" sx={{ marginLeft: '20px' }} onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button color="success" onClick={handleSubmit} variant="outlined" endIcon={<SendIcon />}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}