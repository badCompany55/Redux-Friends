import React from 'react';
import {connect} from 'react-redux';
import {addfriend, resetMsg, editFriend} from '../actions/actions.js';
import {Link} from 'react-router-dom';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      email: '',
    };
  }

  gatherInput = e => {
    this.setState({[e.target.id]: e.target.value});
  };

  submitNewFriend = e => {
    e.preventDefault();
    let newFriend = {...this.state};
    newFriend.id = this.props.id;
    this.props.addfriend(newFriend, this.props.friendsEmails);
    this.setState({name: '', age: '', email: ''});
  };

  editFriend = e => {
    e.preventDefault();
    let friendId = Number(this.props.match.params.id);
    let friendObj = {...this.state};
    this.props.editFriend(friendId, friendObj);
    this.setState({name: '', age: '', email: ''});
  };

  render() {
    return (
      <div className="formCont">
        <form
          className="form"
          onSubmit={
            this.props.location.pathname.includes('addfriend')
              ? this.submitNewFriend
              : this.editFriend
          }>
          <div className="cont">
            {this.props.addedFriend && (
              <div className="mess">Friend Successfully added</div>
            )}
            {this.props.erroMsg && (
              <div className="errorMsg">{this.props.erroMsg}</div>
            )}
            {this.props.updatingFriends && (
              <div className="mess">Friend updated Successfully</div>
            )}
            <Link to="/friends">
              <i class="far fa-window-close" onClick={this.props.resetMsg} />
            </Link>
          </div>
          {this.props.location.pathname.includes('addfriend') ? (
            <h2 className="formHead">Add Friend</h2>
          ) : (
            <h2 className="formHead">Edit Friend</h2>
          )}

          <div className="nameCont">
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.gatherInput}
            />
          </div>
          <div className="age">
            <label htmlFor="age">Age: </label>
            <input
              id="age"
              type="text"
              value={this.state.age}
              onChange={this.gatherInput}
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              value={this.state.email}
              onChange={this.gatherInput}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mstp = state => {
  const ids = state.friends.map(fr => {
    return fr.id;
  });
  const largestId = Math.max(...ids);
  return {
    id: largestId + 1,
    friendsEmails: state.friends.map(fr => {
      return fr.email;
    }),
    addedFriend: state.addedFriends,
    erroMsg: state.error,
    updatingFriends: state.updatingFriends,
  };
};

export default connect(
  mstp,
  {addfriend, resetMsg, editFriend},
)(Form);
