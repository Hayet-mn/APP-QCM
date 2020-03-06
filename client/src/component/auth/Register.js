import React,{Fragment,useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import {register} from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import propTypes from 'prop-types';
import './Register.css'

 const Register = ({ setAlert, register, isAuthenticated }) => {
     const [formData, setFormData]=useState({
         name:'',
         email:'',
         password:'',
         password2:'',

     });
     const{name,email,password,password2}=formData;

     const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit= async e=>{
        e.preventDefault();
        if(password !== password2)
        setAlert('password do not match', 'danger');
        else {

          register({ name, email, password})
        }

    };

     // redirect if logged in
     if(isAuthenticated){
      return  <Redirect to='/qcm'/>;
    }
    
     return (
        <Fragment>
     
          <div className='register'>
          <form className="form" onSubmit={e=>onSubmit(e)}>
            <h1 className="large text-primary">Inscription</h1>
      <p className="my-1"><i className="fas fa-user"></i> Creer Un compte pour accéder à QCM</p>
      
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name}
          onChange={e=>onChange(e)}  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email"   value={email}   onChange={e=>onChange(e)}/>

        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>onChange(e)}
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            
            onChange={e=>onChange(e)}
          />
            
        </div>
        <input type="submit" className="btn" value="
S'inscrire" />
        <p className="my-1">
        
   Vous avez déjà un compte? <Link to="/">Login</Link>
      </p>
      </form>
      </div>
 
        </Fragment>
        );
};

Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);