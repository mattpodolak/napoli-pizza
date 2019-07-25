import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http'

export const Carts = new Mongo.Collection('carts');

const item_data = require('../ui/menu/custom_json.json');
const topping_data = require('../ui/menu/topping_json.json');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('carts', function cartsPublication() {
      return Carts.find();
    });
  }

Meteor.methods({
    'carts.insert'(itemName, category, addonValue, pizzaTop1, pizzaTop2, pizzaTop3, pizzaTop4, pop1, pop2, pop3, pop4, pop5, pop6, dip1, dip2, dip3, dip4, dip5, dip6, pasta, wings, chips) {
      //check(text, String);
      var actualTop1 = pizzaTop1;
      var actualTop2 = pizzaTop2;
      var actualTop3 = pizzaTop3;
      var actualTop4 = pizzaTop4;

      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

      //Calculate price here
      var total = 0;
      //Find item data in custom json
      for(var i = 0; i < item_data[category].length; i++)
      {
        if (item_data[category][i].name == itemName){
          var price = item_data[category][i].price;
          var num_pizzas = item_data[category][i].pizzas;
          var size = item_data[category][i].size;
          var free_toppings = item_data[category][i].toppings;
          var default_toppings = item_data[category][i].default_toppings;
          var addon = item_data[category][i].addon;
          var extras = item_data[category][i].extras;

          //convert string to numbers
          num_pizzas = parseInt(num_pizzas);
          price = Number(price);
          break;
        }
      }

      //handle default toppings
      if(default_toppings == null){
        default_toppings = [];
      }

      //Calculate the price
      //Add base price
      total += price;
      //console.log('Base price ', total);
      
      //Check if any addons, and add price of selected
      if(addonValue != null && addon != null){
          for(var h=0; h < addon.length; h++){
              if(addonValue.includes(addon[h].name)){
                  var addPrice = Number(addon[h].price);
                  total+= addPrice;
              }
          }
          //console.log('Addon price added ', total);
          //Increase size if is a size upgrade
          if(addonValue.includes("Large")){
              size = "Large";
          }
          else if(addonValue.includes("X-Large")){
              size = "X-Large";
          }
          else if(addonValue.includes("Party")){
              size = "Party";
          }
          if(addonValue.includes("Pizza")){
            num_pizzas++;
        }
      }
      var topping_compile = [actualTop1, actualTop2, actualTop3, actualTop4];

      //Check num pizzas
      if(num_pizzas > 0){
          for(var z=0; z < num_pizzas; z++){
            var all_toppings = topping_compile[z]
            //add up topping values
            var topping_value = 0;
            if(all_toppings != null){
              for(var i = 0; i < all_toppings.length; i++){
                  for(var k = 0; k < topping_data.Meat.length; k++){
                      if(topping_data.Meat[k].label == all_toppings[i] && !default_toppings.includes(all_toppings[i])){
                          topping_value += Number(topping_data.Meat[k].count);
                          break;
                      }
                  }
                  for(var k = 0; k < topping_data.Cheese.length; k++){
                      if(topping_data.Cheese[k].label == all_toppings[i] && !default_toppings.includes(all_toppings[i])){
                          topping_value += Number(topping_data.Cheese[k].count)
                          break;
                      }
                  }
                  for(var k = 0; k < topping_data.Vegetable.length; k++){
                      if(topping_data.Vegetable[k].label == all_toppings[i] && !default_toppings.includes(all_toppings[i])){
                          topping_value += Number(topping_data.Vegetable[k].count)
                          break;
                      }
                  }
              }
            }
            //console.log('Topping value ', topping_value);
            //multiply topping sum by price per topping depending on size
            for(var k = 0; k < topping_data.Price.length; k++){
                if(size == topping_data.Price[k].label){
                    var topping_price = Number(topping_data.Price[k].count)
                }
            }
            //console.log('Topping price ', topping_price);
            var top_cost = (topping_value-free_toppings)*topping_price;
            if(top_cost > 0){
              total+=top_cost
              //console.log("Topping cost ", top_cost)
            }
            //console.log('New total ', total);
          }
      }

      //round to 2 decimal places
      total = total.toFixed(2);
   
      Carts.insert({ 
        itemName, 
        category,
        addonValue, 
        pizzaTop1, pizzaTop2, pizzaTop3, pizzaTop4, 
        pop1, pop2, pop3, pop4, pop5, pop6, 
        dip1, dip2, dip3, dip4, dip5, dip6, 
        pasta, 
        wings, 
        chips, 
        price: total,
        userId: Meteor.userId(),
        createdAt: new Date() 
      });
    },
    'carts.remove'(cartId) {
     // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      //check(taskId, String);
      var userId = Meteor.userId()
      Carts.remove({_id: cartId, userId: userId});
    },
    'carts.removeAll'() {
     // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      //check(taskId, String);
      var userId = Meteor.userId()
      Carts.remove({userId: userId});
      },
      'carts.send'(orderNum, firstName, lastName, email, phone, addressOne, addressTwo, city, postal, instructions, paymentType, deliveryType) {
        // Make sure the user is logged in before inserting a task
         if (! Meteor.userId()) {
           throw new Meteor.Error('not-authorized');
         }
         //check(taskId, String);
         var userId = Meteor.userId()
         var cartItems = Carts.find({userId: userId}).fetch();
         var delivery = 0;
         var subtotal = 0;
         var cart = [];

         //check if any items not free deliv
         for(var i=0; i < cartItems.length; i++){
           if(cartItems[i].category != 'freedelivery'){
             delivery = 7;
           }
           subtotal = Number(cartItems[i].price) + subtotal;
           cart.push(cartItems[i]);
         }

         var tax = (delivery+subtotal)*0.13;
         var total = subtotal+delivery+tax;

         subtotal = subtotal.toFixed(2);
         delivery = delivery.toFixed(2);
         tax = tax.toFixed(2);
         total = total.toFixed(2);

         var username = Meteor.settings.user;
         var password = Meteor.settings.pass;

         try {
          const result = HTTP.call('POST', 'https://pizza-admin.herokuapp.com/api/login/', {
            params: { 
              username: username,
              password: password
            }
          });

          var auth = result.data.data.authToken;
          var user = result.data.data.userId;
          
          //add customer to db
          const result2 = HTTP.call('POST', 'https://pizza-admin.herokuapp.com/api/add', {
            headers: {
              'X-Auth-Token': auth, 
              'X-User-Id': user
            },
            params: { 
              first_name: firstName,
              last_name: lastName,
              phone: phone,
              address_one: addressOne,
              address_two: addressTwo,
              postal_code: postal,
              city: city,
              user: 'Napoli',
            }
          });
          
          //add order to db
          const result3 = HTTP.call('POST', 'https://pizza-admin.herokuapp.com/api/order2', {
            headers: {
              'X-Auth-Token': auth, 
              'X-User-Id': user
            },
            params: { 
              phone: phone, 
              cart: cart, 
              orderNum: orderNum, 
              deliveryType: deliveryType, 
              paymentType: paymentType,
              instructions: instructions,
              subtotal: subtotal, 
              tax: tax, 
              delivery: delivery,
              user: 'Napoli',
            }
          });
    
          return true;
          
        } catch (e) {
          // Got a network error, timeout, or HTTP error in the 400 or 500 range.
          return false;
        }
      },
  });
