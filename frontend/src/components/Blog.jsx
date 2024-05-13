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
    };
    addingLikes(blog.id, blogObject);
  };

  const confirmDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deletingBlogs(blog.id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h1 className="text-xl font-semibold mb-2" id='blogTitle'>{blog.title}</h1>
      <span className='text-blue-800' id='blogUrl'>
        <a href={blog.url}>View Blog</a>
      </span>
      <br/>
      <p className="text-gray-500 mr-2" id='blogAuthor'>By - {blog.author}</p>
      <span id='blogLikes'>{blog.likes} </span>
      <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold  px-1 rounded-md" onClick={handleLikes}> likes</button>

      {blog.user && <div>{blog.user.username}</div>}
      {blog.user &&
          loggedInUser &&
          blog.user.username === loggedInUser.username && (
        <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold  px-1 rounded-md"
          id= "removeButton"
          onClick={confirmDelete}>
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;
