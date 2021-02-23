import React from 'react';
import {ConnectedRouter} from 'connected-react-router';
import { Switch } from 'react-router-dom';

import PrivateRoute from './private';
import GuestRoute from './guest';

import Main from 'src/pages/Main';
import SignIn from 'src/pages/Auth/SignIn';
import SignUp from 'src/pages/Auth/SignUp';

import history from 'src/store/modules/history/reducer';

const Routes: React.FC = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <GuestRoute path="/signin" exact component={SignIn} />
      <GuestRoute path="/signup" exact component={SignUp} />
      <PrivateRoute path="/" exact component={Main} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;