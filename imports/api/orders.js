import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Orders = new Mongo.Collection('orders');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('orders', function ordersPublication() {
      return Orders.find();
    });
  }

Meteor.methods({
    'orders.insert'(firstName, lastName) {
      //check(text, String);
   
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
   
      Orders.insert({ 
        firstName, 
        lastName,
        userId: Meteor.userId(),
        createdAt: new Date() 
      });
    },
  });
