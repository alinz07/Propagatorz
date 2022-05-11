import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/globalState";
import { UPDATE_FILTER } from "../../utils/actions";
// import Avatar from "@mui/material/Avatar";
// import { Grid } from "@mui/material";
import appLogo from "../../assets/Images/sad-plant.png";

function Nav() {
    const [state, dispatch] = useStoreContext();

    function filterPosts() {
        dispatch({ type: UPDATE_FILTER });
    }

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <div>
                    <ul className="flex-row">
                        <li className="mx-1">
                            {
                                <Link to="/" onClick={filterPosts}>
                                    {state.postFilter
                                        ? "All Posts"
                                        : "My Posts"}
                                </Link>
                            }
                        </li>
                        <li className="mx-1">
                            <Link to="/createPost">Create Post</Link>
                        </li>
                        <li>
                            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                            <a href="/" onClick={() => Auth.logout()}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <ul>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>

                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header>
            <Link to="/">
                {/* <Avatar
                    alt="plant image"
                    src={require("../../assets/Images/sad-plant.png")}
                    sx={{ width: 80, height: 80 }}
                    variant="square"
                ></Avatar> */}
                <div className="heading-container">
                    <img src={appLogo} alt="plant logo" width="80" />
                    <h1 href="/">Propagatorz</h1>
                </div>
            </Link>

            <nav>{showNavigation()}</nav>
        </header>
    );
}

export default Nav;
