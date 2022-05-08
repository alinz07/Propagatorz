import React from "react";
import Nav from '../src/components/Nav'
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/globalState";

// import SinglePost from "./pages/SinglePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import NoMatch from "./pages/NoMatch";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <StoreProvider>
                        <Nav />
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/signup" element={<Signup />} />
                            {/* <Route
                                exact
                                path="/singlePost/:id"
                                component={SinglePost}
                            /> */}
                            <Route
                                exact
                                path="/createPost"
                                element={<CreatePost />}
                            />
                            <Route element={<NoMatch />} />
                        </Routes>
                        <Footer />
                    </StoreProvider>
                </div>

            </Router>
        </ApolloProvider>
    );
}

export default App;
