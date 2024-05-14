import { useState } from 'react';

const BlogFom = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content , setContent] = useState('');
  const [url, setUrl] = useState('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const addBlog = (e) => {
    e.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url,
      content: content,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
    setContent('');
  };

  return (
    <div>
      <h1>create a new</h1>
      <form onSubmit={addBlog}>
        title:
        <input
          id='title'
          value={title}
          onChange={handleTitle}
          placeholder='write tittle here'
        />
        <br />
        content:
        <input
          id='content'
          value={content}
          onChange={handleContent}
          placeholder='write content here'/>
        <br/>
        author:
        <input
          id='author'
          value={author}
          onChange={handleAuthor}
          placeholder='write author here'
        />
        <br />
        url:
        <input
          id='url'
          value={url}
          onChange={handleUrl}
          placeholder='write url here'
        />
        <br />
        <button id = 'createButton'
          type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogFom;
