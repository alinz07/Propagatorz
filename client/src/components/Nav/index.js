import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {useNavigate} from 'react-router-dom'


function Nav({ currentPage }) {
  const navigate = useNavigate();
    function showNavigation() {
        if (Auth.loggedIn()) {
          return (
            <ul className="flex-row">

                <li className="mx-1">
                  {<Link to="/Home">
                     Posts
                  </Link>}
                  <p>Home</p>
                </li>
                {/* <li className="mx-1">
                    {/* <Link to="/SinglePost">
                        Create Post
                    </Link> */}
                {/* </li>  */}
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
            <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
         
          onClick={() => navigate('/login')}
  

          className={currentPage === 'login' ? 'nav-link active' : 'nav-link'}
        >
          Login
        </a>
      </li>
      </ul>
          );
        }
    }

    return (
        <header className="flex-row px-1">
            <h1>

                    <Avatar 
                    alt="plant image" 
                    src={require("../../assets/Images/sad-plant.jpg")}
                    sx={{ width: 50, height: 50}}
                    variant="square"
                    ></Avatar>
                   Propagatorz
                
            </h1>
            <nav>
              {showNavigation()}
            </nav>
        </header>
    );
  
}

export default Nav;