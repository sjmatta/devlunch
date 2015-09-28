Meteor.publish('Sites', () => Sites.find());
Meteor.publish('Votes', function votePublish() {
  if (this.userId) {
    return Votes.find({}, { fields: { user: 0 }});
  }
  this.ready();
});
