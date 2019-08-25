import {
    AppProvider, 
    Page, 
    Card, 
    Toast, 
    Navigation, 
    ContextualSaveBar,
    TopBar,
    Layout,
    FormLayout,
    TextField,
    TextContainer,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    Modal,
    Frame,
    Loading,
    Button,
    Stack,
    RadioButton,
    ChoiceList,
    Subheading,
    Select,
    Form,
    CalloutCard,
    DisplayText
} from '@shopify/polaris';
import {    
  ArrowLeftMinor,
  CartMajorMonotone
} from '@shopify/polaris-icons';
import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { Carts } from '../api/carts.js';
import { Orders } from '../api/orders.js';
import { TotalPrice } from './TotalPrice.jsx'

import uniqid from 'uniqid';

import { compose} from 'redux';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const menuData = require('./menu/custom_json.json');
const toppingData = require('./menu/topping_json.json');
const pizzaDealsItems = menuData.pizza_deals;
const specialtyPizzaItems = menuData.specialty;
const freeDeliveryItems = menuData.freedelivery;
const wingsAndSandwichesItems = menuData.wingsandsandwiches;
const saladsItems = menuData.salads;
const sidesItems = menuData.sides;
const pitasItems = menuData.pitas;
const deliveryOptions = ['Delivery', 'Pickup'];
const paymentOptions = ['Cash', 'Debit/Credit'];
import * as utils from './scripts/utils.js';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#2c9c3e',
    zIndex: 100,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    margin: theme.spacing(1),
  },
  theme: {
    direction: theme.direction
  },
});

