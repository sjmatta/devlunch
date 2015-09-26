/* globals React, AccountsUIWrapper, SiteList */

Sites = new Mongo.Collection('Sites');
Votes = new Mongo.Collection('Votes');

if (Meteor.isClient) {
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

    onVote(site) {
      console.log(site);
      Votes.insert({
        user: this.data.user,
        site: site,
      });
    },

    getMeteorData() {
      return {
        sites: Sites.find({}, { sort: ['name'] }).fetch(),
        votes: Votes.find({}).fetch(),
        user: Meteor.user(),
      };
    },

    render() {
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
            <a role="button" className="btn btn-lg btn-primary" onClick={this.onVote.bind(this, this.state.selectedSite)}>Vote</a>
            <a role="button" className="btn btn-lg btn-danger">Veto</a>
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
