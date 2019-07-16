import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Articles from "../Components/Articles/Articles";
import classes from "./Layout.module.css";

const Layout = () => (
  <Router>
    <nav className={classes.header}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/new">Get New Articles</NavLink>
        </li>
        {/* <li>
          <NavLink to="/users/">Users</NavLink>
        </li> */}
      </ul>
    </nav>

    <Route path="/" exact component={Articles} />
    <Route path="/new" exact component={Articles} />
    {/* <Route path="/about/" component={About} />
    <Route path="/users/" component={Users} /> */}
  </Router>
);

export default Layout;