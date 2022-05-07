import React from "react";
import Nav from '../src/components/Nav'
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { StoreProvider } from "./utils/GlobalState";

// import SinglePost from "./pages/SinglePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// import Footer from "./components/Footer";
// import Nav from "./components/Nav";

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
        <div>
            {/* <StoreProvider> */}
            <Nav />
             <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            {/* <Route
                                exact
                                path="/singlePost/:id"
                                component={SinglePost}
                            /> */}
                            {/* <Route component={NoMatch} /> */}
                        </Switch>
            <Footer />
            {/* </StoreProvider> */}
        
        </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
