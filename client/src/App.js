import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/globalState";

const Home = lazy(() => import("./pages/Home"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NoMatch = lazy(() => import("./pages/NoMatch"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const Nav = lazy(() => import("./components/Nav"));
const Footer = lazy(() => import("./components/Footer"));

const httpLink = createHttpLink({
    uri: "/graphql",
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
                <div className="main-wrapper">
                    <StoreProvider>
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Nav />
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route
                                    exact
                                    path="/login"
                                    element={<Login />}
                                />
                                <Route
                                    exact
                                    path="/signup"
                                    element={<Signup />}
                                />
                                <Route
                                    exact
                                    path="/singlePost/:id"
                                    element={<SinglePost />}
                                />
                                <Route
                                    exact
                                    path="/createPost"
                                    element={<CreatePost />}
                                />
                                <Route element={<NoMatch />} />
                            </Routes>
                            <Footer />
                        </Suspense>
                    </StoreProvider>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
