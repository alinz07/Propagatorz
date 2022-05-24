import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/globalState";
import { UPDATE_FILTER } from "../../utils/actions";
import appLogo from "../../assets/sad-plant.png";
import { Grid } from "@mui/material";

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
                <Grid container className="heading-container">
                    <Grid item>
                        <img
                            src={appLogo}
                            alt="plant logo"
                            width="80"
                            height="80"
                        />
                    </Grid>
                    <Grid item>
                        <h1 href="/">Propagatorz</h1>
                    </Grid>
                </Grid>
            </Link>

            <nav>{showNavigation()}</nav>
        </header>
    );
}

export default Nav;
