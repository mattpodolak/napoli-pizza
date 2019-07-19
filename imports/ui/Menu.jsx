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
} from '@shopify/polaris';
import {    
    HomeMajorMonotone,
    OrdersMajorTwotone,
    ProductsMajorTwotone,
    PageMajorMonotone
} from '@shopify/polaris-icons';
import React from 'react';

const menuData = require('./menu/custom_json.json');
const toppingData = require('./menu/topping_json.json');
const pizzaDealsItems = menuData.pizza_deals;
const specialtyPizzaItems = menuData.specialty;
const freeDeliveryItems = menuData.freedelivery;
const wingsAndSandwichesItems = menuData.wingsandsandwiches;
const saladsItems = menuData.salads;
const sidesItems = menuData.sides;
const pitasItems = menuData.pitas;

export default class Menu extends React.Component {
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
      }
    }
    state = {
      showToast: false,
      isLoading: false,
      showMobileNavigation: false,
      modalActive: false,
      page: 'pizzaDeals',
      value: 'disabled',
      editItemData: this.defaultState.itemDataField,
      pizzaToppings1: [],
      pizzaToppings2: [],
      pizzaToppings3: [],
      addon: [],
      pops: [],
      dips: []
    };

    render() {
      const {
        showToast,
        isLoading,
        showMobileNavigation,
        modalActive,
        page,
        editItemData,
        pizzaToppings1,
        pizzaToppings2,
        pizzaToppings3,
        addon,
        pops,
        dips
      } = this.state;

      const toastMarkup = showToast ? (
        <Toast
          onDismiss={this.toggleState('showToast')}
          content="Changes saved"
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
                label: 'Cart',
                icon: OrdersMajorTwotone,
                badge: '15',
                onClick: this.toggleState('isLoading'),
            }
          ]}
        />
        <Navigation.Section
            separator
            title="Napoli Pizza Menu"
          items={[
            {
              label: 'Pizza Deals',
              icon: HomeMajorMonotone,
              onClick: () => this.changePage('pizzaDeals')
            },
            {
              label: 'Free Delivery',
              icon: ProductsMajorTwotone,
              onClick: () => this.changePage('freeDelivery')
            },
            {
                label: 'Specialty Pizza',
                icon: ProductsMajorTwotone,
                onClick: () => this.changePage('specialtyPizza')
            },
            {
                label: 'Wings and Sandwiches',
                icon: ProductsMajorTwotone,
                onClick: () => this.changePage('wingsAndSandwiches')
            },
            {
                label: 'Pitas',
                icon: ProductsMajorTwotone,
                onClick: () => this.changePage('pitas')
            },
            {
                label: 'Salads',
                icon: ProductsMajorTwotone,
                onClick: () => this.changePage('salads')
            },
            {
                label: 'Sides',
                icon: ProductsMajorTwotone,
                onClick: () => this.changePage('sides')
            },
          ]}
        />
      </Navigation>
      );
      const loadingMarkup = isLoading ? <Loading /> : null;

      const sidesPage = (
        <Page title="Sides" separator>
          <Layout>
            <Layout.Section>
                {        
                    sidesItems.map((item, index) => (
                        <Card title={'$' + item.price + ' - ' + item.name} sectioned>
                            <p>{item.desc}</p>
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
                            <p>{item.desc}</p>
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
                            <p>{item.desc}</p>
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
                            <p>{item.desc}</p>
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
                            <p>{item.desc}</p>
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
                            <p>{item.desc}</p>
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
                            <p>{item.desc}</p>
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
          open={modalActive}
          onClose={this.toggleState('modalActive')}
          title={this.state.editItemData.name}
          primaryAction={{
            content: 'Add to Cart',
            onAction: this.addToCart,
          }}
        >
          <Modal.Section>
              <FormLayout>
              <TextContainer>
                <p>
                  {this.state.editItemData.desc}
                </p>
              </TextContainer>
                <Subheading>Addons</Subheading>
                <Stack>
                  <RadioButton
                    label="No Addons"
                    checked={this.state.value === 'disabled'}
                    id="noAddons"
                    name="addons"
                  />
                  {(this.state.editItemData.addon || []).map(addon => (
                      <RadioButton
                        label={addon.name}
                        id={addon.name}
                        name="addons"
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
               </FormLayout> 
          </Modal.Section>
        </Modal>
      );

      const theme = {
        colors: {
          topBar: {
            background: '#357997',
          },
        },
        logo: {
          width: 124,
          topBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
          contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
          url: 'http://jadedpixel.com',
          accessibilityLabel: 'Jaded Pixel',
        },
      };

      return (
        <div style={{height: '500px'}}>
          <AppProvider theme={theme}>
            <Frame
              topBar={topBarMarkup}
              navigation={navigationMarkup}
              showMobileNavigation={showMobileNavigation}
              onNavigationDismiss={() => this.toggleState('showMobileNavigation')}
            >
              {loadingMarkup}
              <PageLoad/>
              {toastMarkup}
              {modalMarkup}
            </Frame>
          </AppProvider>
        </div>
      );
    }

    toggleState = (key) => {
      return () => {
        this.setState((prevState) => ({[key]: !prevState[key]}));
      };
    };
    
    changePage = (page) => {
        this.toggleState('isLoading');
        this.setState({
            page
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
      console.log(itemDetails)
      this.setState({
        editItemData: itemDetails,
        modalActive: true
      });
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

    addToCart = () => {
      console.log(this.state.pizzaToppings1)
    };
  }