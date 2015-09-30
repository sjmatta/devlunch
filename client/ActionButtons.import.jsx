/* globals React */

import { classNames } from '{maxharris9:classnames}!vars';

export default React.createClass({
  propTypes: {
    onVote: React.PropTypes.func.isRequired,
    onVeto: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    votingEnabled: React.PropTypes.bool.isRequired,
    visible: React.PropTypes.bool.isRequired,
    deleted: React.PropTypes.bool.isRequired,
  },

  render() {
    const { votingEnabled, visible, onVote, onVeto, onDelete, deleted, ...other } = this.props;
    const hiddenStyle = { visibility: 'hidden' };
    const divStyle = visible ? {} : hiddenStyle;
    const voteStyle = votingEnabled ? {} : hiddenStyle;
    const disabled = !votingEnabled ? 'disabled' : '';
    const classes = classNames('btn', 'btn-sm');
    return (
      <div className="btn-group" role="group" style={divStyle}>
        <a role="button" style={voteStyle} className={classNames(classes, disabled, 'btn-primary')} onClick={onVote}>Vote</a>
        <a role="button" style={voteStyle} className={classNames(classes, disabled, 'btn-warning')} onClick={onVeto}>Veto</a>
        <a role="button" className={classNames(classes, 'btn-danger')} onClick={onDelete}>
          {deleted ? 'Undelete' : 'Delete'}
        </a>
      </div>
    );
  },
});
