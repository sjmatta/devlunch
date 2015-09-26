/* globals React, AccountsUIWrapper, SiteList, ActionButtons */

Sites = new Mongo.Collection('Sites');
Votes = new Mongo.Collection('Votes');

if (Meteor.isServer) {
  Meteor.publish('Sites', () => Sites.find({ deleted: { $ne: true } }));
  Meteor.publish('Votes', function votePublish() {
    if (this.userId) {
      return Votes.find({}, { fields: { user: 0 }});
    }
    this.ready();
  });
}

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

if (Meteor.isClient) {
  Meteor.subscribe('Sites');
  Meteor.subscribe('Votes');

  const DevLunch = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
      return { selectedSite: '' };
    },

    onClick(site) {
      this.setState({
        selectedSite: this.state.selectedSite !== site.name ? site.name : '',
      });
    },

    onDelete(site) {
      Meteor.call('deleteSite', site);
    },

    onVote(site) {
      Meteor.call('castVote', { site: site });
    },

    getMeteorData() {
      return {
        sites: Sites.find({}, { sort: ['name'] }).fetch(),
        votes: Votes.find().fetch(),
        user: Meteor.user(),
      };
    },

    render() {
      const actionButtons = this.data.user ?
        <ActionButtons
          onVote={this.onVote.bind(this, this.state.selectedSite)}
          onDelete={this.onDelete.bind(this, this.state.selectedSite)}
        /> : <noscript />;
      return (
        <div className="container-fluid">
          <div className="col-sm-12 col-md-6">
            <AccountsUIWrapper  />
            <SiteList
              onClick={this.onClick}
              sites={this.data.sites}
              votes={this.data.votes}
              user={this.data.user}
              selectedSite={this.state.selectedSite} />
          </div>
          <div className="col-sm-12 col-md-6">
            {actionButtons}
          </div>
        </div>
      );
    },
  });

  $(document).ready(() => {
    React.render(<DevLunch />, document.getElementById('render-target'));
    Accounts.ui.config({
      passwordSignupFields: 'USERNAME_ONLY',
    });
  });
}
