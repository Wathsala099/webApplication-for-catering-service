import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';


export default function Review(props) {
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    getTotal()
  }, []);

  const getTotal = () => {
    let tot = 0
    props.cartList.forEach(data => {
      tot += parseFloat(data.qty * data.product.price)
    });
    setTotal(tot)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.cartList.map((list) => (
          <ListItem key={list.product._id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={list.product.title} secondary={list.product.desc} />
            <Typography variant="body2">{list.qty * list.product.price}.00</Typography>
          </ListItem>
        ))}
        <Divider />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {parseFloat(total).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.user.firstname + " " + props.user.lastname}</Typography>
          <Typography gutterBottom>{props.address.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {props.payment.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
