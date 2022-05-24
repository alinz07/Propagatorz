import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [addUser, { error }] = useMutation(ADD_USER);

    const [signupError, setSignupError] = useState("");

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
            if (e.message.includes("dup") && e.message.includes("username")) {
                setSignupError("username is taken");
            } else if (
                e.message.includes("dup") &&
                e.message.includes("email")
            ) {
                setSignupError("email is already registered with Propagatorz");
            } else if (e.message.includes("minimum")) {
                setSignupError("password must be at least 5 characters long");
            }
        }
    };

    return (
        <Grid
            container
            display="flex"
            wrap="wrap"
            justifyContent="center"
            className="form-container"
        >
            <Grid item xs={9} md={7} lg={5} className="sign-in-form">
                <Grid item>
                    <form onSubmit={handleFormSubmit}>
                        <Grid item>
                            <h2 className="sign-in-form-heading">Sign Up</h2>
                        </Grid>
                        <Grid
                            container
                            textAlign="center"
                            justifyContent="center"
                        >
                            <Grid item xs={12}>
                                <label htmlFor="username">Username: </label>
                                <input
                                    className="form-input"
                                    placeholder="Your username"
                                    name="username"
                                    type="username"
                                    id="username"
                                    value={formState.username}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="email">Email address:</label>
                                <input
                                    className="form-input"
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="password">Password:</label>
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    id="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {error && <div>{signupError}</div>}
                            <Grid>
                                <button type="submit">Submit</button>
                            </Grid>
                        </Grid>
                    </form>

                    <Link to="/login" className="go-to-text">
                        ← Go to Login
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Signup;
