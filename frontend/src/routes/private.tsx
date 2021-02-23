import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import store from 'src/store';

interface IRouteProps extends RouteProps{
    component: React.ComponentType;
}

const PrivateRoute: React.FC<IRouteProps> = ({component: Component, ...rest}) => {
  return (
      <Route 
        {...rest} 
        render={
            props => ( store.getState().auth.signedIn ? 
                        (<Component />) :
                        (<Redirect to={{ pathname: '/signin', state: { from: props.location }}}/>)
                    ) 
        }
      />
  );
}

export default PrivateRoute;