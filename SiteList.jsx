/* globals React, classNames */

SiteList = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    sites: React.PropTypes.array.isRequired,
    votes: React.PropTypes.array.isRequired,
    selectedSite: React.PropTypes.string.isRequired,
    user: React.PropTypes.object,
  },

  onClick(site) {
    this.props.onClick(site);
  },

  render() {
    const voteCount = _.countBy(this.props.votes, vote => vote.site);
    return (
      <div className="table-responsive">
        <table className="table table-striped unselectable">
          {this.props.sites.map(site => {
            const className = classNames(
              { 'info': this.props.selectedSite === site.name },
            );
            return (
              <tr key={site._id} className={className} onClick={this.onClick.bind(this, site)}>
                <td>{site.name}</td>
                <td>{voteCount[site.name]}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  },
});
