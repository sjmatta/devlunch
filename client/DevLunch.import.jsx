/* globals React, Meteor, ReactMeteorData, Accounts */

import AccountsUIWrapper from 'client/AccountsUIWrapper';
import SiteList from 'client/SiteList';
import { TimeSync } from '{mizzao:timesync}!vars';
import { Sites, Votes } from 'lib/Collections';
import { getTimeLeft } from 'lib/MeteorMethods';

export default React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return { selectedSite: '', hideDeleted: true };
  },

  onClick(site) {
    this.setState({
      selectedSite: site.name,
    });
  },

  onDelete(site) {
    Meteor.call('toggleDelete', site);
  },

  onVote(site) {
    Meteor.call('castVote', { site: site });
  },

  onVeto(site) {
    Meteor.call('castVote', { site: site }, true );
  },

  getMeteorData() {
    const siteQuery = this.state.hideDeleted ? { deleted: { $ne: true } } : {};
    return {
      sites: Sites.find(siteQuery, { sort: ['name'] }).fetch(),
      votes: Votes.find().fetch(),
      user: Meteor.user(),
      serverTime: TimeSync.serverTime(null, 1000),
    };
  },

  toggleHideDeleted() {
    this.setState({ hideDeleted: !this.state.hideDeleted });
  },

  render() {
    const timeLeft = getTimeLeft();
    const actionsEnabled = !!this.data.user && !!timeLeft;
    return (
      <div className="container-fluid">
        <div className="col-sm-12 col-md-6">
          <AccountsUIWrapper  />
          <p>{timeLeft ? 'Voting ends ' + timeLeft + '!' : 'Voting closed for today.'}</p>
          <label>
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideDeleted}
              onClick={this.toggleHideDeleted} />
            Hide Deleted Sites
          </label>
          <SiteList
            onClick={this.onClick}
            sites={this.data.sites}
            votes={this.data.votes}
            onVote={this.onVote.bind(this, this.state.selectedSite)}
            onVeto={this.onVeto.bind(this, this.state.selectedSite)}
            onDelete={this.onDelete.bind(this, this.state.selectedSite)}
            selectedSite={this.state.selectedSite}
            actionsEnabled={actionsEnabled}
            userLoggedIn={!!this.data.user}/>
        </div>
      </div>
    );
  },
});
