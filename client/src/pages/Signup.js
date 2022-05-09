<<<<<<< HEAD
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
=======
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from "react-router-dom";
>>>>>>> 415d5c2a93c00a3f1f61ab959100547f5b867f04

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
                setSignupError("usernameError");
            } else if (
                e.message.includes("dup") &&
                e.message.includes("email")
            ) {
                setSignupError("emailError");
            } else if (e.message.includes("minimum")) {
                setSignupError("passError");
            }
        }
    };

<<<<<<< HEAD
    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-md-6">
                <div className="card">
                    <h4 className="card-header">Sign Up</h4>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className="form-input"
                                placeholder="Your username"
                                name="username"
                                type="username"
                                id="username"
                                value={formState.username}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input"
                                placeholder="******"
                                name="password"
                                type="password"
                                id="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <button className="btn d-block w-100" type="submit">
                                Submit
                            </button>
                        </form>
=======
  return (
    <main className="sign-in-form">
      <Link to="/login" className='go-to-text'>← Go to Login</Link>
      <div>
        <div>
          <h2 className="sign-in-form-heading">Sign Up</h2>
          <div>
            <form onSubmit={handleFormSubmit}>
              <div>
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
              </div>
              <div>
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
              </div>
              <div>
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
              </div>
              <button type="submit">
                Submit
              </button>
            </form>
>>>>>>> 415d5c2a93c00a3f1f61ab959100547f5b867f04

                        {error && signupError === "usernameError" && (
                            <div>
                                Username is already taken, please choose another
                                and resubmit
                            </div>
                        )}
                        {error && signupError === "emailError" && (
                            <div>
                                Email already has an account, please use another
                                email account and resubmit or select forgot
                                password?
                            </div>
                        )}
                        {error && signupError === "passError" && (
                            <div>
                                Password must be more than 4 characters in
                                length. Please enter a different password and
                                resubmit.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
