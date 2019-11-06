import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router/immutable';
import routes from './routes';
import 'floating-label-react/styles.css';


// import { Route, Switch } from 'react-router';
// import Counter from './containers/Counter';
// import Home from './components/Home';

const App = ({ history }) => {
  return (
    <ConnectedRouter history={ history }>
      { routes }
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;
