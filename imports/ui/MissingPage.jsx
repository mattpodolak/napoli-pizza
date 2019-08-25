import {
    AppProvider, 
    Page, 
    Card, 
    Navigation, 
    TopBar,
    Layout,
    TextContainer,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    Frame,
    Loading,
    EmptyState
} from '@shopify/polaris';
import {    
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import React from 'react';

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

export class MissingPage extends React.Component {
  state = {
    isLoading: false,
    showMobileNavigation: false,
    open: false
  };

  render() {
    const { classes } = this.props;
    const {
      isLoading,
      showMobileNavigation,
      open
    } = this.state;

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Page Not Found">
        <Layout>
            <Layout.Section>
                <EmptyState
                    heading="Sorry the page you're looking for does not exist :("
                    action={{content: 'Return Home', url: '/'}}
                    image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                >
                </EmptyState>
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

MissingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MissingPage);