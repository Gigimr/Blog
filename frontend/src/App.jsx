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
    <div className="min-h-screen bg-gradient-to-r from-slate-400 to-gray-200">
      {user === null ? (
        <div className='flex justify-center items-center h-screen'>
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
          <div className="w-9/12">
            <Header />
            <h2 className="mt-2 text-xl leading-8 text-gray-600">
              {user.name} logged in
              <button
                className="bg-slate-200 hover:bg-slate-300 text-zinc-500 font-bold px-2 rounded-md"
                onClick={handleLogOut}
              >
                logout
              </button>
            </h2>
            <Togglable buttonLabel={<button className="bg-slate-200 hover:bg-slate-300 text-zinc-500 font-bold px-1 py-1 rounded-md mb-2">
              New Blog</button>} ref={blogFormRef}>
              <br />
              <BlogForm createBlog={addBlog} />
            </Togglable>
            <div className="text-center">
              <BlogList
                blogs={blogs}
                addingLikes={addingLikes}
                deletingBlogs={deletingBlogs}
                user={user}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
