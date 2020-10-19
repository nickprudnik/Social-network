import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./index.css"
import { slide as Menu } from "react-burger-menu";

import { logout } from "../../actions/auth";

class Header extends React.Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let links;
    if (isAuthenticated) {
      links = (
        <li>
          <ul>
            <li><Link className="menu-item" to={"/user/" + user.id}>
              My Profile
            </Link></li>
            <li><Link className="menu-item" href="#" onClick={this.onLogout}>Log Out</Link></li>
          </ul>
        </li>
      );
    } else {
      links = (
        <ul>
            <li><Link className="menu-item" to="/login">
              <i className="fa fa-sign-in"></i>
              Log In
            </Link></li>
            <li><Link className="menu-item" to="/register">
              <i className="fa fa-user-plus"></i>
              Register
            </Link></li>
        </ul>
      );
    }
    return (
      <>
      <Menu {...this.props} className="navbar-nav">{links}</Menu>
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Itech-feed
          </Link>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/feed">
                    <i className="fa fa-rss"></i>
                    Feed
                  </Link>
                </li>
              )}
            </ul>
            
          </div>
        </div>
      </nav>
      </>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Header);
