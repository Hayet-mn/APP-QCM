import React,{Fragment,useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {login} from '../../actions/auth'
import './Register.css'


 const Login = ({login, isAuthenticated}) => {
     const [formData, setFormData]=useState({
     
         email:'',
         password:''
         
     });
     const{email,password}=formData;
     const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit= e=>{
        e.preventDefault();
       login(email, password);
    };

    // redirect if logged in
    if(isAuthenticated){
      return  <Redirect to='/qcm'/>;
    }
    
     return (
        <Fragment>
          <div className="register">
      <form className="form" onSubmit={e=>onSubmit(e)}>
      <h1 className="large text-primary"><i className="fas fa-user"></i>Se connecter </h1>

        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email"   value={email}   onChange={e=>onChange(e)} required/>

        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn" value="S'identifier" />
        <p className="my-1">
       vous n'avez pas de compte?<Link to="/register">Incription</Link>
      </p>
      </form>
     
      </div>
        </Fragment>
        )
}

Login.propTypes = {
  login: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps, { login })(Login);