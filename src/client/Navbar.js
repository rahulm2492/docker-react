import React from 'react';
import auth0Client from './Auth';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      {
        !auth0Client.isAuthenticated() &&
        <p className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</p>
      }
      {
        auth0Client.isAuthenticated() && (
        <div>
          <span className="mr-2 text-white">{auth0Client.getProfile().name}</span>
          <div className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</div>
          <div className="btn btn-dark">{JSON.stringify(auth0Client.getProfile())}</div>
        </div>
        )
      }
    </nav>
  );
}
export default NavBar;
