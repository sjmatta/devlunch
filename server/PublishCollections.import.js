/* globals Meteor */

import { Sites, Votes } from 'lib/Collections';
import { moment } from '{momentjs:moment}!vars';

Meteor.publish('Sites', () => Sites.find());
Meteor.publish('Votes', function votePublish() {
  if (this.userId) {
    const midnight = moment().startOf('day').toDate();
    return Votes.find({ createdAt: { $gte: midnight } }, { fields: { user: 0 }});
  }
  this.ready();
});
