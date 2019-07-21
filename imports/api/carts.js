import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Carts = new Mongo.Collection('carts');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('carts', function cartsPublication() {
      return Carts.find();
    });
  }

Meteor.methods({
    'carts.insert'(itemName, category, addonValue, pizzaTop1, pizzaTop2, pizzaTop3, pizzaTop4, pop1, pop2, pop3, pop4, pop5, pop6, dip1, dip2, dip3, dip4, dip5, dip6, pasta, wings, chips) {
      //check(text, String);
   
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
   
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
      Carts.remove(cartId, userId);
    },
    'carts.removeAll'() {
             // Make sure the user is logged in before inserting a task
    //   if (! this.userId) {
    //     throw new Meteor.Error('not-authorized');
    //   }
        //remove all for a userId
        //var userId = Meteor.userId()
        //Carts.remove(userId);
      },
  });
