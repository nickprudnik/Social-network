import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import LazyLoad from 'react-lazyload';

import store from './store';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logout } from './actions/auth';

import PrivateRoute from './components/shared/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AllPosts from './components/all-posts/AllPosts';
import SinglePost from './components/single-post/SinglePost';
import UserProfile from './components/user-profile/UserProifle';
import Feed from './components/feed/Feed';
import NotFound from './components/not-found/NotFound';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

if (localStorage.accessToken) {
  const { accessToken } = localStorage;
  setAuthToken(accessToken);
  const decoded = jwtDecode(accessToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <div id="parent-root" className="root-element">
            <Header pageWrapId="page-wrap" outerContainerId="parent-root" />
            <div className="container main">
              <LazyLoad height={200} once offset={100}>
                <div className="page-wrap" id="page-wrap">
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route exact path="/" component={AllPosts} />
                  <Route path="/post/:id" component={SinglePost} />
                  <Route path="/user/:id" component={UserProfile} />
                  <Route path="/join" exact component={Join} />
                  <Route path="/chat" exact component={Chat} />
                  <Switch>
                    <PrivateRoute path="/feed" component={Feed} />
                  </Switch>
                  <Route path="/404" component={NotFound} />
                </div>
              </LazyLoad>

            </div>
          </div>
          <Footer />
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
