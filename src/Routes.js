import React from 'react';
import { Route, Switch } from 'react-router-dom';

const AsyncHome = React.lazy(() => import('./containers/Home'));
const AsyncLogin = React.lazy(() => import('./containers/Login'));
const AsyncNotFound = React.lazy(() => import('./containers/NotFound'));

/**
 * Refer https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
 * for more details on async route by Code Splitting.
 *
 * Its source code [here](https://github.com/AnomalyInnovations/serverless-stack-demo-client)
 */
// export default ({ childProps }) => (
//   <Switch>
//     <AppliedRoute path="/" exact component={AsyncHome} props={childProps} />
//     <UnauthenticatedRoute
//       path="/login"
//       exact
//       component={AsyncLogin}
//       props={childProps}
//     />
//     <Route component={AsyncNotFound} />
//   </Switch>
// );
