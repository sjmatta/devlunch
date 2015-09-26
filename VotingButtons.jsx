/* globals React */

VotingButtons = React.createClass({
  propTypes: {
    onVote: React.PropTypes.func.isRequired,
  },

  render() {
    return (
      <div>
        <a role="button" className="btn btn-lg btn-primary" onClick={this.props.onVote}>Vote</a>
        <a role="button" className="btn btn-lg btn-danger">Veto</a>
      </div>
    );
  },
});
