/* globals React */

import ActionButtons from './ActionButtons';
import { _ } from '{underscore}!vars';
import { classNames } from '{maxharris9:classnames}!vars';

export default React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    sites: React.PropTypes.array.isRequired,
    votes: React.PropTypes.array.isRequired,
    selectedSite: React.PropTypes.string.isRequired,
    actionsEnabled: React.PropTypes.bool.isRequired,
    userLoggedIn: React.PropTypes.bool.isRequired,
  },

  onClick(site) {
    this.props.onClick(site);
  },

  render() {
    const { onClick, sites, votes, selectedSite, actionsEnabled, userLoggedIn, ...other } = this.props;
    const voteCount = _.chain(votes).filter(vote => vote.user === undefined).reduce((mem, vote) => {
      const ret = {};
      ret[vote.site] = (mem[vote.site] || 0) + vote.veto ? -1 : 1;
      return ret;
    }, {}).value();
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover table-condensed unselectable" style={{cursor: 'pointer'}}>
          <thead>
            <th className="col-md-8 hidden">Location</th>
            <th className="col-md-1 hidden">Votes</th>
            <th className="col-md-3 hidden">Actions</th>
          </thead>
          <tbody>
            {sites.map(site => {
              const isSiteSelected = selectedSite === site.name;
              const actionButtons = <ActionButtons votingEnabled={this.props.actionsEnabled} visible={isSiteSelected && userLoggedIn} deleted={site.deleted} { ...other } />;
              const className = classNames(
                { 'info': isSiteSelected },
                { 'strikeout': site.deleted },
              );
              return (
                <tr key={site._id} className={className} height="45px" onClick={this.onClick.bind(this, site)}>
                  <td>{site.name}</td>
                  <td style={{textAlign: 'right'}}>{voteCount[site.name]}</td>
                  <td style={{textAlign: 'right'}}>{actionButtons}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
});
