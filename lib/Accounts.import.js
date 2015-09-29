/* globals Accounts */

Accounts.config({
  restrictCreationByEmailDomain: 'dtec.com',
});

Accounts.ui.config({
  requestOfflineToken: {
    google: true,
  },
});
