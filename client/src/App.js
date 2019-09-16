import React, { Fragment, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddEducation from './components/profile-form/AddEducation';
import AddSkill from './components/profile-form/AddSkill';
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import AdminDash from './components/admin/AdminDash';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  },[]);

  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <section className="plain-page">
          <Route exact path="/" component={Landing}/>
            <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profiles" component={Profiles}/>
              <PrivateRoute exact path="/profile/:id" component={Profile}/>
              <PrivateRoute exact path="/admindash" component={AdminDash}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/posts" component={Posts}/>
              <PrivateRoute exact path="/create_profile" component={CreateProfile}/>
              <PrivateRoute exact path="/edit_profile" component={EditProfile}/>
              <PrivateRoute exact path="/add_education" component={AddEducation}/>
              <PrivateRoute exact path="/add_skill" component={AddSkill}/>
            </Switch>
          </section>
        </Fragment>
      </Router>  
    </Provider>
  )
};

export default App;