export class Checkout extends React.Component {
  defaultState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressOne: '',
    addressTwo: '',
    city: '',
    postal: '',
    instructions: '',
    paymentType: 'Debit/Credit',
    deliveryType: 'Delivery',
    buttonText: 'Submit Order'
  };

  state = {
    showToast: false,
    isLoading: false,
    showMobileNavigation: false,
    firstName: this.defaultState.firstName,
    lastName: this.defaultState.lastName,
    email: this.defaultState.email,
    phone: this.defaultState.phone,
    addressOne: this.defaultState.addressOne,
    addressTwo: this.defaultState.addressTwo,
    city: this.defaultState.city,
    postal: this.defaultState.postal,
    instructions: this.defaultState.instructions,
    paymentType: this.defaultState.paymentType,
    paymentType2: this.defaultState.paymentType,
    deliveryType: this.defaultState.deliveryType,
    buttonText: this.defaultState.buttonText,
    sendingOrder: false,
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    phoneError: '',
    addressError: '',
    cityError: '',
    postalError: '',
    paymentOptions: ['Debit/Credit'],
    paymentOptions2: ['Debit/Credit', 'Cash'],
    open: false
  };

  render() {
    const { classes } = this.props;
    const {
      showToast,
      isLoading,
      showMobileNavigation,
      firstName,
      lastName,
      email,
      phone,
      addressOne,
      addressTwo,
      city,
      postal,
      instructions,
      paymentType,
      paymentType2,
      deliveryType,
      buttonText,
      sendingOrder,
      firstNameError,
      lastNameError,
      emailError,
      phoneError,
      addressError,
      cityError,
      postalError,
      open
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        error
        onDismiss={this.toggleState('showToast')}
        content="Empty Cart"
        duration={1000}
      />
    ) : null;

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        onNavigationToggle={this.toggleState('showMobileNavigation')}
      />
    );

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              label: 'Back to Menu',
              icon: ArrowLeftMinor,
              url: '/menu',
              onClick: this.toggleState('isLoading'),
            },
          ]}
        />
        <Navigation.Section
          items={[
            {
                label: 'Cart',
                icon: CartMajorMonotone,
                badge: String(this.props.cartCount),
                onClick: this.toggleState('isLoading'),
                url: '/cart'
            }
          ]}
        />
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Checkout">
        <Layout>
            <Layout.Section>
              <Card
                title="Cart Total"
                sectioned
              >
                {
                  this.state.deliveryType == 'Delivery' &&
                  <TotalPrice cart={this.props.cart} delivery={this.state.deliveryType} payment={this.state.paymentType}/>
                }
                {
                  this.state.deliveryType == 'Pickup' &&
                  <TotalPrice cart={this.props.cart} delivery={this.state.deliveryType} payment={this.state.paymentType2}/>
                }
              </Card>
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                  <br/>
                <FormLayout.Group>
                    <TextField
                      value={firstName}
                      onChange={this.handleChange('firstName')}
                      label="First Name"
                      type="text"
                      name="fname"
                      maxLength={50} 
                      error={firstNameError}
                    />
                    <TextField
                      value={lastName}
                      onChange={this.handleChange('lastName')}
                      label="Last Name"
                      type="text"
                      name="lname"
                      maxLength={50}
                      error={lastNameError}
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                      value={email}
                      onChange={this.handleChange('email')}
                      label="Email"
                      type="email"
                      maxLength={50} 
                      error={emailError}
                    />
                    <TextField
                      value={phone}
                      onChange={this.handleChange('phone')}
                      label="Phone Number"
                      type="tel"
                      maxLength={11} 
                      error={phoneError}
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                        value={addressOne}
                        onChange={this.handleChange('addressOne')}
                        label="Address One"
                        type="text"
                        maxLength={50}
                        error={addressError} 
                      />
                      <TextField
                        value={addressTwo}
                        onChange={this.handleChange('addressTwo')}
                        label="Address Two"
                        type="text"
                        maxLength={30}
                      />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                        value={city}
                        onChange={this.handleChange('city')}
                        label="City"
                        type="text"
                        maxLength={30} 
                        error={cityError}
                      />
                      <TextField
                        value={postal}
                        onChange={this.handleChange('postal')}
                        label="Postal Code"
                        name="postal"
                        type="text"
                        maxLength={7}
                        error={postalError}
                      />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                        value={instructions}
                        onChange={this.handleChange('instructions')}
                        label="Delivery Instructions"
                        type="text"
                        maxLength={100} 
                        showCharacterCount={true}
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <Select
                      options={deliveryOptions}
                      onChange={this.handleChange('deliveryType')}
                      value={deliveryType}
                    />
                    {
                      this.state.deliveryType == 'Delivery' &&
                        <Select
                        options={this.state.paymentOptions}
                        onChange={this.handleChange('paymentType')}
                        value={paymentType}
                      />
                    }
                    {
                      this.state.deliveryType == 'Pickup' &&
                        <Select
                        options={this.state.paymentOptions2}
                        onChange={this.handleChange('paymentType2')}
                        value={paymentType2}
                      />
                    }

                  </FormLayout.Group>
                    <Button primary
                    submit
                    loading={sendingOrder}
                    onClick={() => this.submitOrder()}
                    >{buttonText}</Button>
                </FormLayout>
              </Form>
            </Layout.Section>
        </Layout>
      </Page>
    );

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    const theme = {
      colors: {
        topBar: {
          background: '#2c9c3e',
        }
      },
      logo: {
        width: 124,
        topBarSource:
        'https://i.imgur.com/27tOpx7.png',
        //DARK  'https://i.imgur.com/cSYvwrD.png',
        url: 'http://napolipizzeriacafe.com',
        accessibilityLabel: 'Napoli Pizza',
      },
    };

    if(!utils.checkTime()) return (
      <div style={{height: '500px'}}>
      <AppProvider theme={theme}>
        <Frame
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={showMobileNavigation}
          onNavigationDismiss={this.toggleState('showMobileNavigation')}
        >
          <Page title="Checkout">
            <DisplayText size="small">The store is currently closed.</DisplayText>
          </Page>
        </Frame>
      </AppProvider>
    </div>

    );

    return (
      <div style={{height: '500px'}}>
        <AppProvider theme={theme}>
          <Frame>
          <div className={classes.root}>
                <CssBaseline />
                <AppBar
                  position="fixed"
                  className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                  })}
                >
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={this.handleDrawerOpen}
                      edge="start"
                      className={clsx(classes.menuButton, open && classes.hide)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap>
                      Napoli Pizza
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Drawer
                  className={classes.drawer}
                  variant="persistent"
                  anchor="left"
                  open={open}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                      {classes.theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                  </div>
                  <Divider /> 
                  <List>
                    <ListItem button onClick={this.toggleState('isLoading')} component={Link} to="/menu">
                      <ListItemIcon><ArrowBackIcon /></ListItemIcon>
                      <ListItemText primary="Back to Menu"/>
                    </ListItem>
                  </List>
                  <Divider />
                  <List>
                    <ListItem button onClick={this.toggleState('isLoading')} component={Link} to="/cart">
                      <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                      <ListItemText primary="Cart" secondary={String(this.props.cartCount) + " item(s)"}/>
                    </ListItem>
                  </List>
                </Drawer>
                <main
                  className={clsx(classes.content, {
                    [classes.contentShift]: open,
                  })}
                >
                  <div className={classes.drawerHeader} />
            {loadingMarkup}
            {pageMarkup}
            {toastMarkup}
            </main>
            </div>
          </Frame>
        </AppProvider>
      </div>
    );
  }

  handleDrawerOpen = () => {
    this.setState({
      open: true
    });
  }
  handleDrawerClose = () => {
    this.setState({
      open: false
    });
  }

  formValidation(){
    var formErrors = false

    var firstName = this.state.firstName.replace(" ", "")
    var lastName = this.state.lastName.replace(" ", "")
    var email = this.state.email.replace(" ", "")
    var phone = this.state.phone.replace(" ", "")
    var addressOne = this.state.addressOne.replace(" ", "")
    var city = this.state.city.replace(" ", "")
    var postal = this.state.postal.replace(" ", "")

    if(firstName.length == 0){
      formErrors = true
      this.setState({ firstNameError: 'First Name Required' });
    }
    if(lastName.length == 0 ){
      formErrors = true
      this.setState({ lastNameError: 'Last Name Required' });
    }
    if(email.length == 0 ){
      formErrors = true
      this.setState({ emailError: 'Email Required' });
    }
    if(phone.length == 0 ){
      formErrors = true
      this.setState({ phoneError: 'Phone Required' });
    }
    if(addressOne.length == 0){
      formErrors = true
      this.setState({ addressError: 'Address Required' });
    }
    if(city.length == 0){
      formErrors = true
      this.setState({ cityError: 'City Required' });
    }
    if(postal.length == 0){
      formErrors = true
      this.setState({ postalError: 'Postal Code Required' });
    }

    return formErrors

  }

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };

  handleSubmit = (event) => {
    this.setState({newsletter: false, email: ''});
  };

  changeButton = (buttonText) => {
    this.setState({ buttonText }); 
  } 

  submitOrder = () => {
    if(this.props.cartCount == 0){
      this.setState({showToast: true});
    }
    else if(!this.formValidation()){

      var subtotal = 0;
      //check if any items not free deliv
      for(var i=0; i < this.props.cartCount; i++){
        subtotal = Number(this.props.cart[i].price) + subtotal;
      }
      if(subtotal < 10){
        this.changeButton("Error: 10$ Minimum");
      }
      else{

        this.setState({ sendingOrder: true }); 

        var firstName = this.state.firstName
        var lastName = this.state.lastName
        var email = this.state.email
        var phone = this.state.phone
        var addressOne = this.state.addressOne
        var addressTwo = this.state.addressTwo
        var city = this.state.city
        var postal = this.state.postal
        var instructions = this.state.instructions
        var deliveryType = this.state.deliveryType

        if(deliveryType == 'Delivery'){
          var paymentType = this.state.paymentType
        }
        else{
          var paymentType = this.state.paymentType2
        }

        let self = this;
        var orderNum = uniqid()

        if(paymentType == 'Cash'){
          Meteor.call("carts.send", orderNum, firstName, lastName, email, phone, addressOne, addressTwo, city, postal, instructions, paymentType, deliveryType, (error, result) => {
            console.log(result)
            if (!error && result){
              console.log(result)
              //insert order into DB
              Meteor.call('orders.insert', firstName, lastName, orderNum, email, phone, addressOne, addressTwo, city, postal, instructions, paymentType, deliveryType);
              Meteor.call('carts.removeAll');
              
              //pass orderId to order confirm page
              this.props.history.push('/order-confirm/'+String(orderNum))
            }
            else{
              console.log(error)
              this.setState({ sendingOrder: false }); 
              this.changeButton("Error: Try Again");
            }
          });
        }
        else{
          //insert order into DB
          try{
          Meteor.call('orders.insert', firstName, lastName, orderNum, email, phone, addressOne, addressTwo, city, postal, instructions, paymentType, deliveryType);
          this.props.history.push('/payment')
          }
          catch(e){
            console.log(e)
            this.setState({ sendingOrder: false }); 
            this.changeButton("Error: Try Again");
          }
          
        }
      }

    }
    else{
      this.changeButton("Try Again");
    }
  };

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };

}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withTracker((props) => {
    Meteor.subscribe('carts');
    Meteor.subscribe('orders');
    return {
      cart: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
      cartCount: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).count(),
      orders: Orders.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
    };
})
)(Checkout);