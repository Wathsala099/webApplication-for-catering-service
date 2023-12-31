import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import ProductService from '../../service/ProductService';
import swal from 'sweetalert';
import { Divider } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/h">
        Sasaara Catering
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [cartList, setCartList] = React.useState(props.cartList);
  const [productList, setProductList] = React.useState([]);
  const [user, setUser] = React.useState(props.user);
  const [address1, setAddress1] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [city, setCity] = React.useState('');
  const [state, setStates] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [country, setCountry] = React.useState('');

  const [cardName, setCardName] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expDate, setExpireDate] = React.useState('');
  const [CVV, setCCV] = React.useState('');

  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {

  }, []);

  const getTotal = () => {
    let tot = 0
    var list = []
    setProductList([])

    props.cartList.forEach(data => {
      tot += parseFloat(data.qty * data.product.price)
      list.push({
        _id: data.product._id,
        category: data.product.category,
        title: data.product.title,
        desc: data.product.desc,
        img: data.product.img,
        price: data.product.price,
        stock_qty: parseFloat(data.product.qty) - parseFloat(data.qty),
        qty: data.qty,
      })
    });
    setProductList(list)
    setTotal(tot)
  }

  const handleNext = () => {
    getTotal()
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      placeOrder()
    }
  };

  const getAddress1Data = (data) => {
    setAddress1(data)
  }
  const getDate = (data) => {
    setDate(data)
  }
  const getCity = (data) => {
    setCity(data)
  }
  const getState = (data) => {
    setStates(data)
  }
  const getZip = (data) => {
    setZip(data)
  }
  const getCountry = (data) => {
    setCountry(data)
  }

  const getCardName = (data) => {
    setCardName(data)
  }
  const getCardNumber = (data) => {
    setCardNumber(data)
  }
  const getExpireDate = (data) => {
    setExpireDate(data)
  }
  const getCCV = (data) => {
    setCCV(data)
  }

  function getStepContent(step, details) {
    switch (step) {
      case 0:
        return <AddressForm user={user}
          getAddress1={getAddress1Data.bind(this)}
          getDate={getDate.bind(this)}
          getCity={getCity.bind(this)}
          getState={getState.bind(this)}
          getZip={getZip.bind(this)}
          getCountry={getCountry.bind(this)}
        />;
      case 1:
        return <PaymentForm
          getCardName={getCardName.bind(this)}
          getCardNumber={getCardNumber.bind(this)}
          getExpireDate={getExpireDate.bind(this)}
          getCCV={getCCV.bind(this)}
        />;
      case 2:
        return <Review user={user} cartList={cartList}
          address={[address1, city, state, zip, country]}
          payment={[
            { name: 'Card type', detail: 'Visa' },
            { name: 'Card holder', detail: cardName },
            { name: 'Card number', detail: cardNumber },
            { name: 'Expiry date', detail: expDate },]}
        />;
      default:
        throw new Error('Unknown step');
    }
  }


  const placeOrder = async () => {
    let response = await ProductService.addOrder({
      user_id: user._id,
      product_list: productList,
      address: address1,
      date: date,
      city: city,
      card_name: cardName,
      card_number: cardNumber,
      total_amount: total,
    })
    if (response.status === 200) {
      if (!response.data.error) {
        swal("Added!", "success", "success");
      }
    } else {
    }
    props.setCartClear([])
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={defaultTheme}>

      <Container component="main" >
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 12 }, p: { xs: 2, md: 2 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, cartList)}
              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
