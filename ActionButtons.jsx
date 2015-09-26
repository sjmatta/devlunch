/* globals React */

ActionButtons = React.createClass({
  propTypes: {
    onVote: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  },

  render() {
    return (
      <div className="btn-group" role="group">
        <a role="button" className="btn btn-lg btn-primary" onClick={this.props.onVote}>Vote</a>
        <a role="button" className="btn btn-lg btn-warning">Veto</a>
        <a role="button" className="btn btn-lg btn-danger" onClick={this.props.onDelete}>Delete</a>
      </div>
    );
  },
});
