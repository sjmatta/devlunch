/* globals React */

import { classNames } from '{maxharris9:classnames}!vars';

export default React.createClass({
  propTypes: {
    onVote: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    votingEnabled: React.PropTypes.bool.isRequired,
    visible: React.PropTypes.bool.isRequired,
    deleted: React.PropTypes.bool.isRequired,
  },

  render() {
    const { votingEnabled, visible, onVote, onDelete, deleted, ...other } = this.props;
    const style = visible ? {} : { visibility: 'hidden' };
    const disabled = !votingEnabled ? 'disabled' : '';
    const classes = classNames('btn', 'btn-sm');
    return (
      <div className="btn-group" role="group" style={style}>
        <a role="button" className={classNames(classes, disabled, 'btn-primary')} onClick={onVote}>Vote</a>
        <a role="button" className={classNames(classes, 'btn-danger')} onClick={onDelete}>
          {deleted ? 'Undelete' : 'Delete'}
        </a>
      </div>
    );
  },
});
