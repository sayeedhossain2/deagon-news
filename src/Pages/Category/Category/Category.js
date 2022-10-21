import React from "react";
import { useLoaderData } from "react-router-dom";
import NewsSummeryCard from "../../Shared/NewsSummeryCard/NewsSummeryCard";

const Category = () => {
  const categoryNews = useLoaderData();
  return (
    <div>
      <h2>this is category has news: {categoryNews.length}</h2>
      {categoryNews.map((news) => (
        <NewsSummeryCard key={news._id} news={news}></NewsSummeryCard>
      ))}
    </div>
  );
};

export default Category;
