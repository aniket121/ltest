import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RedirectRoute from 'components/Routes/RedirectRoute';
import AuthenticatedRoute from 'components/Routes/AuthenticatedRoute';
import UnauthenticatedRoute from 'components/Routes/UnauthenticatedRoute';
import AdminRoute from 'components/Routes/AdminRoute';

import Home from 'containers/home/Home';
import Signup from 'containers/signup/Signup';
import Login from 'containers/login/Login';
import Dashboard from 'containers/dashboard';
import Profile from 'containers/profile';
import NewStreamGroup from 'containers/stream-groups/New';
import ListStreamGroups from 'containers/stream-groups/List';
import ListStreamTargets from 'containers/stream-targets/List';
import ListBroadcasts from 'containers/broadcasts/List';
import Live from 'containers/live/Live';
import Admin from 'containers/admin';

import Redirect from 'components/Redirect';
import NotFound from 'containers/notfound/NotFound';

export default ({ childProps }) =>
  <Switch>
    <RedirectRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/dashboard"
      exact
      component={Dashboard}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/profile"
      exact
      component={Profile}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/destinations"
      exact
      component={ListStreamGroups}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/destinations/new"
      exact
      component={NewStreamGroup}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/destinations/:streamGroupId"
      exact
      component={ListStreamTargets}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/destinations/:streamGroupId/stream-targets/:platform/new"
      exact
      component={ListStreamTargets}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/broadcasts"
      exact
      component={ListBroadcasts}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/live"
      exact
      component={Live}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/live/:channelName"
      exact
      component={Live}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/admin"
      exact
      component={Admin}
      props={childProps}
    />
    <Route path="/redirect" exact component={Redirect} />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>;
