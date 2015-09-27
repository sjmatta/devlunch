getTimeLeft = () => {
  const now = moment();
  const deadline = now.clone().hour(12).minute(0).second(0);
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
  castVote(vote) {
    assertUserAuthorized();
    // TODO: verify that site exists
    if (!getTimeLeft()) {
      throw new Meteor.Error('not-authorized');
    }
    Votes.upsert({user: Meteor.userId()},
      {user: Meteor.userId(), site: vote.site, createdAt: new Date() }
    );
  },
  deleteSite(site) {
    assertUserAuthorized();
    Sites.update({ name: site }, { $set: { deleted: true }} );
  },
});
