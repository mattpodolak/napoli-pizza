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
    TextStyle,
    DisplayText
} from '@shopify/polaris';
import {    
    HomeMajorMonotone,
    CartMajorMonotone,
    ProductsMajorTwotone,
    PageMajorMonotone
} from '@shopify/polaris-icons';
import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
import Badge from '@material-ui/core/Badge';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';

import { withTracker } from 'meteor/react-meteor-data';
import { Carts } from '../api/carts.js';

//import Button as MaterialButton from '@material-ui/core/Button';

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
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  appBarSpacer: theme.mixins.toolbar,
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
  badge: {
    top: '50%',
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
  },
});

export class Menu extends React.Component {
    defaultState ={
      itemDataField: {
        "name": "",
        "desc": "",
        "price": "0",
        "pizzas": "0",
        "size": null,
        "toppings": null,
        "default_toppings": null,
        "addon":  null,
          "extras": {
          "Wings": "0",
          "Garlic bread with cheese": "False",
          "Pop": "0",
          "Dip": "0",
          "Pasta": "False",
          "Chips": "False"
          }
      },
      pizzaToppings: [],
      addonValue: 'noAddons',
      pop: 'Coke',
      dip: 'Ranch',
      pasta: 'Lasagna',
      wings: 'BBQ',
      chips: 'Lays',
      page: 'pizzaDeals'
    }
    state = {
      showToast: false,
      isLoading: false,
      showMobileNavigation: false,
      modalActive: false,
      page: this.defaultState.page,
      addonValue: this.defaultState.addonValue,
      editItemData: this.defaultState.itemDataField,
      editItemCategory: 'pizza_deals',
      pizzaToppings1: this.defaultState.pizzaToppings,
      pizzaToppings2: this.defaultState.pizzaToppings,
      pizzaToppings3: this.defaultState.pizzaToppings,
      pizzaToppings4: this.defaultState.pizzaToppings,
      pop1: this.defaultState.pop, pop2: this.defaultState.pop, pop3: this.defaultState.pop, pop4: this.defaultState.pop, pop5: this.defaultState.pop, pop6: this.defaultState.pop,
      dip1: this.defaultState.dip, dip2: this.defaultState.dip, dip3: this.defaultState.dip, dip4: this.defaultState.dip, dip5: this.defaultState.dip, dip6: this.defaultState.dip,
      pasta: this.defaultState.pasta,
      wings: this.defaultState.wings,
      chips: this.defaultState.chips,
      cartName: "",
      open: false
    };

