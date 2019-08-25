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
    Badge,
    CalloutCard,
    TextStyle
} from '@shopify/polaris';
import {    
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { Carts } from '../api/carts.js';
import { Meteor } from 'meteor/meteor';
import { TotalPrice } from './TotalPrice.jsx'
//import { Fiber } from 'fibers'

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

export class Cart extends React.Component {
  state = {
    showToast: false,
    isLoading: false,
    showMobileNavigation: false,
    removeCartItem: "",
    price: 0,
    open: false
  };

  deleteThisItem = (itemName, itemId) => {
    Meteor.call('carts.remove', itemId);
    this.setState({
      showToast: true,
      removeCartItem: itemName
    });
  }

  render() {
    const { classes } = this.props;
    const {
      showToast,
      isLoading,
      showMobileNavigation,
      removeCartItem,
      price,
      open
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState('showToast')}
        content={"Removed " + removeCartItem + " from Cart"}
        duration={1000}
      />
    ) : null;

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Cart">
        <Layout>
          <Layout.Section>
            <CalloutCard
              title="Continue to checkout"
              primaryAction={{
                content: 'Checkout',
                url: '/checkout',
              }}
            >
            <TotalPrice cart={this.props.cart} delivery="Delivery" payment="Debit/Credit"/>
            </CalloutCard>
              {        
                this.props.cart.map((cartItem) => (
                    <Card 
                    title={cartItem.itemName + " $" + cartItem.price} 
                    sectioned
                    actions={[
                      {
                        content: 'Delete', 
                        destructive: true,
                        onAction: () => this.deleteThisItem(cartItem.itemName, cartItem._id)
                      },
                      ]}>
                        <Stack vertical={true} spacing="extraTight">
                          {
                            cartItem.addonValue == 'noAddons' &&
                            <Typography variant="h6" >No Addons</Typography>
                          }
                          {
                            cartItem.addonValue != 'noAddons' &&
                            <Typography variant="h6" >{cartItem.addonValue}</Typography>
                          }
                        {
                          cartItem.pizzaTop1 != null &&
                          <Stack alignment="center" spacing="tight">
                            <Typography variant="h6" >Pizza 1 - Toppings:</Typography>
                          {
                            cartItem.pizzaTop1.length == 0 &&
                              <Badge>No toppings</Badge>
                          } 
                          {
                          cartItem.pizzaTop1.map((topName) => (
                            <Badge>{topName}</Badge>
                          ))
                          }
                          </Stack>
                        }
                        {
                          cartItem.pizzaTop2 != null &&
                          <Stack alignment="center" spacing="tight">
                            <Typography variant="h6" >Pizza 2 - Toppings:</Typography>
                          {
                            cartItem.pizzaTop2.length == 0 &&
                              <Badge>No toppings</Badge>
                          } 
                          {
                          cartItem.pizzaTop2.map((topName) => (
                            <Badge>{topName}</Badge>
                          ))
                          }
                          </Stack>
                        }
                        {
                          cartItem.pizzaTop3 != null &&
                          <Stack alignment="center" spacing="tight">
                            <Typography variant="h6" >Pizza 3 - Toppings:</Typography>
                          {
                            cartItem.pizzaTop3.length == 0 &&
                              <Badge>No toppings</Badge>
                          } 
                          {
                          cartItem.pizzaTop3.map((topName) => (
                            <Badge>{topName}</Badge>
                          ))
                          }
                          </Stack>
                        }
                        {
                          cartItem.pizzaTop4 != null &&
                          <Stack alignment="center" spacing="tight">
                            <Typography variant="h6" >Pizza 4 - Toppings:</Typography>
                          {
                            cartItem.pizzaTop4.length == 0 &&
                              <Badge>No toppings</Badge>
                          } 
                          {
                          cartItem.pizzaTop4.map((topName) => (
                            <Badge>{topName}</Badge>
                          ))
                          }
                          </Stack>
                        }
                        {
                          cartItem.pop1 != null &&
                          <Stack alignment="center" spacing="tight">
                            <Typography variant="h6" >Pop:</Typography>
                            <Badge>{cartItem.pop1}</Badge>
                            <Badge>{cartItem.pop2}</Badge>
                            <Badge>{cartItem.pop3}</Badge>
                            <Badge>{cartItem.pop4}</Badge>
                            <Badge>{cartItem.pop5}</Badge>
                            <Badge>{cartItem.pop6}</Badge>
                          </Stack>
                        }
                        {
                          cartItem.dip1 != null &&
                          <Stack alignment="center" spacing="tight">
                            <Typography variant="h6" >Dip:</Typography>
                            <Badge>{cartItem.dip1}</Badge>
                            <Badge>{cartItem.dip2}</Badge>
                            <Badge>{cartItem.dip3}</Badge>
                            <Badge>{cartItem.dip4}</Badge>
                            <Badge>{cartItem.dip5}</Badge>
                            <Badge>{cartItem.dip6}</Badge>
                          </Stack>
                        }
                        {
                          cartItem.pasta != null &&
                          <Stack alignment="center" spacing="tight">
                            <Typography variant="h6" >Pasta:</Typography>
                            <Badge>{cartItem.pasta}</Badge>
                          </Stack>
                        }
                        {
                          cartItem.wings != null &&
                          <Stack alignment="center" spacing="tight">
                            <Typography variant="h6" >Wings:</Typography>
                            <Badge>{cartItem.wings}</Badge>
                          </Stack>
                        }
                        {
                          cartItem.chips != null &&
                          <Stack alignment="center" spacing="tight">
                            <Typography variant="h6" >Chips:</Typography>
                            <Badge>{cartItem.chips}</Badge>
                          </Stack>
                        }
                        </Stack>
                    </Card>
                ))
              }
              {/* {
                this.props.cartCount == 0 &&
                  <EmptyState
                      heading="Your cart is empty"
                      action={{content: 'View Menu', url: '/menu'}}
                      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                  >
                  </EmptyState>
              } */}
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

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withTracker((props) => {
    Meteor.subscribe('carts');
    return {
      cart: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
      cartCount: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).count()
    };
})
)(Cart);