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
    Select
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
      },
      pizzaToppings1: [],
      pizzaToppings2: [],
      pizzaToppings3: [],
      pizzaToppings4: [],
      addon: [],
      pop1: 'Coke', pop2: 'Coke', pop3: 'Coke', pop4: 'Coke', pop5: 'Coke', pop6: 'Coke',
      dip1: 'Coke', dip2: 'Coke', dip3: 'Coke', dip4: 'Coke', dip5: 'Coke', dip6: 'Coke',
      pasta: 'Lasagna',
      wings: 'BBQ',
      chips: 'Lays'
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
      pizzaToppings4: [],
      addon: [],
      pop1: 'Coke', pop2: 'Coke', pop3: 'Coke', pop4: 'Coke', pop5: 'Coke', pop6: 'Coke',
      dip1: 'Coke', dip2: 'Coke', dip3: 'Coke', dip4: 'Coke', dip5: 'Coke', dip6: 'Coke',
      pasta: 'Lasagna',
      wings: 'BBQ',
      chips: 'Lays'
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
        pizzaToppings4,
        addon,
        pop1, pop2, pop3, pop4, pop5, pop6,
        dip1, dip2, dip3, dip4, dip5, dip6,
        pasta,
        wings,
        chips
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
            background: '#357997',
          }
        }
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

    addToCart = () => {
      console.log(this.state.pops)
    };
  }