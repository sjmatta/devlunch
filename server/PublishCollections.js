Meteor.publish('Sites', () => Sites.find());
Meteor.publish('Votes', function votePublish() {
  if (this.userId) {
    const midnight = moment().startOf('day').toDate();
    return Votes.find({ createdAt: { $gte: midnight } }, { fields: { user: 0 }});
  }
  this.ready();
});
