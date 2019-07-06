import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Articles from "../Components/Articles/Articles";
import classes from "./Layout.module.css";

const Layout = () => (
  <Router>
    <nav className={classes.header}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/">Get New Articles</Link>
        </li>
        <li>
          <Link to="/users/">Users</Link>
        </li>
      </ul>
    </nav>

    <Route path="/" exact component={Articles} />
    {/* <Route path="/about/" component={About} />
    <Route path="/users/" component={Users} /> */}
  </Router>
);

export default Layout;