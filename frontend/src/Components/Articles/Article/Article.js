import React from 'react';

import classes from "./Article.module.css"

const Article = (props) => (
  <div className={classes.card}>
    <a target="_blank" rel="noopener noreferrer" href={props.data.url}>
      <img src={props.data.image} alt={props.data.title}></img>
    </a>
    <div className={classes.body}>
      <h3 >{props.data.title}</h3>
      <p key={props.data._id} id={props.data._id}>{props.data.blurb}</p>
    </div>
  </div>
)

export default Article