import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, addingLikes, deletingBlogs, user }) => {
  return (
    <div className >
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addingLikes={addingLikes}
            deletingBlogs={deletingBlogs}
            loggedInUser={user}
          />
        ))}
    </div>
  );

};
//"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

export default BlogList;
