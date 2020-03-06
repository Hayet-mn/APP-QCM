import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    if(isAuthenticated){
        return(
             <div className="navBar">
             <span> Qcm Application </span>

             <Link  onClick={this.onLogoutClick.bind(this)} to='/'  >
             <button className="btnlogout">Deconnexion</button></Link>
             </div>
        )
    }
    else {
        return(
            <div className="navBar"> 
             <span> Qcm Application </span>
             </div>
        )
    }
  
   
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout})(
  Navbar
);
