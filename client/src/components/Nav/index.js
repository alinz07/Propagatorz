import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'

function Nav() {
  
    function showNavigation() {
        if (Auth.loggedIn()) {
          return (
            <ul className="flex-row">

                <li className="mx-1">
                  <Link to="/Home">
                     Posts
                  </Link>
                </li>
                <li className="mx-1">
                    <Link to="/SinglePost">
                        Create Post
                    </Link>
                </li>
              <li className="mx-1">
                {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                <a href="/" onClick={() => Auth.logout()}>
                  Logout
                </a>
                
              </li>
            </ul>
          );
        } else {
          return (
            <ul className="flex-row">
              <li className="mx-1">
                <Link to="/signup">
                  Signup
                </Link>
              </li>
              <li className="mx-1">
                <Link to="/login">
                  Login
                </Link>
              </li>
              
            </ul>
          );
        }
    }

    return (
        <header className="flex-row px-1">
            <h1>
                <Link to="/">
                    <Avatar 
                    alt="plant image" 
                    src="../assets/images/sad-plant.jpg"
                    sx={{ width: 20, height: 20}}
                    ></Avatar>
                    Propagatorz
                </Link>
            </h1>
            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default Nav;