import { Restivus } from 'meteor/nimble:restivus';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';

const customMenuData = require('../ui/menu/custom_json.json');
const menuData = require('../ui/menu/menu.json');
import { MenuCollection } from './menu.js';

if (Meteor.isServer) {
    // Global API configuration
    var Api = new Restivus({
      useDefaultAuth: true,
      prettyJson: true
    });

    Api.addRoute('menu', {authRequired: false}, {
        get: function () {
            //return menu data to website for menu management
            var menu = MenuCollection.findOne({});

            if(menu == null){
                var mainMenu = menuData;
                var customMenu = menuData;
                MenuCollection.insert({mainMenu, customMenu})
                return {"status": "success", "menu": menuData}
            }
            else{
                return {"status": "success", "menu": menu}
            }
        },
        post: function () {
            // var fs = require('fs');
            var menu = {
                pizza_deals: [],
                specialty: [],
                freedelivery: [],
                wingsandsandwiches: [],
                salads: [],
                sides: [],
                pitas: []
            }
            try{
                //accept menu with updated statuses
                var updatedMenu = this.bodyParams.menu;
                // var menuJSON = JSON.stringify(updatedMenu);
                // fs.unlinkSync('../../../../../imports/ui/menu/menu.json');
                // fs.writeFileSync('../../../../../imports/ui/menu/menu.json', menuJSON);

                function checkItems(category){
                    var items = updatedMenu[category]
                    for(var i=0; i < items.length; i++){
                        if(items[i].active){
                            menu[category].push(items[i])
                        }
                    }
                }

                checkItems('freedelivery');
                checkItems('pizza_deals');
                checkItems('specialty');
                checkItems('wingsandsandwiches');
                checkItems('salads');
                checkItems('sides');
                checkItems('pitas');

                //updatedMenu is the full menu
                //menu is the custom menu
                var menuDB = MenuCollection.findOne({});
                if(menuDB != null){
                    MenuCollection.update(menuDB._id, {
                        $set: 
                        {
                          mainMenu: updatedMenu,
                          customMenu: menu
                        },
                    });
                }
                else{
                    var mainMenu = updatedMenu
                    var customMenu = menu
                    MenuCollection.insert({mainMenu, customMenu})
                }

                // var json = JSON.stringify(menu);
                // fs.unlinkSync('../../../../../imports/ui/menu/custom_json.json');
                // fs.writeFileSync('../../../../../imports/ui/menu/custom_json.json', json);

            }
            catch(e){
                return {"status": "fail", "message": e}
            }
            
            return {"status": "success"}
        }
    });

}