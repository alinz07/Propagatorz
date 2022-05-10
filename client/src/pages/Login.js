import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Grid } from "@mui/material";

function Login(props) {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: {
                    email: formState.email,
                    password: formState.password,
                },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <Grid container display="flex" wrap="wrap" justifyContent="center" className='form-container'>
            <Grid item xs={9} md={7} lg={5} className="sign-in-form">

                <Grid item>
                    <form onSubmit={handleFormSubmit}>
                        <Grid item>
                            <h2 className="sign-in-form-heading">Login</h2>
                        </Grid>
                        <Grid container textAlign="center" justifyContent="center">

                            <Grid item xs={12}>
                                <label htmlFor="email">Email address:</label>
                                <input
                                    placeholder="youremail@test.com"
                                    name="email"
                                    type="email"
                                    id="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="pwd">Password:</label>
                                <input
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    id="pwd"
                                    onChange={handleChange}
                                />
                            </Grid>

                            {error ? (
                                <Grid item>
                                    <p className="error-text">The provided credentials are incorrect</p>
                                </Grid>
                            ) : null}

                            <Grid item>
                                <button type="submit" variant="contained">Submit</button>
                            </Grid>
                        </Grid>
                    </form>

                    <Grid item>
                        <Link to="/signup" className="go-to-text">← Go to Signup</Link>
                    </Grid>

                </Grid >

            </Grid>
        </Grid >
    );
}

export default Login;
