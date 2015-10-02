/* globals Meteor */

import { Sites, Votes } from 'lib/Collections';
import { moment } from '{momentjs:moment}!vars';

export const getTimeLeft = () => {
  const now = moment();
  const deadline = now.clone().hour(12).minute(0).second(0).tz('America/New_York');
  if (!now.isBefore(deadline)) {
    return false;
  }
  return deadline.from(now);
};

const assertUserAuthorized = () => {
  if (!Meteor.userId()) {
    throw new Meteor.Error('not-authorized');
  }
};

Meteor.methods({
  castVote(vote, isVeto = false) {
    assertUserAuthorized();
    // TODO: verify that site exists
    if (!getTimeLeft()) {
      throw new Meteor.Error('not-authorized');
    }
    Votes.upsert({user: Meteor.userId()},
      {user: Meteor.userId(), site: vote.site, createdAt: new Date(), veto: isVeto }
    );
  },
  toggleDelete(sitename) {
    assertUserAuthorized();
    const site = Sites.findOne({ name: sitename });
    Sites.update({ _id: site._id }, { $set: { deleted: !site.deleted }} );
  },
});
