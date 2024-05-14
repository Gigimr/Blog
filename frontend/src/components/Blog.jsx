import { useState } from 'react';

const Blog = ({
  blog,
  addingLikes,
  deletingBlogs,
  loggedInUser,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      content: blog.content,
    };
    addingLikes(blog.id, blogObject);
  };

  const confirmDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deletingBlogs(blog.id);
    }
  };

  return (
    <div className="shadow-inherit bg-slate-200 p-5 rounded-lg shadow-md mb-5">
      <h1 className="text-xl font-semibold mb-2" id='blogTitle'>{blog.title}</h1>
      <p className="text-gray-600 mb-1">{blog.content} <br/>  by-{blog.author}</p>
      <button onClick={toggleVisibility}className="text-blue-500">
        {!visible ? 'view' : 'hide'}
      </button>
      {visible && (
        <div className="mt-4">
          <span className="block text-gray-600" id='blogUrl'>{blog.url}</span>
          <span className="block text-gray-600" id='blogLikes'>{blog.likes}
            <button onClick={handleLikes}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2">likes</button></span>

          {blog.user && <div>{blog.user.username}</div>}
          {blog.user &&
          loggedInUser &&
          blog.user.username === loggedInUser.username && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2 ml-2"
              id= "removeButton"
              onClick={confirmDelete}>
          remove
            </button>
          )}
        </div>
      ) }
    </div>
  );
};

export default Blog;
