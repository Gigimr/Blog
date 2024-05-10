import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import claases from './test.module.css';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import Header from './components/Header';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationInfo, setNotificationInfo] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    if (user?.token) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      console.log('User logged in', user);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      if (error.response.data.error === 'invalid username or password') {
        setNotificationInfo({
          type: 'error',
          message: 'wrong username or password',
        });
        setTimeout(() => setNotificationInfo(null), 7000);
      }
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = (createBlog) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(createBlog).then((response) => {
      setBlogs(blogs.concat(response));
      setNotificationInfo({
        type: 'success',
        message: `A new blog ${createBlog.title}  by ${createBlog.author} added`,
      });
      setTimeout(() => setNotificationInfo(null), 7000);
    });
  };

  const addingLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject);
    const newBlogs = blogs.map((blog) => {
      if (blog.id === id) {
        blog.likes += 1;
      }
      return blog;
    });
    setBlogs(newBlogs);
  };

  const deletingBlogs = async (id) => {
    await blogService.deleted(id);
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div className='w-full h-full'>
      {user === null ? (
        <div>
          {notificationInfo && (
            <Notification notificationInfo={notificationInfo} />
          )}
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div className='flex justify-center'>
        <div className='w-9/12' >
          <Header />
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {user.name} logged in <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold  px-1 rounded-md"
              onClick={handleLogOut}>
                logout
            </button>
          </p>
          <Togglable buttonLabel={<button className="bg-gray-400 hover:bg-gray-500 text-white font-bold  px-1 py-1 rounded-md">
              New Blog
          </button>} ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <div className='text-center'>
            <BlogList
              blogs={blogs}
              addingLikes={addingLikes}
              deletingBlogs={deletingBlogs}
              user={user}/>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default App;
