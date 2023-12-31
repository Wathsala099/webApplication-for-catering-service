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
import ProductService from '../../service/ProductService';


export default function PostForm(props) {
    const [open, setOpen] = React.useState(false);
    const [qty, setQty] = React.useState(1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (event) => {
        if (qty != "" && parseFloat(props.data.qty) >= parseFloat(qty)) {
            props.addtoCart({
                user_id: props.user_id,
                product_id: props.data._id,
                product: props.data,
                stock_qty: props.data.qty - qty,
                qty: qty,
            })
            swal("Added!", "success", "success");
            setOpen(false);
            // window.location.assign('/h');

        } else {
            swal("Out Of Stock!", "", "error");
        }
    };

    return (
        <div>
            <Stack spacing={3} direction="row" justifyContent="center" alignItems="center">
                <Button size="small" variant="contained" onClick={handleClickOpen}>Add to Cart</Button>
            </Stack>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add to Cart</DialogTitle>
                <DialogContent sx={{ minWidth: '600px' }}>
                    <p>Item : {props.data.title}</p>
                    <p>Stock : {props.data.qty}</p>

                    <TextField
                        margin="dense"
                        id="post_data"
                        label="Qty"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>

                    <Button color="secondary" sx={{ marginLeft: '20px' }} onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button color="success" onClick={handleSubmit} variant="outlined" >Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}