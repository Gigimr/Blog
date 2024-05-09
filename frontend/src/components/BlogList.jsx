import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, addingLikes, deletingBlogs, user }) => {
  return (
    <div className='flex flex-wrap justify-center'>
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

export default BlogList;
