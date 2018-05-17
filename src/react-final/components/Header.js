import React from 'react';
import { Link } from 'react-router-dom';

const LoggedNav = ({user,logOutFn}) => {
  return (
    <div>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/newpost"
          >
            <i className="ion-compose">
            </i>&nbsp;New Post
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/setting"
          >
            <i className="ion-gear-a">
            </i>
            &nbsp;Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${user.username}`}
          >
            <img
              src={user.image}
              className="user-pic"
              alt={user.username}
            />
              {user.username}
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href=""
            onClick={logOutFn}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

const LogoutNav = () => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link
          className="nav-link active"
          to="/"
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/login"
        >
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/signup"
        >
          Signup
        </Link>
      </li>
    </ul>
  );
}

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="index.html">conduit</a>
          {
            (this.props.loggedUser && this.props.loggedUser.username)
              ? <LoggedNav
                  user={this.props.loggedUser}
                  logOutFn={this.props.doLogout}
                />
              : <LogoutNav />
          }
        </div>
      </nav>
    );
  }
}

export default Header;
