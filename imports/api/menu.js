import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const MenuCollection = new Mongo.Collection('menuCollection');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('menuCollection', function menuCollectionPublication() {
      return MenuCollection.find();
    });
  }

Meteor.methods({
    'menuCollection.insert'(menu, customMenu) {
      var menuStored =  Menu.findOne({})
      if(menuStored == null){
        MenuCollection.insert({ 
          menu,
          customMenu
        });
      }
      else{
        MenuCollection.update(menu._id, {
          $set: 
          {
            menu: menu,
            customMenu: customMenu
          },
        });
      }
    },
  });