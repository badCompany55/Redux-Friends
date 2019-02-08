import React from 'react';
import {Link} from 'react-router-dom';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }
  captureInput = e => {
    this.setState({input: e.target.value});
  };

  setLocation = () => {
    window.location.hash = this.state.input;
    this.setState({input: ''});
  };

  render() {
    return (
      <nav className="navbar">
        <input
          id="search"
          type="text"
          value={this.state.input}
          onChange={this.captureInput}
        />
        <button className="search" onClick={this.setLocation}>
          Seach
        </button>
        <Link to="/">
          <div className="home navButton">Home</div>
        </Link>
        <Link to="/friends">
          <div className="friends navButton">Friends</div>
        </Link>
        <Link to="/friends/addfriend">
          <div className="addFriend navButton">Add Friend</div>
        </Link>
      </nav>
    );
  }
}

// export const Home = props => {
//   return (
//     <nav className="navbar">
//       <label className="search" for="search">Search</label>
//       <Link to="/">
//         <div className="home navButton">Home</div>
//       </Link>
//       <Link to="/friends">
//         <div className="friends navButton">Friends</div>
//       </Link>
//       <Link to="/friends/addfriend">
//         <div className="addFriend navButton">Add Friend</div>
//       </Link>
//     </nav>
//   );
// };
