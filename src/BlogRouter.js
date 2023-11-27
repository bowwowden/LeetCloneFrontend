// BlogRouter.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import your blog pages dynamically
const blogPages = require.context('./blogpages', true, /\.js$/);
const pageComponents = blogPages.keys().map((key) => {
  const component = blogPages(key);
  return component.default || component;
});

const BlogRouter = () => {
  return (
    <Routes>
      {pageComponents.map((Page, index) => (
        <Route key={index} path={`/${getPageSlug(Page)}`} element={<Page />} />
      ))}
    </Routes>
  );
};

// Function to get the page slug from the component
const getPageSlug = (pageComponent) => {
  const slug = pageComponent.slug || 'default-slug';
  return slug;
};

export default BlogRouter;
