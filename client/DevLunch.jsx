/* globals React, TimeSync, AccountsUIWrapper, SiteList, ActionButtons, moment */

Meteor.subscribe('Sites');
Meteor.subscribe('Votes');

Meteor.startup(() => { TimeSync.resync(); });

const getTimeLeft = () => {
  const now = moment();
  const deadline = now.clone().hour(12).minute(0).second(0);
  if (!now.isBefore(deadline)) {
    return false;
  }
  return deadline.from(now);
};

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
    const siteQuery = this.state.hideCompleted ? { deleted: { $ne: true } } : {};
    return {
      sites: Sites.find(siteQuery, { sort: ['name'] }).fetch(),
      votes: Votes.find().fetch(),
      user: Meteor.user(),
      serverTime: TimeSync.serverTime(null, 1000),
    };
  },

  toggleHideDeleted() {
    this.setState({ hideCompleted: !this.state.hideCompleted });
  },

  render() {
    const timeLeft = getTimeLeft();
    const actionButtons = this.data.user && timeLeft ?
      <ActionButtons
        onVote={this.onVote.bind(this, this.state.selectedSite)}
        onDelete={this.onDelete.bind(this, this.state.selectedSite)}
        enabled={!!timeLeft}
      /> : <noscript />;
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
