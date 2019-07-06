import React, { useState, useEffect } from "react";
import axios from "axios";

import classes from "./Articles.module.css";

const db = "http://localhost:3001/articles";

const Articles = () => {
  const [articles, setArticles] = useState({
    hasArticles: false
  });

  useEffect(() => {
    axios.get(db).then((result) => {
      console.log(result.data.length);

    })
  }, [articles])

  return (
    <main className={classes.main}>
      <button>Scrape New Articles</button>

    </main>
  )
}

export default Articles;