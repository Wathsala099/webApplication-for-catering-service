import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, IconButton, InputBase, Stack } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PostService from '../../service/PostService';
import swal from 'sweetalert';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SendIcon from '@mui/icons-material/Send';
import ProductService from '../../service/ProductService';


export default function FeedbackForm(props) {
    const [open, setOpen] = React.useState(false);
    const [feedback, setFeedback] = React.useState('');
    const [feedbackList, setFeedbackList] = React.useState([]);

    React.useEffect(() => {
        loadFeedbacks()
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (event) => {
        if (feedback != "") {
            let response = await ProductService.addFeedback({
                username: props.username,
                product_id: props.data._id,
                feedback: feedback,
            })
            if (response.status === 200) {
                if (!response.data.error) {
                    swal("Saved!", "success", "success");
                    setOpen(false);
                    window.location.assign('/h');
                }
            } else {
            }
        } else {
            swal("Please add feedback!", "", "error");
        }
    };

    const loadFeedbacks = async () => {
        const res = await ProductService.loadAllFeedbacks({
            product_id: props.data._id,
        });
        if (res.status === 200) {
            if (!res.data.error) {
                setFeedbackList(res.data.data)
            }
        } else {
            console.log("fetching error: " + res)
        }
    }

    return (
        <div>
            <Stack spacing={3} direction="row" justifyContent="center" alignItems="center">
                <Button size="small" variant="outlined" onClick={handleClickOpen}>View</Button>
            </Stack>
            <Dialog open={open} onClose={handleClose} style={{
                fontFamily: 'Convergence',
            }}>
                <DialogTitle>{props.data.title}</DialogTitle>
                <DialogContent sx={{ minWidth: '600px' }}>
                    <p> <span style={{ fontWeight: 'bold', }}>Category :</span> {props.data.category}</p>
                    <p> <span style={{ fontWeight: 'bold', }}>Desc :</span> {props.data.desc}</p>
                    <Divider />
                    <span style={{
                        fontSize: '0.7em',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}>Feedbacks :</span>
                    <Stack spacing={3} >
                        {feedbackList.map(msg => (
                            <span style={{
                                fontFamily: 'Convergence',
                                fontSize: '0.7em',
                            }}>{msg.username} - {msg.feedback}</span>
                        ))}
                    </Stack>

                    <TextField
                        margin="dense"
                        id="post_data"
                        label="Feedback"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setFeedback(e.target.value)}
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