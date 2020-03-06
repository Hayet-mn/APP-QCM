import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch } from "react-router-dom";
import PrivateRoute from './component/routing/PrivateRoute';
import  setAuthToken from './component/utils/setAuthToken';
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import { loadUser } from './actions/auth';
import Alert from "./component/Alert";
import NavBar from './component/utils/navBar';
import store from './store';
import {Provider} from 'react-redux';
import MainQcm from './component/mainQcm'
import './App.css';





if (localStorage.token){
  setAuthToken(localStorage.token)
  }

const  App=() =>{
  
  useEffect(()=> {
  store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
      
      <section >
        <NavBar />
        <Alert />
      <Switch >
        <Route exact path='/' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <PrivateRoute exact path='/qcm' component={MainQcm}/>
      </Switch>
     

      </section>
      </Fragment>
      </Router>
      </Provider> 
  );
};

export default App;
