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
import AddStatus from './components/profile-form/AddStatus';
import EditPicture from './components/profile-form/EditPicture';
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post';
import AdminDash from './components/admin/AdminDash';
import EligibilityForm from './components/po/EligibilityForm';
import Eligible from './components/po/Eligible';
import PrintPDF from './components/po/PrintPDF';
import AddEvent from './components/faculty/AddEvent';
import Events from './components/faculty/Events';
import MyEvents from './components/faculty/MyEvents';
import ByEvents from './components/faculty/ByEvents';
import Event from './components/faculty/Event';
import Chat from './components/chat/Chat'
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
              <PrivateRoute exact path="/post/:id" component={Post}/>
              <PrivateRoute exact path="/create_profile" component={CreateProfile}/>
              <PrivateRoute exact path="/edit_profile" component={EditProfile}/>
              <PrivateRoute exact path="/add_education" component={AddEducation}/>
              <PrivateRoute exact path="/add_skill/:id" component={AddSkill}/>
              <PrivateRoute exact path="/add_status" component={AddStatus}/>
              <PrivateRoute exact path="/edit_picture" component={EditPicture}/>
              <PrivateRoute exact path="/po_form" component={EligibilityForm}/>
              <PrivateRoute exact path="/eligible_students" component={Eligible}/>
              <PrivateRoute exact path="/print_list" component={PrintPDF}/>
              <PrivateRoute exact path="/add_event" component={AddEvent}/>
              <PrivateRoute exact path="/events" component={Events}/>
              <PrivateRoute exact path="/my_events" component={MyEvents}/>
              <PrivateRoute exact path="/by_events" component={ByEvents}/>
              <PrivateRoute exact path="/event/:id" component={Event}/>
              <PrivateRoute exact path="/chat" component={Chat}/>
            </Switch>
          </section>
        </Fragment>
      </Router>  
    </Provider>
  )
};

export default App;