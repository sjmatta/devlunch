/* globals Meteor, React, TimeSync, Accounts */

import 'lib/MeteorMethods';
import DevLunch from 'client/DevLunch';
import { $ } from '{jquery}!vars';

Meteor.subscribe('Sites');
Meteor.subscribe('Votes');

Meteor.startup(() => {
  TimeSync.resync();
  $(document).ready(() => {
    React.render(<DevLunch />, document.getElementById('render-target'));
    Accounts.ui.config({
      passwordSignupFields: 'USERNAME_ONLY',
    });
  });
});
