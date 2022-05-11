import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useStoreContext } from "../../utils/globalState";
import { UPDATE_FILTER } from "../../utils/actions";
import { Tooltip, Button } from "@mui/material";

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
                                <Link
                                    to="/"
                                    onClick={filterPosts}
                                    id="filter-posts"
                                >
                                    {state.postFilter ? (
                                        <Button
                                            id="nav-btn"
                                            variant="contained"
                                        >
                                            <Tooltip title="View all posts">
                                                <div>All Posts</div>
                                            </Tooltip>
                                        </Button>
                                    ) : (
                                        <Button
                                            id="nav-btn"
                                            variant="contained"
                                        >
                                            <Tooltip title="View only my posts">
                                                <div>My Posts</div>
                                            </Tooltip>
                                        </Button>
                                    )}
                                </Link>
                            }
                        </li>
                        <li className="mx-1">
                            <Button id="nav-btn" variant="contained">
                                <Tooltip title="Create a post">
                                    <Link to="/createPost">Create Post</Link>
                                </Tooltip>
                            </Button>
                        </li>
                        <li>
                            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                            <Button id="nav-btn" variant="contained">
                                <Tooltip title="Logout">
                                    <a href="/" onClick={() => Auth.logout()}>
                                        Logout
                                    </a>
                                </Tooltip>
                            </Button>
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
                <h1 href="/">
                    <Avatar
                        alt="plant image"
                        src={require("../../assets/Images/sad-plant.png")}
                        sx={{ width: 80, height: 80 }}
                        variant="square"
                    ></Avatar>
                    Propagatorz
                </h1>
            </Link>
            <nav>{showNavigation()}</nav>
        </header>
    );
}

export default Nav;
