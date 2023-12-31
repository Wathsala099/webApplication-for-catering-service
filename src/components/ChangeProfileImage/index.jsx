import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { LinearProgress, Box, Stack, IconButton } from '@mui/material';
import { withStyles } from "@mui/styles";
import UserService from '../../service/UserService';
import swal from 'sweetalert';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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

export default function ChangeProfileImage(props) {
    const [open, setOpen] = React.useState(false);
    const [selectFile, setSelectFile] = React.useState(null);
    const [upload, setUpload] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [currentFile, setCurrentFile] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectFileOnChange = async (event) => {
        if (event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmit = async () => {
        const fileInput = document.getElementById('btn-upload');
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('img', file);
        formData.append('user_id', props.user_id);

        let response = await UserService.upadateUserImage(formData)
        if (response.status === 200) {
            if (!response.data.error) {
                swal("Update!", "success", "success");
                setOpen(false);
                window.location.reload();
            }
        } else {
        }
    }

    return (
        <div>

            <IconButton size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClickOpen}
                variant="outlined"
            >
                <AddPhotoAlternateIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit profile Image</DialogTitle>
                {image && (
                    <Stack sx={{ height: '300px', margin: '20px', }}
                        style={{ border: '1px solid #E0E0E0', borderRadius: '3px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                        <img alt=''
                            src={URL.createObjectURL(image)}
                            style={{
                                height: '100%', backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                            }} />
                    </Stack>
                )}
                <DialogContent>
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
                                component="span"
                                startIcon={<AddAPhotoIcon />}>
                                Change Image
                            </Button>
                        </label>

                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button  color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button color="success" variant="outlined" onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}