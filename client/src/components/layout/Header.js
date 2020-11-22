import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./index.css"
import { slide as Menu } from "react-burger-menu";
import { handleOnClose } from "react-burger-menu";

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
          <ul>
            <li className="menu-item"><Link className="items" to={"/user/" + user.id}>
              My Profile
            </Link></li>
            <li className="menu-item"><Link className="items" to={"/join/"}>Join Room</Link></li>
            <li className="menu-item"><Link className="items" to="#" onClick={this.onLogout}>Log Out</Link></li>
          </ul>
      );
    } else {
      links = (
        <ul>
            <li className="menu-item"><Link className="items" to="/login">
              <i className="fa fa-sign-in"></i>
              Log In
            </Link></li>
            <li className="menu-item"><Link className="items" to="/register">
              <i className="fa fa-user-plus"></i>
              Register
            </Link></li>
        </ul>
      );
    }
    return (
      <>
      <Menu {...this.props} onClose={ handleOnClose } className="navbar-nav">{links}</Menu>
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-light">
        <div className="container">
          <div className="logo-wrapper">
            <Link className="navbar-brand logo" to="/">
              Itech-feed
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated && (
                <li className="nav-item"></li>
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
