/* globals React */

ActionButtons = React.createClass({
  propTypes: {
    onVote: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    actionsEnabled: React.PropTypes.bool.isRequired,
    isSiteSelected: React.PropTypes.bool.isRequired,
  },

  render() {
    const { actionsEnabled, isSiteSelected, onVote, onDelete, ...other } = this.props;
    const style = isSiteSelected ? {} : { visibility: 'hidden' };
    const disabled = !actionsEnabled ? 'disabled' : '';
    const classes = classNames('btn', 'btn-sm');
    return (
      <div className="btn-group" role="group" style={style}>
        <a role="button" className={classNames(classes, disabled, 'btn-primary')} onClick={onVote}>Vote</a>
        <a role="button" className={classNames(classes, 'btn-danger')} onClick={onDelete}>Delete</a>
      </div>
    );
  },
});
