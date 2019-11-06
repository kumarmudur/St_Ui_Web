import React, { Component } from 'react';
import '../../styles/index.scss';

class NoMatch extends Component {
  render() {
    return ( <div>
      <div className="noMatch"> Oops... Page Not Found !</div>
    </div>
    );
  }
}

export default NoMatch;