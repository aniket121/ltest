import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  componentWillMount = () => {
    if (this.props.userToken) {
      this.props.history.push('/destinations');
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="Home">
      </div>
    );
  }
}

export default withRouter(Home);
