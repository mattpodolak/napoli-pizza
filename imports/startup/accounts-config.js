import { Accounts } from 'meteor/accounts-base';

/* clean out all guest accounts more than 24 hours old (default behavior) */
//Accounts.removeOldGuests();
AccountsGuest.anonymous = true