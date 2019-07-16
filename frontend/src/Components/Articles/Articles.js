import React, { useState, useEffect } from "react";
import axios from "axios";

import Article from "./Article/Article";
import classes from "./Articles.module.css";

const db = "http://localhost:3001/articles";

const Articles = (props) => {
  console.log(props.match);
  const [articles, setArticles] = useState({
    articleData: [],
    hasArticles: false
  });

  useEffect(() => {
    if (!articles.hasArticles){
      axios.get(db).then((result) => {
        if (result.data.length) {
          setArticles({
            articleData: result.data,
            hasArticles: true
          })
        }
      })
    }
  }, [articles])

  let content = <p>loading</p>;
  if (articles.hasArticles) {
    content = articles.articleData.map((article) => (
      <Article key={article._id} data={article} />
    ))
  } 

  return (
    <main className={classes.main}>
      {content}
    </main>
  )
}

export default Articles;