const assertUserAuthorized = () => {
  if (!Meteor.userId()) {
    throw new Meteor.Error('not-authorized');
  }
};

Meteor.methods({
  castVote(vote) {
    assertUserAuthorized();
    // TODO: verify that site exists
    Votes.upsert({user: Meteor.userId()},
      {user: Meteor.userId(), site: vote.site, createdAt: new Date() }
    );
  },
  deleteSite(site) {
    assertUserAuthorized();
    Sites.update({ name: site }, { $set: { deleted: true }} );
  },
});
