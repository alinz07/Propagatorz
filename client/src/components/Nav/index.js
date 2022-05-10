import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useStoreContext } from "../../utils/globalState";
import { UPDATE_FILTER } from "../../utils/actions";

function Nav() {
    const [state, dispatch] = useStoreContext();

    function filterPosts() {
        dispatch({ type: UPDATE_FILTER });
    }

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (

                    <li>
                        {<Link to="/Home">
                            My Posts
                        </Link>}
                <ul className="flex-row">
                    <li className="mx-1">
                        {
                            <Link to="/" onClick={filterPosts}>
                                {state.postFilter ? (
                                    <div>All Posts</div>
                                ) : (
                                    <div>My Posts</div>
                                )}
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
            );
        } else {
            return (
                <ul>
                    <li>
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header>
            <Link to="/">
                <h1 href='/'>
                    <Avatar
                        alt="plant image"
                        src={require("../../assets/Images/sad-plant.png")}
                        sx={{ width: 80, height: 80 }}
                        variant="square"
                    ></Avatar>
                    Propagatorz
                </h1>
            </Link>
            <nav>
                {showNavigation()}
            </nav>
        </header>
    );

}

export default Nav;