    render() {
      const { classes } = this.props;
      const {
        showToast,
        isLoading,
        showMobileNavigation,
        modalActive,
        page,
        editItemData,
        editItemCategory,
        pizzaToppings1,
        pizzaToppings2,
        pizzaToppings3,
        pizzaToppings4,
        addonValue,
        pop1, pop2, pop3, pop4, pop5, pop6,
        dip1, dip2, dip3, dip4, dip5, dip6,
        pasta,
        wings,
        chips,
        cartName,
        open
      } = this.state;

      const toastMarkup = showToast ? (
        <Toast
          onDismiss={this.toggleState('showToast')}
          content={"Added " + cartName + " to Cart"}
          duration={1000}
        />
      ) : null;

      const loadingMarkup = isLoading ? <Loading /> : null;

      const sidesPage = (
        <Page title="Sides" separator>
          <Layout>
            <Layout.Section>
                {        
                    sidesItems.map((item, index) => (
                        <Card title={'$' + item.price + ' - ' + item.name} sectioned>
                            <Typography variant="h5" gutterBottom>{item.desc}</Typography>
                            <br/>
                            <Button primary
                            onClick={() => this.editItem(item.name, 'sides')}
                            >Add to Cart</Button>
                        </Card>
                    ))
                }
            </Layout.Section>
          </Layout>
        </Page>
      );

      const saladsPage = (
        <Page title="Salads" separator>
          <Layout>
            <Layout.Section>
                {        
                    saladsItems.map((item, index) => (
                        <Card title={'$' + item.price + ' - ' + item.name} sectioned>
                            <Typography variant="h5" gutterBottom>{item.desc}</Typography>
                            <br/>
                            <Button primary
                            onClick={() => this.editItem(item.name, 'salads')}
                            >Add to Cart</Button>
                        </Card>
                    ))
                }
            </Layout.Section>
          </Layout>
        </Page>
      );

      const pitasPage = (
        <Page title="Pitas" separator>
          <Layout>
            <Layout.Section>
                {        
                    pitasItems.map((item, index) => (
                        <Card title={'$' + item.price + ' - ' + item.name} sectioned>
                            <Typography variant="h5" gutterBottom>{item.desc}</Typography>
                            <br/>
                            <Button primary
                            onClick={() => this.editItem(item.name, 'pitas')}
                            >Add to Cart</Button>
                        </Card>
                    ))
                }
            </Layout.Section>
          </Layout>
        </Page>
      );

      const wingsAndSandwichesPage = (
        <Page title="Wings and Sandwiches" separator>
          <Layout>
            <Layout.Section>
                {        
                    wingsAndSandwichesItems.map((item, index) => (
                        <Card title={'$' + item.price + ' - ' + item.name} sectioned>
                            <Typography variant="h5" gutterBottom>{item.desc}</Typography>
                            <br/>
                            <Button primary
                            onClick={() => this.editItem(item.name, 'wingsandsandwiches')}
                            >Add to Cart</Button>
                        </Card>
                    ))
                }
            </Layout.Section>
          </Layout>
        </Page>
      );

      const specialtyPizzaPage = (
        <Page title="Specialty Pizza" separator>
          <Layout>
            <Layout.Section>
                {        
                    specialtyPizzaItems.map((item, index) => (
                        <Card title={'$' + item.price + ' - ' + item.name} sectioned>
                            <Typography variant="h5" gutterBottom>{item.desc}</Typography>
                            <br/>
                            <Button primary
                            onClick={() => this.editItem(item.name, 'specialty')}
                            >Add to Cart</Button>
                        </Card>
                    ))
                }
            </Layout.Section>
          </Layout>
        </Page>
      );

      const pizzaDealsPage = (
        <Page title="Pizza Deals" separator>
          <Layout>
            <Layout.Section>
                {        
                    pizzaDealsItems.map((item, index) => (
                        <Card title={'$' + item.price + ' - ' + item.name} sectioned>
                            <Typography variant="h5" gutterBottom>{item.desc}</Typography>
                            <br/>
                            <Button primary
                            onClick={() => this.editItem(item.name, 'pizza_deals')}
                            >Add to Cart</Button>
                        </Card>
                    ))
                }
            </Layout.Section>
          </Layout>
        </Page>
      );
      const freeDeliveryPage = (
        <Page title="Free Delivery Menu" separator>
          <Layout>
            <Layout.Section>
                {        
                    freeDeliveryItems.map((item, index) => (
                        <Card title={'$' + item.price + ' - ' + item.name} sectioned>
                            <Typography variant="h5" gutterBottom>{item.desc}</Typography>
                            <br/>
                            <Button primary
                            onClick={() => this.editItem(item.name, 'freedelivery')}
                            >Add to Cart</Button>
                        </Card>
                    ))
                }
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
      //const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;
      function PageLoad(){
        if(isLoading){
              return loadingPageMarkup
        }
        else{
            if(page == "pizzaDeals"){
                return pizzaDealsPage;
            }
            else if(page == "freeDelivery"){
                return freeDeliveryPage;
            }
            else if(page == "specialtyPizza"){
                return specialtyPizzaPage;
            }
            else if(page == "wingsAndSandwiches"){
                return wingsAndSandwichesPage;
            }
            else if(page == "pitas"){
                return pitasPage;
            }
            else if(page == "salads"){
                return saladsPage;
            }
            else if(page == "sides"){
                return sidesPage;
            }
            else{
                return null;
            }
        }
      }
      const modalMarkup = (
        <Modal
          large
          open={modalActive}
          onClose={() => this.closeEditItem()}
          title={this.state.editItemData.name}
          primaryAction={{
            content: 'Add to Cart',
            onAction: this.addToCart
          }}
        >
          <Modal.Section>
              <FormLayout>
              <TextContainer>
                <Typography variant="h5" gutterBottom>
                  {this.state.editItemData.desc}
                </Typography>
              </TextContainer>
                <Subheading>Addons</Subheading>
                <Stack>
                  <RadioButton
                    label="No Addons"
                    checked={addonValue === 'noAddons'}
                    id="noAddons"
                    name="addons"
                    onChange={this.addonUpdate}
                  />
                  {(this.state.editItemData.addon || []).map(addon => (
                      <RadioButton
                        label={addon.name}
                        id={addon.name}
                        checked={addonValue === addon.name}
                        name="addons"
                        onChange={this.addonUpdate}
                      />
                    ))}
                </Stack>
                {
                  Number(this.state.editItemData.pizzas) > 0 &&
                  <Subheading>Pizza 1 - Toppings</Subheading>
                }
                {
                  Number(this.state.editItemData.pizzas) > 0 &&
                  <FormLayout.Group condensed>
                    <ChoiceList
                      allowMultiple
                      title={'Free Toppings'}
                      choices={toppingData.Free_Toppings}
                      selected={pizzaToppings1}
                      onChange={this.pizzaToppings1}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Vegetable Toppings'}
                      choices={toppingData.Vegetable}
                      selected={pizzaToppings1}
                      onChange={this.pizzaToppings1}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Cheese Toppings'}
                      choices={toppingData.Cheese}
                      selected={pizzaToppings1}
                      onChange={this.pizzaToppings1}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Meat Toppings'}
                      choices={toppingData.Meat}
                      selected={pizzaToppings1}
                      onChange={this.pizzaToppings1}
                    />
                  </FormLayout.Group>
                }
                {
                  Number(this.state.editItemData.pizzas) > 1 &&
                  <Subheading>Pizza 2 - Toppings</Subheading>
                }
                {
                  Number(this.state.editItemData.pizzas) > 1 &&
                  <FormLayout.Group condensed>
                    <ChoiceList
                      allowMultiple
                      title={'Free Toppings'}
                      choices={toppingData.Free_Toppings}
                      selected={pizzaToppings2}
                      onChange={this.pizzaToppings2}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Vegetable Toppings'}
                      choices={toppingData.Vegetable}
                      selected={pizzaToppings2}
                      onChange={this.pizzaToppings2}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Cheese Toppings'}
                      choices={toppingData.Cheese}
                      selected={pizzaToppings2}
                      onChange={this.pizzaToppings2}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Meat Toppings'}
                      choices={toppingData.Meat}
                      selected={pizzaToppings2}
                      onChange={this.pizzaToppings2}
                    />
                  </FormLayout.Group>
                }
                {
                  Number(this.state.editItemData.pizzas) > 2 &&
                  <Subheading>Pizza 3 - Toppings</Subheading>
                }
                {
                  Number(this.state.editItemData.pizzas) > 2 &&
                  <FormLayout.Group condensed>
                    <ChoiceList
                      allowMultiple
                      title={'Free Toppings'}
                      choices={toppingData.Free_Toppings}
                      selected={pizzaToppings3}
                      onChange={this.pizzaToppings3}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Vegetable Toppings'}
                      choices={toppingData.Vegetable}
                      selected={pizzaToppings3}
                      onChange={this.pizzaToppings3}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Cheese Toppings'}
                      choices={toppingData.Cheese}
                      selected={pizzaToppings3}
                      onChange={this.pizzaToppings3}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Meat Toppings'}
                      choices={toppingData.Meat}
                      selected={pizzaToppings3}
                      onChange={this.pizzaToppings3}
                    />
                  </FormLayout.Group>
                }
                {
                  Number(this.state.editItemData.pizzas) > 3 &&
                  <Subheading>Pizza 4 - Toppings</Subheading>
                }
                {
                  Number(this.state.editItemData.pizzas) > 3 &&
                  <FormLayout.Group condensed>
                    <ChoiceList
                      allowMultiple
                      title={'Free Toppings'}
                      choices={toppingData.Free_Toppings}
                      selected={pizzaToppings4}
                      onChange={this.pizzaToppings4}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Vegetable Toppings'}
                      choices={toppingData.Vegetable}
                      selected={pizzaToppings4}
                      onChange={this.pizzaToppings4}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Cheese Toppings'}
                      choices={toppingData.Cheese}
                      selected={pizzaToppings4}
                      onChange={this.pizzaToppings4}
                    />
                    <ChoiceList
                      allowMultiple
                      title={'Meat Toppings'}
                      choices={toppingData.Meat}
                      selected={pizzaToppings4}
                      onChange={this.pizzaToppings4}
                    />
                  </FormLayout.Group>
                }
                {
                  Number(this.state.editItemData.extras.Pop) > 0 &&
                  <Subheading>Pops</Subheading>
                }
                {
                  Number(this.state.editItemData.extras.Pop) > 0 &&
                  <FormLayout.Group condensed>
                    <Select
                      options={toppingData.Pops}
                      onChange={this.pop1Update}
                      value={this.state.pop1}
                    />
                    {
                      Number(this.state.editItemData.extras.Pop) > 1 &&
                        <Select
                        options={toppingData.Pops}
                        onChange={this.pop2Update}
                        value={this.state.pop2}
                      />
                    }
                    {
                      Number(this.state.editItemData.extras.Pop) > 2 &&
                        <Select
                        options={toppingData.Pops}
                        onChange={this.pop3Update}
                        value={this.state.pop3}
                      />
                    }
                    {
                      Number(this.state.editItemData.extras.Pop) > 3 &&
                        <Select
                        options={toppingData.Pops}
                        onChange={this.pop4Update}
                        value={this.state.pop4}
                      />
                    }
                  </FormLayout.Group>
                }
                {
                  Number(this.state.editItemData.extras.Pop) > 4 &&
                  <FormLayout.Group condensed>
                    <Select
                      options={toppingData.Pops}
                      onChange={this.pop5Update}
                      value={this.state.pop5}
                    />
                    {
                      Number(this.state.editItemData.extras.Pop) > 5 &&
                        <Select
                        options={toppingData.Pops}
                        onChange={this.pop6Update}
                        value={this.state.pop6}
                      />
                    }
                  </FormLayout.Group>
                }
                {
                  Number(this.state.editItemData.extras.Dip) > 0 &&
                  <Subheading>Dips</Subheading>
                }
                {
                  Number(this.state.editItemData.extras.Dip) > 0 &&
                  <FormLayout.Group condensed>
                    <Select
                      options={toppingData.Dips}
                      onChange={this.dip1Update}
                      value={this.state.dip1}
                    />
                    {
                      Number(this.state.editItemData.extras.Dip) > 1 &&
                        <Select
                        options={toppingData.Dips}
                        onChange={this.dip2Update}
                        value={this.state.dip2}
                      />
                    }
                    {
                      Number(this.state.editItemData.extras.Dip) > 2 &&
                        <Select
                        options={toppingData.Dips}
                        onChange={this.dip3Update}
                        value={this.state.dip3}
                      />
                    }
                    {
                      Number(this.state.editItemData.extras.Dip) > 3 &&
                        <Select
                        options={toppingData.Dips}
                        onChange={this.dip4Update}
                        value={this.state.dip4}
                      />
                    }
                  </FormLayout.Group>
                }
                {
                  Number(this.state.editItemData.extras.Dip) > 4 &&
                  <FormLayout.Group condensed>
                    <Select
                      options={toppingData.Dips}
                      onChange={this.dip5Update}
                      value={this.state.dip5}
                    />
                    {
                      Number(this.state.editItemData.extras.Dip) > 5 &&
                        <Select
                        options={toppingData.Dips}
                        onChange={this.dip6Update}
                        value={this.state.dip6}
                      />
                    }
                  </FormLayout.Group>
                }
                {
                  this.state.editItemData.extras.Pasta == 'True' &&
                  <Subheading>Pasta</Subheading>
                }
                {
                  this.state.editItemData.extras.Pasta == 'True' &&
                  <FormLayout.Group condensed>
                    <Select
                      options={toppingData.Pasta}
                      onChange={this.pastaUpdate}
                      value={this.state.pasta}
                    />
                  </FormLayout.Group>
                }
                {
                  this.state.editItemData.name == 'Pasta Special' &&
                  <FormLayout.Group condensed>
                    <Select
                      options={toppingData.PastaSpecial}
                      onChange={this.pastaUpdate}
                      value={this.state.pasta}
                    />
                  </FormLayout.Group>
                }
                {
                  Number(this.state.editItemData.extras.Wings) > 0 &&
                  <Subheading>Wings</Subheading>
                }
                {
                  Number(this.state.editItemData.extras.Wings) > 0 &&
                  <FormLayout.Group condensed>
                    <Select
                      options={toppingData.Wings}
                      onChange={this.wingsUpdate}
                      value={this.state.wings}
                    />
                  </FormLayout.Group>
                }
                {
                  this.state.editItemData.extras.Chips == 'True' &&
                  <Subheading>Chips</Subheading>
                }
                {
                  this.state.editItemData.extras.Chips == 'True' &&
                  <FormLayout.Group condensed>
                    <Select
                      options={toppingData.Chips}
                      onChange={this.chipsUpdate}
                      value={this.state.chips}
                    />
                  </FormLayout.Group>
                }
               </FormLayout> 
          </Modal.Section>
        </Modal>
      );

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
                    <IconButton color="inherit" edge="start" component={Link} to="/cart">
                    <Badge 
                      badgeContent={this.props.cartCount} 
                      color="secondary"
                      variant="dot"
                    >
                      <ShoppingCartIcon />
                    </Badge>
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
                    <ListItem button onClick={this.toggleState('isLoading')} component={Link} to="/cart">
                      <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                      <ListItemText primary="Cart" secondary={String(this.props.cartCount) + " item(s)"}/>
                    </ListItem>
                  </List>
                  <Divider />
                  <List>
                    <ListItem button onClick={() => this.changePage('pizzaDeals')}>
                      <ListItemIcon><HomeIcon /></ListItemIcon>
                      <ListItemText primary="Pizza Deals" />
                    </ListItem>
                    <ListItem button onClick={() => this.changePage('freeDelivery')}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Free Delivery" />
                    </ListItem>
                    <ListItem button onClick={() => this.changePage('specialtyPizza')}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Specialty Pizza" />
                    </ListItem>
                    <ListItem button onClick={() => this.changePage('wingsAndSandwiches')}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Wings and Sandwiches" />
                    </ListItem>
                    <ListItem button onClick={() => this.changePage('pitas')}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Pitas" />
                    </ListItem>
                    <ListItem button onClick={() => this.changePage('salads')}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Salads" />
                    </ListItem>
                    <ListItem button onClick={() => this.changePage('sides')}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Sides" />
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
                  <PageLoad/>
                  {toastMarkup}
                  {modalMarkup}
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
    
    changePage = (page) => {
        this.toggleState('isLoading');
        this.setState({
            page: page,
            open: false
        });
        this.toggleState('isLoading'); 
    };

    editItem = (editItemName, editItemCategory) => {
      var itemCategory = menuData[editItemCategory];
      var itemDetails = null;
      for(var i = 0; i < itemCategory.length; i++){
        if(itemCategory[i].name == editItemName){
          itemDetails = itemCategory[i];
          break;
        }
      }
      //console.log(itemDetails)
      this.setState({
        editItemData: itemDetails,
        modalActive: true,
        editItemCategory: editItemCategory
      });

      if(itemDetails.default_toppings != null){
        this.setState({
          pizzaToppings1: itemDetails.default_toppings
        });
      }
    };

    setDefault = () => {
      this.setState({
        editItemData: this.defaultState.itemDataField,
        addonValue: this.defaultState.addonValue,
        editItemData: this.defaultState.itemDataField,
        pizzaToppings1: this.defaultState.pizzaToppings,
        pizzaToppings2: this.defaultState.pizzaToppings,
        pizzaToppings3: this.defaultState.pizzaToppings,
        pizzaToppings4: this.defaultState.pizzaToppings,
        pop1: this.defaultState.pop, pop2: this.defaultState.pop, pop3: this.defaultState.pop, pop4: this.defaultState.pop, pop5: this.defaultState.pop, pop6: this.defaultState.pop,
        dip1: this.defaultState.dip, dip2: this.defaultState.dip, dip3: this.defaultState.dip, dip4: this.defaultState.dip, dip5: this.defaultState.dip, dip6: this.defaultState.dip,
        pasta: this.defaultState.pasta,
        wings: this.defaultState.wings,
        chips: this.defaultState.chips
      });
    }

    closeEditItem = () => {
      this.setState({
        modalActive: false
      });
      this.setDefault();
    }

    addToCart = () => {
      var name = this.state.editItemData.name;
      var num_pizzas = Number(this.state.editItemData.pizzas);
      var addonValue = this.state.addonValue;

      // if(addonValue.includes('Both') || addonValue.includes('Pizza')){
      //   num_pizzas++;
      // }
      var pizzaTop1 = null;
      var pizzaTop2 = null;
      var pizzaTop3 = null;
      var pizzaTop4 = null;

      if(num_pizzas > 0){
        pizzaTop1 = this.state.pizzaToppings1;
      }
      if(num_pizzas > 1){
        pizzaTop2 = this.state.pizzaToppings2;
      }
      if(num_pizzas > 2){
        pizzaTop3 = this.state.pizzaToppings3;
      }
      if(num_pizzas > 3){
        pizzaTop4 = this.state.pizzaToppings4;
      }

      var pop1 = null;
      var pop2 = null;
      var pop3 = null;
      var pop4 = null;
      var pop5 = null;
      var pop6 = null;
      
      var num_pop = Number(this.state.editItemData.extras.Pop);
      if(num_pop > 0){
        pop1 = this.state.pop1;
      }
      if(num_pop > 0){
        pop1 = this.state.pop1;
      }
      if(num_pop > 1){
        pop2 = this.state.pop2;
      }
      if(num_pop > 2){
        pop3 = this.state.pop3;
      }
      if(num_pop > 3){
        pop4 = this.state.pop4;
      }
      if(num_pop > 4){
        pop5= this.state.pop5;
      }
      if(num_pop > 5){
        pop6 = this.state.pop6;
      }
 
      var dip1 = null;
      var dip2 = null;
      var dip3 = null;
      var dip4 = null;
      var dip5 = null;
      var dip6 = null;

      var num_dip = Number(this.state.editItemData.extras.Dip);
      if(num_dip > 0){
        dip1 = this.state.dip1;
      }
      if(num_dip > 0){
        dip1 = this.state.dip1;
      }
      if(num_dip > 1){
        dip2 = this.state.dip2;
      }
      if(num_dip > 2){
        dip3 = this.state.dip3;
      }
      if(num_dip > 3){
        dip4 = this.state.dip4;
      }
      if(num_dip > 4){
        dip5= this.state.dip5;
      }
      if(num_dip > 5){
        dip6 = this.state.dip6;
      }

      var category = this.state.editItemCategory;

      var pasta = null;
      if(this.state.editItemData.extras.Pasta == 'True' || name == 'Pasta Special'){
        pasta = this.state.pasta;
      }

      var wings = null;
      if(Number(this.state.editItemData.extras.Wings) > 0){
        wings = this.state.wings;
      }

      var chips = null;
      if(this.state.editItemData.extras.Chips == 'True'){
        chips = this.state.chips;
      }

      Meteor.call('carts.insert', name, category, addonValue, pizzaTop1, pizzaTop2, pizzaTop3, pizzaTop4, pop1, pop2, pop3, pop4, pop5, pop6, dip1, dip2, dip3, dip4, dip5, dip6, pasta, wings, chips);
      
      this.closeEditItem();
      this.setState({
        cartName: name,
        showToast: true
      });
    }

    addonUpdate = (checked, newValue) => {
      
      var tempData = this.state.editItemData;
      if(newValue.includes('Both') || newValue.includes('Pizza') && !this.state.addonValue.includes('Both') && !this.state.addonValue.includes('Pizza')){
        tempData.pizzas = Number(tempData.pizzas);
        tempData.pizzas++;
        tempData.pizzas = String(tempData.pizzas)
        //console.log(tempData)
        this.setState({editItemData: tempData});
      }
      if(!(newValue.includes('Both') || newValue.includes('Pizza')) && (this.state.addonValue.includes('Both') || this.state.addonValue.includes('Pizza') )){
        tempData.pizzas = Number(tempData.pizzas);
        tempData.pizzas--;
        tempData.pizzas = String(tempData.pizzas)
        //console.log(tempData)
        this.setState({editItemData: tempData});
      }
      this.setState({addonValue: newValue});
    };

    chipsUpdate = value => {
      this.setState({ pasta: value });
    };

    pastaUpdate = value => {
      this.setState({ pasta: value });
    };

    wingsUpdate = value => {
      this.setState({ wings: value });
    };

    pop1Update = value => {
      this.setState({ pop1: value });
    };

    pop2Update = value => {
      this.setState({ pop2: value });
    };

    pop3Update = value => {
      this.setState({ pop3: value });
    };

    pop4Update = value => {
      this.setState({ pop4: value });
    };

    pop5Update = value => {
      this.setState({ pop5: value });
    };

    pop6Update = value => {
      this.setState({ pop6: value });
    };

    dip1Update = value => {
      this.setState({ dip1: value });
    };

    dip2Update = value => {
      this.setState({ dip2: value });
    };

    dip3Update = value => {
      this.setState({ dip3: value });
    };

    dip4Update = value => {
      this.setState({ dip4: value });
    };

    dip5Update = value => {
      this.setState({ dip5: value });
    };

    dip6Update = value => {
      this.setState({ dip6: value });
    };

    pizzaToppings1 = value => {
      this.setState({ pizzaToppings1: value });
    };

    pizzaToppings2 = value => {
      this.setState({ pizzaToppings2: value });
    };

    pizzaToppings3 = value => {
      this.setState({ pizzaToppings3: value });
    };

    pizzaToppings4 = value => {
      this.setState({ pizzaToppings4: value });
    };
  }

  Menu.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default compose(
    withStyles(styles, { withTheme: true }),
    withTracker((props) => {
      Meteor.subscribe('carts');
      return {
        cart: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
        cartCount: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).count(),
        currentUser: Meteor.user(),
      };
    })
  )(Menu)